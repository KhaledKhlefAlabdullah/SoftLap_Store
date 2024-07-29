<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Product_images;
use Illuminate\Http\Request;
use \Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Mockery\Exception;
use GuzzleHttp\Client;

class ProductController extends Controller
{
    /**
     * this function to get all products in database
     * @return JsonResponse product
     */
    public function index()
    {
        // Handling the process
        try {

            // Get all catigories
            $categories = Category::all();

            // Get all products
            $products = Product::all();

            // Check if there are products
            if ($products->isEmpty()) {
                return response()->json([
                    'message' => __('No products found'),
                ], 404); // Use an appropriate HTTP status code for no data found
            }

            // Return products
            return response()->json([
                'categories' => $categories,
                'products' => $products,
                'message' => __('Successfully retrieved products'),
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => __('database connection error')
            ], 500);
        }
    }

    /**
     * this function to get all products in database
     * @return JsonResponse product
     */
    public function product_details($id)
    {
        // Handling the process
        try {
            // Get all products
            $product = Product::with('images')->findOrFail($id);

            $related_products = Product::where('cluster', $product->cluster)->get();
            // Return products
            return response()->json([
                'product' => $product,
                'related_products' => $related_products,
                'message' => __('Successfully retrieved products'),
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => __('database connection error')
            ], 500);
        }
    }

    /**
     * this function to get all products in database
     * @return JsonResponse product
     */
    public function category_products(Request $request)
    {
        // Handling the process
        try {
            // Get all products
            $products = Product::firstOrFail('category_Id', $request->id)->get();

            // Check if there are products
            if (empty($products)) {
                return response()->json([
                    'message' => __('No products found'),
                ], 404); // Use an appropriate HTTP status code for no data found
            }

            // Return products
            return response()->json([
                'products' => $products,
                'message' => __('Successfully retrieved products'),
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => __('database connection error')
            ], 500);
        }
    }

    /**
     * Create new product
     * @param Request $request the product data
     * @return JsonResponse
     */
    public function store(Request $request)
    {

        // Validate inputs
        $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'company_id' => ['required', 'exists:companies,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'quantity' => ['required', 'integer', 'min:1'],
            'price' => ['required', 'numeric', 'min:0.01'],
            // 'face_img' => ['required', 'image', 'mimes:jpeg,png,gif,bmp']
        ]);
        // Initialize Guzzle client
        $client = new Client();

        // Handling the process
        try {

            // To store product image path
            $product_img = null;
            // Handle the image upload if provided
            if ($request->hasFile('face_image')) {
                $file_extension = $request->file('face_image')->getClientOriginalExtension();
                $file_name = rand() . '.' . $file_extension;
                $path = 'images/face_image';
                $request->file('face_img')->move(public_path($path), $file_name);
                $product_img = $path . '/' . $file_name;
            }

            // Call FastAPI to get the cluster prediction
            $response = $client->post('http://127.0.0.1:8080/products/predict/', [
                'json' => ['text' => $request->description]
            ]);

            $prediction = json_decode($response->getBody()->getContents(), true);
            $cluster = $prediction['cluster'];
            // return $cluster;
            // Create new product
            $product = Product::create([
                'user_id' => Auth::id(),
                'cluster' => $cluster,
                'company_id' => $request->company_id,
                'category_id' => $request->category_id,
                'name' => $request->name,
                'description' => $request->description,
                'quantity' => $request->quantity,
                'price' => $request->price,
                'face_img' => $product_img
            ]);


            // Check if create success
            if (!$product) {

                return response()->json([
                    'message' => __('created failed')
                ], 550);
            }

            // Get the category of product
            $category = Category::findOrFail($product->category_id);
            // Update the product quantity  in the category
            $category->product_quantity_in_category = $category->product_quantity_in_category + 1;

            $state = $category->save();

            if (!$state) {
                return response()->json([
                    'message' => __('failed update product quantity in category')
                ], 200);
            }

            return response()->json([
                'message' => __('created successfully')
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => __('database connection error')
            ], 500);
        }

    }

    public function add_images(Request $request)
    {
        // Validate inputs
        $request->validate([
            'product_id' => ['required', 'string', 'exists:products,id'],
            'img' => ['required', 'image', 'mimes:jpeg,png,gif,bmp']
        ]);

        // Handling the process
        try {
            // To store product image path
            $img = null;
            // Handle the image upload if provided
            if ($request->hasFile('img')) {
                $file_extension = $request->file('img')->getClientOriginalExtension();
                $file_name = rand() . '.' . $file_extension;
                $path = 'images\\img';
                $request->file('img')->move(public_path($path), $file_name);
                $img = str_replace('\\', '/', $path) . '/' . $file_name;
            }

            // // Check if create success
            // if(!$product_img){

            //     return response()->json([
            //         'message'=>__('created failed')
            //     ],550);
            // }

            return response()->json([
                'message' => __('created successfully')
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => __('database connection error')
            ], 500);
        }

    }

    /**
     * This function is make serch requrement with product name and category name
     * @param Request $request the input value for serch
     * @return JsonResponse the resault of the serch process
     */
    public function search_process(Request $request)
    {
        // Get the serch input value
        $search_input = $request->input('search_input');

        // Get products who it name containes or category
        // Pass arrow function to make query search in products names and return items
        $search_items = Product::where(function ($query) use ($search_input) {

            // If product name contianes  {$searchTerm} return it
            $query->where('product_name', 'LIKE', "%$search_input%")

                // Or if product description contianes  {$searchTerm} return it
                ->orWhere('product_description', 'LIKE', "%$search_input");
        })
            // Or search in categories names and return items
            ->orWhereHas('category', function ($query) use ($search_input) {
                $query->where('category_name', 'LIKE', "%$search_input");
            })
            ->get();

        if (!$search_items) {
            return response()->json([
                'message' => __('there no data')
            ], 404);
        }

        return response()->json([
            'resulte' => $search_items,
            'message' => __('items found')
        ], 200);
    }

}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Product_images;
use Illuminate\Http\Request;
use \Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Mockery\Exception;

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
            $categories = DB::table('categories')->select(
                'id',
                'category_name as name',
                'category_description as desc',
                'product_quantity_in_category as p_quantity',
            )->get();


            // Get all products
            $products = DB::table('products')->select(
                'id',
                        'category_id as c_id',
                        'product_name as name',
                        'product_description as desc',
                        'quantity',
                        'price',
                        'product_img as img')->get();

            // Check if there are products
            if ($products->isEmpty()) {
                return response()->json([
                    'message' => __('No products found'),
                ], 404); // Use an appropriate HTTP status code for no data found
            }

            // Return products
            return response()->json([
                'categories'=>$categories,
                'products' => $products,
                'message' => __('Successfully retrieved products'),
            ], 200);
        }catch (Exception $e){
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

            // Return products
            return response()->json([
                'product' => $product,
                'message' => __('Successfully retrieved products'),
            ], 200);
        }catch (Exception $e){
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
        }catch (Exception $e){
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
    public function store(Request $request){

        // Validate inputs
        $request->validate([
            'category_id' => ['required', 'string','exists:categories,id'],
            'product_name' => ['required', 'string', 'max:255'],
            'product_description' => ['nullable', 'string', 'max:1000'],
            'quantity' => ['required', 'integer', 'min:1'],
            'price' => ['required', 'numeric', 'min:0.01'],
            'product_img' => ['required','image','mimes:jpeg,png,gif,bmp']
        ]);

        // Handling the process
        try {
            // To store product image path
            $product_img=null;
            // Handle the image upload if provided
            if($request->hasFile('product_img')){
                $file_extension=$request->file('product_img')->getClientOriginalExtension();
                $file_name=rand().'.'.$file_extension;
                $path='images\\product_image';
                $request->file('product_img')->move(public_path($path),$file_name);
                $product_img=str_replace('\\', '/', $path).'/'.$file_name;
            }
            // Create new prodict
            $product = Product::create([
                'id'=>str_replace('/', '', Hash::make(now())),
                'category_id' => $request->category_id,
                'product_name' =>$request->product_name,
                'product_description' =>$request->product_description,
                'quantity' => $request->quantity,
                'price'=>$request->price,
                'product_img'=>$product_img
            ]);
            // Check if create success
            if(!$product){

                return response()->json([
                    'message'=>__('created failed')
                ],550);
            }

            // Get the category of product
            $category=Category::findOrFail($product->category_id);
            // Update the product quantity  in the category
            $category->product_quantity_in_category=$category->product_quantity_in_category+1;

            $state=$category->save();

            if(!$state){
                return response()->json([
                    'message'=>__('failed update product quantity in category')
                ],200);
            }

            return response()->json([
                'message'=>__('created successfully')
            ],200);

        }catch (Exception $e){
            return response()->json([
                'message' => __('database connection error')
            ], 500);
        }

    }

    public function add_images(Request $request){
        // Validate inputs
        $request->validate([
            'product_id' => ['required', 'string','exists:products,id'],
            'img' => ['required','image','mimes:jpeg,png,gif,bmp']
        ]);

        // Handling the process
        try {
            // To store product image path
            $img=null;
            // Handle the image upload if provided
            if($request->hasFile('img')){
                $file_extension=$request->file('img')->getClientOriginalExtension();
                $file_name=rand().'.'.$file_extension;
                $path='images\\img';
                $request->file('img')->move(public_path($path),$file_name);
                $img=str_replace('\\', '/', $path).'/'.$file_name;
            }
            // Create new prodict
            $product_img = Product_images::create([
                'id'=>str_replace('/', '', Hash::make(now())),
                'product_id' =>$request->product_id,
                'img_name' =>rand(),
                'img_src'=>$img
            ]);
            // Check if create success
            if(!$product_img){

                return response()->json([
                    'message'=>__('created failed')
                ],550);
            }

            return response()->json([
                'message'=>__('created successfully')
            ],200);

        }catch (Exception $e){
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
            $query->where('product_name','LIKE',"%$search_input%")

                // Or if product description contianes  {$searchTerm} return it
                ->orWhere('product_description', 'LIKE', "%$search_input");
        })
            // Or search in categories names and return items
            ->orWhereHas('category', function ($query) use ($search_input) {
                $query->where('category_name', 'LIKE', "%$search_input");
            })
            ->get();

        if (!$search_items){
            return response()->json([
                'message'=>__('there no data')
            ],404);
        }

        return response()->json([
            'resulte' => $search_items,
            'message' => __('items found')
        ],200);
    }

}

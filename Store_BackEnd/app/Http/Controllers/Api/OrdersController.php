<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order_details;
use App\Models\Orders;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Mockery\Exception;

class OrdersController extends Controller
{
    /**
     * Get all orders in database
     * @return JsonResponse all orders in database
     */
    public function index()
    {
        // Handling the process
        try {
            // Get all categories
            $orders = DB::table('users')
                    ->join('orders','users.id','=','orders.user_id')
                    ->join('order_details','orders.id','=','order_details.order_id')
                    ->join('products','order_details.product_id','=','products.id')
                    ->select('orders.id','orders.title','orders.total_price as total'
                        ,'users.name as user_name','products.product_name','order_details.quantity','order_details.unit_price','order_details.total_price')->get();

            // Check if there are products
            if ($orders->isEmpty()) {
                return response()->json([
                    'message' => __('No categories found'),
                ], 404); // Use an appropriate HTTP status code for no data found
            }

            // Return products
            return response()->json([
                'orders' => $orders,
                'message' => __('Successfully retrieved orders'),
            ], 200);

        }catch (Exception $e){
            return response()->json([
                'message' => __('database connection error')
            ], 500);
        }

    }

    /**
     * Get specific orders in database
     * @return JsonResponse all orders in database
     */
    public function get_order(Request $request)
    {
        // Handling the process
        try {

            $id = $request->id;

            // Get all categories
            $order = Orders::findOrFail($id);
            $order_details = Order_details::where('order_id',$id)->with('product')->get();

            // Check if there are products
            if (!$order_details || !$order) {
                return response()->json([
                    'message' => __('No categories found'),
                ], 404); // Use an appropriate HTTP status code for no data found
            }

            // Return products
            return response()->json([
                'order' => $order,
                'order_details'=>$order_details,
                'message' => __('Successfully retrieved order'),
            ], 200);

        }catch (Exception $e){
            return response()->json([
                'message' => __('database connection error')
            ], 500);
        }

    }

    /**
     * Get all orders belongs to on user in database
     * @param string id is user is=d
     * @return JsonResponse all orders belonges to on user in database
     */
    public function user_orders(Request $request){

        // Handling the process
        try {

            $id = $request->id;

            // Get all categories
            $orders = Orders::where('user_id', $id)->get();

            // Check if there are products
            if ($orders->isEmpty()) {
                return response()->json([
                    'message' => __('No orders found'),
                ], 404); // Use an appropriate HTTP status code for no data found
            }

            // Return products
            return response()->json([
                'orders' => $orders,
                'message' => __('Successfully retrieved orders'),
            ], 200);

        }catch (Exception $e){
            return response()->json([
                'message' => __('database connection error')
            ], 500);
        }
    }

    /**
     * Create order
     * @param Request $request order data
     * @return JsonResponse
     */
    public function create_order(Request $request){

            // validate data
            $request->validate([
                'title' => ['required', 'string'],
                'user_id' => ['required', 'string', 'exists:users,id'],
                'products' => ['required','array']
            ]);

            // Create order
            $order = Orders::create([
                'id' => str_replace('/', '', Hash::make(now())),
                'title' => $request->title,
                'user_id' => $request->user_id,
                'total_price' => 0,
            ]);

            // Check if create order don successfully
            if (!$order) {
                return response()->json([
                    'message' => __('failed create')
                ], 550);
            }

            // Get order and product id
            $products_in_order = $request->products;

            // Add order details
            foreach ($products_in_order as $product){
                $product['order_id'] = $order->id;
                $this->add_order_details($product);
            }

            return response()->json([
                'order_id'=>$order->id,
                'message' => __('successfully created')
            ], 200);


    }

    /**
     * add order details
     * @param array $order_detaile order detail data
     * @return JsonResponse
     */
    public function add_order_details(array $order_detaile){
        // Handling the process
        try {
            // Validate inputs
            $validate = Validator::make($order_detaile,[
                'product_id' => ['required', 'exists:products,id'],
                'order_id' => ['required', 'exists:orders,id'],
                'quantity' => ['required', 'integer', 'min:1']
            ]);

            // Get unit price for this product
            $product = Product::findOrFail($order_detaile['product_id']);

            $unit_price = $product->price;

            // Calculate the total price (integer quantity * float unit_price)
            $total_price = $order_detaile['quantity'] * $unit_price;

            // Create order details
            $order_detail = Order_details::create([
                'id' => str_replace('/', '', Hash::make(now())),
                'product_id' => $order_detaile['product_id'],
                'order_id' => $order_detaile['order_id'],
                'quantity' => $order_detaile['quantity'],
                'unit_price' => $unit_price,
                'total_price' => $total_price
            ]);

            // Check if order detail created
            if (!$order_detail) {
                return response()->json([
                    'message' => __('create failed')
                ], 550);
            }

            // Get the order to update total salary
            $order = Orders::findOrFail($order_detail->order_id);

            $new_total_price = $order->total_price +  $total_price;

            $order->total_price = $new_total_price;

            $state = $order->save();

            if (!$state) {
                return response()->json([
                    'message' => __('failed update total price in order')
                ], 520);
            }
            return response()->json([
                'message' => __('successfully created')
            ], 200);

        }catch (Exception $e){
            return response()->json([
                'message' => __('database connection error')
            ], 500);
        }
    }

    /**
     * update order data
     * @param Request $request order new data
     * @param string $id order id
     * @return JsonResponse
     */
    public function update_order_detail(Request $request)
    {
        // Handling the process
        try {
            // Validate inputs
            $request->validate([
                'quantity' => ['required', 'integer', 'min:1'],
            ]);

            $id = $request->id;

            // Get the order or return a 404 response if not found
            $order_detail = Order_details::findOrFail($id);

            // Edite order details with inputs
            $order_detail->quantity = $request->quantity;

            $qunatity = $order_detail->quantity;

            $unite_price = $order_detail->unit_price;

            $order_detail->total_price = $qunatity * $unite_price;

            $state = $order_detail->save();

            if ($state) {
                return response()->json([
                    'message' => __('updated successfully')
                ], 200);
            } else {
                return response()->json([
                    'message' => __('updated failed')
                ], 500);
            }
        }catch (Exception $e){
            return response()->json([
                'message' => __('database connection error')
            ], 500);
        }
    }

    /**
     * delete product from order
     * @param Request $request order detail id
     * @return JsonResponse
     */
    public function remove_product_from_order(Request $request){

        if($request){

            $id = $request->id;

            $product_order = Order_details::findOrFail($id);

            $product_order->delete();

            return response()->json([
                'message' => __('deleted successfully')
                ],200);

        }

        return response()->json([
            'message' => __('there some errors try again')
        ],404);

    }

    /**
     * delete product from order
     * @param Request $request order detail id
     * @return JsonResponse
     */
    public function remove_order(Request $request){

        if($request){

            $id = $request->id;

            $order = Orders::findOrFail($id);

            $order->delete();

            return response()->json([
                'message' => __('deleted successfully')
            ],200);

        }

        return response()->json([
            'message' => __('there some errors try again')
        ],404);

    }

}

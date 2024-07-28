<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use \Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Framework\MockObject\Exception;

class CategoryController extends Controller
{
    /**
     * Get all categories in database
     * @return JsonResponse all categories in database
     */
    public function index(){

        // Handling the process
        try {

            // Get all catigories
            $categories = Category::all();

            // Check if there are products
            if ($categories->isEmpty()) {
                return response()->json([
                    'message' => __('No categories found'),
                ], 404); // Use an appropriate HTTP status code for no data found
            }

            // Return products
            return response()->json([
                'categories' => $categories,
                'message' => __('Successfully retrieved categories'),
            ], 200);

        }catch (Exception $e){
            return response()->json([
                'message' => __('database connection error')
            ], 500);
        }
    }

    /**
     * Create category
     * @param Request $request category data
     * @return JsonResponse
     */
    public function store(Request $request){

        // Handling the process
        try {

            // Validate inputs
            $request->validate([
                'name' => ['required', 'string', 'max:10'],
                'description' => ['nullable', 'string', 'max:1000'],
            ]);

            // Create category
            $category = Category::create([
                'id' => Hash::make(now()->toString()),
                'name' => $request->category_name,
                'description' => $request->category_description
            ]);

            //Check if category created
            if (!$category) {
                return response()->json([
                    'message' => __('create failed')
                ], 550);
            }

            return response()->json([
                'message' => __('successfully created')
            ], 200);

        }catch (Exception $e){
            return response()->json([
                'error' => $e->getMessage(),
                'message' => __('database connection error')
            ], 500);
        }
    }
}

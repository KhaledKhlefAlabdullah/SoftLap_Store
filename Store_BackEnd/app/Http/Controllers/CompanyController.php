<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Exception;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Get all companies in database
     * @return JsonResponse all companies in database
     */
    public function index(){

        // Handling the process
        try {

            // Get all catigories
            $companies = Company::all();

            // Check if there are products
            if ($companies->isEmpty()) {
                return response()->json([
                    'message' => __('No companies found'),
                ], 404); // Use an appropriate HTTP status code for no data found
            }

            // Return products
            return response()->json([
                'companies' => $companies,
                'message' => __('Successfully retrieved companies'),
            ], 200);

        }catch (Exception $e){
            return response()->json([
                'message' => __('database connection error')
            ], 500);
        }
    }
}

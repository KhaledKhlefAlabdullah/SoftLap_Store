<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\Api\UsersController;
use \App\Http\Controllers\Api\ProductController;
use \App\Http\Controllers\Api\CategoryController;
use \App\Http\Controllers\Api\OrdersController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('users',[UsersController::class,'index'])->name('users')->middleware('admin');

    Route::post('add-product',[ProductController::class,'store'])->name('add-product');

    Route::post('add-image',[ProductController::class,'add_images'])->name('add-image');

    Route::post('add-category',[CategoryController::class,'store'])->name('add-category');

    Route::get('get-orders-and-details',[OrdersController::class,'index'])->name('get-orders-and-details')->middleware('admin');

    Route::get('get-order',[OrdersController::class,'get_order'])->name('get-order');

    Route::post('create-order',[OrdersController::class,'create_order'])->name('create-order');

    Route::post('add-order-detail',[OrdersController::class,'add_order_details'])->name('add-order-detail');

    Route::post('edit-order-detail',[OrdersController::class,'update_order_detail'])->name('edit-order-detail');

    Route::get('user-orders',[OrdersController::class,'user_orders'])->name('user-orders');

    Route::delete('delete-order-details',[OrdersController::class,'remove_product_from_order'])->name('delete-order-details');

    Route::delete('delete-order',[OrdersController::class,'remove_order'])->name('delete-order');

});

Route::get('category-products',[ProductController::class,'index'])->name('category-products');

Route::get('product-details/{id}',[ProductController::class,'product_details'])->name('product-details');

Route::get('product-search',[ProductController::class,'search_process'])->name('product-search');

Route::get('products_by_category',[ProductController::class,'category_products'])->name('products_by_category');

Route::get('categories',[CategoryController::class,'index'])->name('categories');

require __DIR__.'/auth.php';

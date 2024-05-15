<?php

use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\DetailTransactionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResources([
    'categories' => CategoriesController::class,
]);

Route::apiResources([
    'detail_transaction' => DetailTransactionController::class,
]);

Route::apiResources([
    'product' => ProductController::class,
]);

Route::apiResources([
    'rating' => RatingController::class,
]);

Route::apiResources([
    'transaction' => TransactionController::class,
]);

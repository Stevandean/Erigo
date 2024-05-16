<?php

use App\Http\Controllers\AuthController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/register', [AuthController::class, 'register']);
        Route::get('/refresh', [AuthController::class, 'refresh']);
        Route::put('/update', [AuthController::class, 'update']);
        Route::delete('/delete-account', [AuthController::class, 'deletemyaccount']);
        Route::get('/user', [AuthController::class, 'user']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });

    Route::get('/hello', function () {
        return response()->json([
            'message' => 'helo'
        ]);
    });

    Route::apiResources([
        '/categories' => CategoriesController::class,
        'detail_transaction' => DetailTransactionController::class,
        '/product' => ProductController::class,
        'rating' => RatingController::class,
        'transaction' => TransactionController::class,
    ]);
});

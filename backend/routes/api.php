<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\VehicleController;
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

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});

Route::group(['middleware' => ['auth:api'], 'prefix' => 'vehicle'], function ($router) {
    Route::post('/', [VehicleController::class, 'store']);
    Route::get('/', [VehicleController::class, 'getAll']);
    Route::delete('/{id}', [VehicleController::class, 'destroy']);
    Route::get('/{id}', [VehicleController::class, 'getByID']);
    Route::put('/{id}', [VehicleController::class, 'update']);
});

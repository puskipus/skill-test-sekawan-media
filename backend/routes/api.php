<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleBookingController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\VehicleUsageController;
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

Route::group(['middleware' => ['auth:api', 'role:Admin'], 'prefix' => 'vehicle'], function ($router) {
    Route::post('/', [VehicleController::class, 'store']);
    Route::get('/', [VehicleController::class, 'getAll']);
    Route::delete('/{id}', [VehicleController::class, 'destroy']);
    Route::get('/{id}', [VehicleController::class, 'getByID']);
    Route::put('/{id}', [VehicleController::class, 'update']);
});

Route::group(['middleware' => ['auth:api', 'role:Admin'], 'prefix' => 'users'], function ($router) {
    Route::get('/drivers', [UserController::class, 'getDrivers']);
    Route::get('/supervisors', [UserController::class, 'getSupervisors']);
});

Route::group(['middleware' => ['auth:api'], 'prefix' => 'book'], function ($router) {
    Route::post('/', [VehicleBookingController::class, 'book'])->middleware('role:Admin');
    Route::get('/', [VehicleBookingController::class, 'get']);
    Route::put('/{id}/approve', [VehicleBookingController::class, 'approve'])->middleware('role:Supervisor,Driver');

    Route::get('/vehicle-usage', [VehicleBookingController::class, 'getUsageCounts']);
    Route::get('/export', [VehicleBookingController::class, 'export']);
});

Route::group(['middleware' => ['auth:api'], 'prefix' => 'usage'], function ($router) {
    Route::post('/', [VehicleUsageController::class, 'store'])->middleware('role:Driver');
});

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use Laravel\Sanctum\Sanctum;
use App\Http\Controllers\AiController;
use App\Http\Controllers\RoleController;
use Spatie\Permission\Middleware\PermissionMiddleware;

Route::get('/', function () {
    return "API";
});
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/getUser', [AuthController::class, 'getUser'])
        ->name('getUser');

    Route::post('/logout', [AuthController::class, 'logout'])
        ->name('logout');

    Route::get('users', [UserController::class, 'index'])->middleware([PermissionMiddleware::class . ':users.view']);
    Route::get('users/{user}', [UserController::class, 'show'])->middleware([PermissionMiddleware::class . ':users.view']);
    Route::post('users', [UserController::class, 'store'])->middleware([PermissionMiddleware::class . ':users.create1']);
    Route::put('users/{user}', [UserController::class, 'update'])->middleware([PermissionMiddleware::class . ':users.update']);
    Route::delete('users/{user}', [UserController::class, 'destroy'])->middleware([PermissionMiddleware::class . ':users.delete']);


    Route::apiResource('roles', RoleController::class);

    Route::post('/aiAsk', [AiController::class, 'aiAsk'])
        ->name('aiAsk');

});





<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use Laravel\Sanctum\Sanctum;
use App\Http\Controllers\AiController;


Route::get('/', function () {
    return "API";
});
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/getUser', [AuthController::class, 'getUser'])->name('getUser')->middleware('auth:sanctum');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::apiResource('users', UserController::class);

Route::post('/aiAsk', [AiController::class, 'aiAsk'])
// ->middleware('auth:sanctum')
->name('aiAsk');

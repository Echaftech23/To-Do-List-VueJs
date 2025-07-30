<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

// Routes d'authentification
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    
    Route::middleware('auth:api')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::get('profile', [AuthController::class, 'profile']);
    });
});

// Routes des tâches (protégées)
Route::middleware('auth:api')->group(function () {
    Route::apiResource('tasks', TaskController::class);
});
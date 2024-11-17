<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route::post('authenticate', [AuthController::class, 'authenticate']);
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])
    ->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->get('tasks', [TaskController::class, 'getTasks']);
Route::middleware('auth:sanctum')->post('tasks', [TaskController::class, 'createTask']);
Route::middleware('auth:sanctum')->put('tasks/{id}', [TaskController::class, 'updateTask']);
Route::middleware('auth:sanctum')->delete('/tasks/{id}', [TaskController::class, 'deleteTask']);
Route::middleware('auth:sanctum')->patch('/tasks/{id}/complete', [TaskController::class, 'completeTask']);
Route::middleware('auth:sanctum')->get('/profile', [AuthController::class, 'getProfile']);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

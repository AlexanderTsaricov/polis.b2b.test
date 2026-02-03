<?php

use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\CommentsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Роуты Article
Route::get('/articles', [ArticlesController::class, 'index']);
Route::get('/articles/{id}', [ArticlesController::class, 'show']);
Route::post('/articles', [ArticlesController::class, 'create']);

// Роуты Comment
Route::get('/articles/{id}/comments', [CommentsController::class, 'index']);
Route::post('/articles/{id}/comments', [CommentsController::class, 'create']);
<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/{any}', [PageController::class, 'welcome'])->where('any', '.*');;

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\ProductionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BomController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ProductionOrderController;
use App\Http\Controllers\GudangController;
use App\Http\Controllers\MaterialRequestController;



Route::get('/', function () {
    return redirect('/login');
});


Route::middleware(['auth'])->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');


    // Master Material
    Route::resource('material', MaterialController::class);


    // Master BOM
    Route::resource('boms', BomController::class);

    Route::post('/boms/calculate', [BomController::class, 'calculate'])
        ->name('boms.calculate');

    Route::get(
        '/boms/{product}/generate',
        [BomController::class, 'generate']
    )->name('boms.generate');


    // Master Products
    Route::resource('products', ProductController::class);

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');


    // Production Order
    Route::resource('production-orders', ProductionOrderController::class);
    Route::get(
        '/production-orders/{id}/calculate-bom',
        [ProductionOrderController::class, 'calculateBom']
    )->name('production-orders.calculate-bom');

    // Gudang
    Route::resource('gudang', GudangController::class);


    // Logout
    Route::post('/logout', function () {

        Auth::logout();

        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect('/login');
    })->name('logout');

    // Material Request
    Route::resource(
        'material-requests',
        MaterialRequestController::class
    );

    Route::post(
        '/material-requests/{materialRequest}/approve',
        [MaterialRequestController::class, 'approve']
    )->name('material-requests.approve');
});


require __DIR__ . '/auth.php';

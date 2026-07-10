<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/login');
});

Route::middleware(['auth'])->group(function () {

    Route::get('/dashboard', function () {

        return Inertia::render('Dashboard', [
            'user' => Auth::user()
        ]);

    })->name('dashboard');

});

Route::middleware(['auth'])->group(function () {
Route::get('/profile', function () {
    return Inertia::render('Profile/Edit', [
        'user' => Auth::user()
    ]);
})->name('profile');
});

Route::middleware(['auth'])->group(function () {

    Route::get('/testing', function () {
        return Inertia::render('testing/Index');
    })->name('testing');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/logout', function () {
    Auth::logout();

    request()->session()->invalidate();
    request()->session()->regenerateToken();

    return redirect('/login');
})->middleware('auth');

require __DIR__ . '/auth.php';

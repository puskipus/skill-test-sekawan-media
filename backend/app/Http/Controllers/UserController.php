<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getDrivers()
    {
        $drivers = User::where('role', 'driver')->get();

        return response()->json($drivers);
    }

    public function getSupervisors()
    {
        $drivers = User::where('role', 'supervisor')->get();

        return response()->json($drivers);
    }
}

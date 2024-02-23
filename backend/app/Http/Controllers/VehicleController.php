<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string',
            'location' => 'required|string',
        ]);

        $vehicle = Vehicle::create([
            'type' => $request->type,
            'location' => $request->location,
        ]);

        return response()->json(['message' => 'Vehicle created successfully', 'vehicle' => $vehicle], 201);
    }
}

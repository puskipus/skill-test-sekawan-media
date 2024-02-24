<?php

namespace App\Http\Controllers;

use App\Models\VehicleUsage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VehicleUsageController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'start_time' => 'required',
            'end_time' => 'required',
            'distance' => 'required',
            'fuel_usage' => 'required',
        ]);

        $vehicleUsage = VehicleUsage::create([
            'user_id' => Auth::user()->id,
            'vehicle_id' => $request->vehicle_id,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'distance' => $request->distance,
            'fuel_usage' => $request->fuel_usage,
        ]);

        return response()->json(['message' => 'Vehicle usage created successfully', 'vehicleUsage' => $vehicleUsage], 201);
    }
}

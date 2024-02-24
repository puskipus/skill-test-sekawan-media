<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VehicleController extends Controller
{
    public function store()
    {
        $validator = Validator::make(request()->all(), [
            'name' => 'required|string|unique:vehicles',
            'type' => 'required|string',
            'location' => 'required|string',
            'last_service' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages());
        }

        $vehicle = Vehicle::create([
            'name' => request('name'),
            'type' => request('type'),
            'location' => request('location'),
            'last_service' => request('last_service'),
        ]);

        if ($vehicle) {
            return response()->json(['message' => 'Vehicle created successfully', 'vehicle' => $vehicle], 201);
        } else {
            return response()->json(['message' => 'Create Vehicle Failed'], 404);
        }
    }

    public function getByID($id)
    {
        $vehicle = Vehicle::find($id);

        if (!$vehicle) {
            return response()->json(['error' => 'Vehicle not found'], 404);
        }

        return response()->json($vehicle);
    }

    public function destroy($id)
    {
        $vehicle = Vehicle::find($id);

        if (!$vehicle) {
            return response()->json(['error' => 'Vehicle not found'], 404);
        }

        $vehicle->delete();

        return response()->json(['message' => 'Vehicle deleted successfully']);
    }
}
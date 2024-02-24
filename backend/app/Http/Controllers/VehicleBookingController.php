<?php

namespace App\Http\Controllers;

use App\Models\VehicleBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VehicleBookingController extends Controller
{
    public function book(Request $request)
    {
        $request->validate([
            'supervisor_id' => 'required|exists:users,id',
            'driver_id' => 'required|exists:users,id',
            'vehicle_id' => 'required|exists:vehicles,id',
            'pickup_date' => 'required',
            'destination' => 'required',
        ]);

        $booking = VehicleBooking::create([
            'admin_id' => Auth::user()->id,
            'supervisor_id' => $request->supervisor_id,
            'driver_id' => $request->driver_id,
            'vehicle_id' => $request->vehicle_id,
            'pickup_date' => $request->pickup_date,
            'destination' => $request->destination,
            'status' => 'Pending',
        ]);

        return response()->json(['message' => 'Vehicle booked successfully', 'booking' => $booking], 201);
    }
}

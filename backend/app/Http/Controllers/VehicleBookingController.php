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

    public function get()
    {
        $role = Auth::user()->role;
        $userId = Auth::id();

        switch ($role) {
            case 'Admin':
                $bookings = VehicleBooking::where('admin_id', $userId)->get();
                break;
            case 'Supervisor':
                $bookings = VehicleBooking::where('supervisor_id', $userId)->get();
                break;
            case 'Driver':
                $bookings = VehicleBooking::where('driver_id', $userId)->get();
                break;
            default:
                return response()->json(['error' => 'Invalid role'], 400);
        }

        return response()->json(['bookings' => $bookings]);
    }

    public function approve($id)
    {
        $booking = VehicleBooking::find($id);

        if (!$booking) {
            return response()->json(['error' => 'Booking not found'], 404);
        }

        $role = Auth::user()->role;
        switch ($role) {
            case 'Supervisor':
                $booking->status = 'Approved Supervisor';
                break;
            case 'Driver':
                $booking->status = 'Approved Driver';
                break;
            default:
                return response()->json(['error' => 'Invalid role'], 400);
        }

        $booking->save();

        return response()->json(['message' => 'Booking approved successfully', 'booking' => $booking]);
    }
}

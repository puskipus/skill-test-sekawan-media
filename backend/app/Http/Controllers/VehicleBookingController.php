<?php

namespace App\Http\Controllers;

use App\Exports\VehicleBookingsExport;
use App\Models\VehicleBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

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
                $bookings = VehicleBooking::with('admin')->with('supervisor')->with('driver')->with('vehicle')->where('admin_id', $userId)->get();
                break;
            case 'Supervisor':
                $bookings = VehicleBooking::with('admin')->with('supervisor')->with('driver')->with('vehicle')->where('supervisor_id', $userId)->get();
                break;
            case 'Driver':
                $bookings = VehicleBooking::with('admin')->with('supervisor')->with('driver')->with('vehicle')->where('driver_id', $userId)->get();
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

    public function getUsageCounts()
    {
        $usageCounts = VehicleBooking::with('vehicle')->select('vehicle_id')
            ->selectRaw('COUNT(*) as usage_count')
            ->groupBy('vehicle_id')
            ->get();

        return response()->json(['usage_counts' => $usageCounts]);
    }

    public function export()
    {
        $bookings = VehicleBooking::with('admin')->with('supervisor')->with('driver')->with('vehicle')->get();


        return Excel::download(new VehicleBookingsExport($bookings), 'vehicle_bookings.xlsx');
    }
}

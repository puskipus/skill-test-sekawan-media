<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleBooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'admin_id',
        'supervisor_id',
        'driver_id',
        'vehicle_id',
        'pickup_date',
        'destination',
        'status',
    ];
}

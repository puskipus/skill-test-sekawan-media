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

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id', 'id');
    }

    public function supervisor()
    {
        return $this->belongsTo(User::class, 'supervisor_id', 'id');
    }

    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id', 'id');
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id', 'id');
    }

}

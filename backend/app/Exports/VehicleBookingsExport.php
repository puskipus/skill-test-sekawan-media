<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class VehicleBookingsExport implements FromCollection, WithMapping, WithHeadings
{
    protected $bookings;

    public function __construct($bookings)
    {
        $this->bookings = $bookings;
    }

    public function collection()
    {
        return $this->bookings;
    }

    public function map($booking): array
    {
        return [
            $booking->id,
            $booking->admin->name,
            $booking->supervisor->name,
            $booking->driver->name,
            $booking->vehicle->name,
            $booking->pickup_date,
            $booking->destination,
            $booking->status,
        ];
    }

    public function headings(): array
    {
        return [
            'ID',
            'Admin Name',
            'Supervisor Name',
            'Driver Name',
            'Vehicle Name',
            'Pickup Date',
            'Destination',
            'Status',
        ];
    }
}


<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timbangan extends Model
{
    use HasFactory;
    protected $table = 'timbangan';
    protected $fillable = [
        "serial_no",
        "id_truck",
        "id_sender",
        "id_user",
        "barang",
        "berat",
        "tare",
        "total",
        "tanggal",
        "jam",
        "status",
        "status_cetak",
        "synchronous"
    ];
    public static function getAll()
    {
        return self::all();
    }
    public function truck()
    {
        // $data = Timbangan::first()->truck; get truck
        return $this->hasOne(Truck::class, 'id_truck', 'id_truck');
    }
    public function sender()
    {
        return $this->hasOne(Sender::class, 'id_sender', 'id_sender');
    }
}

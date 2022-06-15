<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Truck extends Model
{
    use HasFactory;
    protected $table = 'truck';
    protected $fillable = [
        "no_polisi",
        "jenis_mobil",
        "tare",
        "nama_sopir",
        "id_sender",
        "synchronous",
    ];
    public function sender()
    {
        return $this->hasOne(Sender::class, 'id_sender', 'id_sender');
    }
}

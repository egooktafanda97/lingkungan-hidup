<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiwayatRetribusiPrusahaan extends Model
{
    use HasFactory;
    protected $table = 'riwayat_retribusi_prusahaan';
    protected $primaryKey = 'id_riwayat';
    protected $fillable = [
        "id_retribusi",
        "id_admin",
        "id_npwrd",
        "jumlah",
        "saldo_awal",
        "saldo_akhir",
        "status"
    ];
}

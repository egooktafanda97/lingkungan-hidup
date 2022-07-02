<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisUsaha extends Model
{
    use HasFactory;
    protected $table = 'type_usaha';
    protected $fillable = [
        "id_tipe_usaha",
        "session_id",
        "kode_tipe",
        "keterangan_sampah",
        "tipe_sumber_sampah",
        "zona_tipe",
        "tipe_usaha",
        "keterangan",
        "jumlah_retribusi",
        "status"
    ];
    //join usaha
    public function usaha()
    {
        return $this->hasMany('App\Models\Usaha', 'id_tipe_usaha', 'id_tipe_usaha');
    }
    public static function get_all()
    {
        $get = self::orderBy('id_tipe_usaha', 'DESC')->get();
        return $get;
    }
    public static function getById($id)
    {
        $first = self::where('id_tipe_usaha', $id)->first();
        return  $first;
    }
}

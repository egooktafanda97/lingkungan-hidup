<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\RetribusiNpwrd;

class Npwrd extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'npwrd';
    protected $dates = ['deleted_at'];
    protected $primaryKey = 'id_npwrd';
    protected $fillable = [
        "npwrd",
        "qr_code",
        "no_urut",
        "nama",
        "alamat",
        "menyetoran_berdasarkan",
        "masa_retribusi",
        "kode_rekening",
        "foto",
        "didata"
    ];

    // join RetribusiNpwrd
    public function retribusi_npwrd()
    {
        return $this->hasMany('App\Models\RetribusiNpwrd', 'npwrd', 'npwrd');
    }
    public static function getAllNpwrd()
    {
        $data = self::orderBy("id_npwrd", "DESC")->get();
        return $data;
    }
    public static function getDataPerusahaanById($id)
    {
        $data = self::where("id_npwrd", $id)->first();
        $data->retribusi_npwrd;
        return $data;
    }
}

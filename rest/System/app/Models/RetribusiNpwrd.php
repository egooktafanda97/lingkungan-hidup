<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Npwrd;

class RetribusiNpwrd extends Model
{
    use HasFactory;
    protected $table = 'retribusi_npwrd';
    protected $primaryKey = 'id_retribusi';
    protected $fillable = [
        "id_admin",
        "npwrd",
        "nama_penyetor",
        "kode_rekening",
        "tahun",
        "bulan",
        "jenis_retribusi",
        "periode_mulai",
        "periode_sampai",
        "jumlah",
        "tgl_setor"
    ];
    // join npwrd
    public function JoinNpwrd()
    {
        return $this->belongsTo('App\Models\Npwrd', 'npwrd', 'npwrd');
    }
    // join user admin
    public function JoinAdmin()
    {
        return $this->belongsTo('App\Models\User', 'id_admin', 'id');
    }
    public static function getDataRetribusi()
    {
        $res = self::orderBy("id_retribusi", "DESC")->get();
        foreach ($res as $value) {
            $value->JoinNpwrd;
            $value->JoinAdmin;
        }
        return $res;
    }
    public static function getDataRetribusiById($id)
    {
        $res = self::where('npwrd', $id)->orderBy("id_retribusi", "DESC")->get();
        foreach ($res as $value) {
            $value->JoinNpwrd;
            $value->JoinAdmin;
        }
        return $res;
    }
    public static function getDataRetribusiBNpwrd($id)
    {
        $res = self::where("id_retribusi", $id)->first();
        $res->JoinNpwrd;
        return $res;
    }
}

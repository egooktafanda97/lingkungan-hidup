<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zona extends Model
{
    use HasFactory;
    protected $table = 'zona';
    protected $fillable = [
        "nama_zona",
        "keterangan",
        "status_zona",
        "polygon"
    ];
    public function usaha()
    {
        return $this->hasMany('App\Models\Usaha', 'id_zona', 'id_zona');
    }
    public function getData($type, $param = [])
    {
        switch ($type) {
            case 'all':
                $get = self::orderBy('id_zona', 'DESC')->get();
                return $get;
                break;
            case 'by_id':
                $get = self::where('id_zona', $param['id'])->first();
                return $get;
                break;
            default:
                return [];
                break;
        }
    }
}

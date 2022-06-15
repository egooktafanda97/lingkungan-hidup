<?php

namespace App\Models;

use App\Helpers\Helpers;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usaha extends Model
{
    use HasFactory;
    protected $table = 'usaha';
    protected $fillable = [
        "id_jurupungut",
        "kode",
        "id_zona",
        "qrCode",
        "npwrd",
        "nama_usaha",
        "nama_pemilik",
        "jenis_usaha",
        "alamat",
        "no_telp",
        "status",
        "foto",
        "alamat_lengkap",
        "latitude",
        "didata",
        "id_tipe_usaha",
        "role",
        "penyetor_berdasarkan",
        "masa_retribusi",
        "kode_rekening",
        "visible",
        "date_visible",
    ];

    public static function get_all()
    {
        $get = self::orderBy('id_usaha', 'DESC')->get();
        return $get;
    }
    public static function getById($id)
    {
        $first = self::where('id_usaha', $id)->first();
        return  $first;
    }

    // join user
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'id_jurupungut', 'id');
    }
    // join zona
    public function zona()
    {
        return $this->belongsTo('App\Models\Zona', 'id_zona', 'id_zona');
    }
    // join jenis usaha
    public function tipe_usaha()
    {
        return $this->belongsTo('App\Models\JenisUsaha', 'id_tipe_usaha', 'id_tipe_usaha');
    }
    // join retribusi
    public function pengutipan()
    {
        return $this->hasMany('App\Models\Pengutipan', 'id_usaha', 'id_usaha');
    }

    public static function getByQr($qr, $tahun = 2022)
    {
        $usaha = self::where('qrCode', $qr)->first();
        $comvert = Helpers::objectToArray($usaha);

        $pengutipan = Pengutipan::where(["id_usaha" => $usaha->id_usaha, "tahun" => $tahun])->get();
        $pengutipan =  Helpers::objectToArray($pengutipan);

        $data =  array_merge($comvert, [
            "user" => $usaha->user,
            "zona" => $usaha->zona,
            "tipe_usaha" => $usaha->tipe_usaha,
            "pengutipan" => $pengutipan
        ]);
        return $data;
    }
    public static function getByIdUsaha($id)
    {
        $usaha = self::where('id_usaha', $id)->first();
        $comvert = Helpers::objectToArray($usaha);
        $pengutipan =  Helpers::objectToArray($pengutipan);

        $data =  array_merge($comvert, [
            "user" => $usaha->user,
            "zona" => $usaha->zona,
            "tipe_usaha" => $usaha->tipe_usaha,
        ]);
        return $data;
    }

    //get data join
    public function getData($type, $param = [])
    {
        try {
            switch ($type) {
                case 'get':
                    $usaha = self::where(["visible" => true])->orderBy('id_usaha', 'DESC')->get();
                    $data = [];
                    foreach ($usaha as  $value) {
                        $comvert = Helpers::objectToArray($value);
                        array_push(
                            $data,
                            array_merge($comvert, [
                                "user" => $value->user,
                                "zona" => $value->zona,
                                "tipe_usaha" => $value->tipe_usaha
                            ])
                        );
                    }
                    return $data;
                    break;
                case 'whereGet':
                    $usaha = self::where(array_merge($param, ["visible" => true]))->orderBy('id_usaha', 'DESC')->get();
                    $data = [];
                    foreach ($usaha as  $value) {
                        $comvert = Helpers::objectToArray($value);
                        array_push(
                            $data,
                            array_merge($comvert, [
                                "user" => $value->user,
                                "zona" => $value->zona,
                                "tipe_usaha" => $value->tipe_usaha
                            ])
                        );
                    }
                    return $data;
                    break;
                case 'whereOne':
                    $usaha = self::where(array_merge($param, ["visible" => true]))->first();
                    $comvert = Helpers::objectToArray($penduduk);
                    $data =  array_push(
                        $data,
                        array_merge($comvert, [
                            "user" => $usaha->user,
                            "zona" => $usaha->zona,
                            "tipe_usaha" => $usaha->tipe_usaha
                        ])
                    );
                    return $data;
                    break;
                default:
                    # code...
                    break;
            }
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public static function getdataUsaha($type, $param = [])
    {
        $data = $param;
        unset($data['relation']);
        $usaha = self::where($data)->get();
        $data = [];
        foreach ($usaha as  $value) {
            $comvert = Helpers::objectToArray($value);
            $pengutipan = Pengutipan::where(["id_usaha" => $value->id_usaha]);
            if (!empty($param['relation'])) {
                foreach ($param['relation'] as $va) {
                    $pengutipan = $pengutipan->where($va['where']);
                }
            }
            $pengutipan = $pengutipan->get();
            $pengutipan =  Helpers::objectToArray($pengutipan);
            array_push(
                $data,
                array_merge($comvert, [
                    "user" => $value->user,
                    "zona" => $value->zona,
                    "tipe_usaha" => $value->tipe_usaha,
                    "pengutipan" => $pengutipan
                ])
            );
        }
        return $data;
    }
}

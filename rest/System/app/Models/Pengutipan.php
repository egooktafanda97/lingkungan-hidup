<?php

namespace App\Models;

use App\Helpers\Helpers;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Usaha;
use App\Models\User;

class Pengutipan extends Model
{
    use HasFactory;
    protected $table = 'pengutipan';
    protected $fillable = [
        "id_pengutipan",
        "session_create",
        "id_user",
        "id_usaha",
        "tahun",
        "bulan",
        "tanggal_kutip",
        "jumlah_tagihan",
        "lokasi",
        "status_penyerahan"
    ];
    //join user
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'id_user', 'id');
    }
    // join usaha
    public function usaha()
    {
        return $this->belongsTo('App\Models\Usaha', 'id_usaha', 'id_usaha');
    }
    // getRetribusi
    public static function getDataRetribusi($param = [])
    {
        $data = self::where($param)->orderBy('id_pengutipan', 'DESC')->get();
        foreach ($data as $value) {
            $value->usaha;
            $value->usaha->tipe_usaha;
        }
        return $data;
    }
    // getData
    public static function getData($type, $param = [])
    {
        switch ($type) {
            case 'all_group':
                $usaha = self::get()->groupBy('id_usaha');
                $data = [];
                foreach ($usaha as $key => $uval) {
                    $d = [];
                    foreach ($uval as  $value) {
                        $comvert = Helpers::objectToArray($value);
                        array_push(
                            $d,
                            array_merge($comvert, [
                                "user" => $value->user,
                                "usaha" => array_merge(
                                    Helpers::objectToArray($value->usaha),
                                    [
                                        "tipe_usaha" => $value->usaha->tipe_usaha,
                                        "zona" => $value->usaha->zona

                                    ]
                                )

                            ])
                        );
                    }
                    array_push($data, $d);
                }
                return $data;
                break;

            case 'whereGroup':
                $jenis_where = !empty($param['local']) ? $param['local'] : [];
                $usaha = self::where($jenis_where);
                if (!empty($param['relation'])) {
                    foreach ($param['relation'] as $value) {
                        $where = $value['where'];
                        $usaha->whereHas($value['table'], function ($q) use ($where) {
                            $q->where($where);
                        });
                    }
                }
                $usaha =  $usaha->get()->groupBy('id_usaha');
                $data = [];
                foreach ($usaha as $key => $uval) {
                    $d = [];
                    foreach ($uval as  $value) {
                        $comvert = Helpers::objectToArray($value);
                        array_push(
                            $d,
                            array_merge($comvert, [
                                "user" => $value->user,
                                "usaha" => array_merge(
                                    Helpers::objectToArray($value->usaha),
                                    [
                                        "tipe_usaha" => $value->usaha->tipe_usaha,
                                        "zona" => $value->usaha->zona

                                    ]
                                )

                            ])
                        );
                    }
                    array_push($data, $d);
                }
                return $data;
                break;
            default:
                return [];
                break;
        }
    }
    public static function getLineChartCount($tahun = null)
    {
        $thn = empty($tahun) ? date("Y") : $tahun;


        $bulan = [
            $thn . '-' . '01',
            $thn . '-' . '02',
            $thn . '-' . '03',
            $thn . '-' . '04',
            $thn . '-' . '05',
            $thn . '-' . '06',
            $thn . '-' . '07',
            $thn . '-' . '08',
            $thn . '-' . '09',
            $thn . '-' . '10',
            $thn . '-' . '11',
            $thn . '-' . '12'
        ];

        $data = [];
        foreach ($bulan as $value) {
            array_push($data, [
                "bulan" => $value,
                "jumlah" => self::where(['bulan' => $value])->count(),
                "usaha" => Usaha::whereMonth("didata", "<=", $value)->orderBy("created_at", "DESC")->get()->count()
            ]);
        }

        return $data;
    }
    public static function getBarChartCount($id_pengutip, $tahun = null)
    {
        $thn = empty($tahun) ? date("Y") : $tahun;
        $usaha = Usaha::where('id_jurupungut', $id_pengutip)->get()->count();

        $bulan = [
            $thn . '-' . '01',
            $thn . '-' . '02',
            $thn . '-' . '03',
            $thn . '-' . '04',
            $thn . '-' . '05',
            $thn . '-' . '06',
            $thn . '-' . '07',
            $thn . '-' . '08',
            $thn . '-' . '09',
            $thn . '-' . '10',
            $thn . '-' . '11',
            $thn . '-' . '12'
        ];

        $data = [];
        foreach ($bulan as $value) {
            array_push($data, [
                "bulan" => $value,
                "jumlah" => self::where(['bulan' => $value, "id_user" => $id_pengutip])->count()
            ]);
        }

        return [
            "data" => $data,
            "usaha" => $usaha
        ];
    }

    public static function getInfoRetriTable($id_pengutip, $tahun = null)
    {
        $thn = empty($tahun) ? date("Y") : $tahun;
        $usaha = Usaha::where('id_jurupungut', $id_pengutip)->get()->count();

        $bulan = [
            $thn . '-' . '01',
            $thn . '-' . '02',
            $thn . '-' . '03',
            $thn . '-' . '04',
            $thn . '-' . '05',
            $thn . '-' . '06',
            $thn . '-' . '07',
            $thn . '-' . '08',
            $thn . '-' . '09',
            $thn . '-' . '10',
            $thn . '-' . '11',
            $thn . '-' . '12'
        ];

        $data = [];
        foreach ($bulan as $values) {
            $dataInfo = self::where(['bulan' => $values, "id_user" => $id_pengutip])->get();
            foreach ($dataInfo  as  $value) {
                $value->usaha;
                $value->usaha->tipe_usaha;
            }
            array_push($data, [
                "bulan" => $values,
                "tahun" => $thn,
                "retribusi" => $dataInfo
            ]);
        }

        return [
            "data" => $data,
            "usaha" => $usaha
        ];
    }
    public static function getInfoTahunan($thun)
    {
        $user = User::where(["role" => "JURUPUNGUT", "status_account" => "isActive"])->get();
        foreach ($user as  $value) {
            $value->total_usaha = usaha::where("id_jurupungut", $value->id)->whereYear('didata', '=', $thun)->get();
            foreach ($value->total_usaha as $values) {
                $values->tipe_usaha;
            }
            $value->retribusi = self::where("id_user", $value->id)->where('tahun', '=', $thun)->get();
        }
        return $user;
    }
    public static function getRetribusiByIdUsaha($id_usaha, $tahun)
    {
        $bulan = [
            $tahun . '-' . '01',
            $tahun . '-' . '02',
            $tahun . '-' . '03',
            $tahun . '-' . '04',
            $tahun . '-' . '05',
            $tahun . '-' . '06',
            $tahun . '-' . '07',
            $tahun . '-' . '08',
            $tahun . '-' . '09',
            $tahun . '-' . '10',
            $tahun . '-' . '11',
            $tahun . '-' . '12'
        ];

        $data = [];
        foreach ($bulan as $values) {
            $dataInfo = self::where(["id_usaha" => $id_usaha, 'bulan' => $values, "tahun" => $tahun])->first();
            if (!empty($dataInfo)) {
                $dataInfo->usaha;
                $dataInfo->usaha->tipe_usaha;
                $dataInfo->user;
            }
            array_push($data, [
                "bulan" => $values,
                "tahun" => $tahun,
                "retribusi" => $dataInfo
            ]);
        }
        return $data;
    }
}

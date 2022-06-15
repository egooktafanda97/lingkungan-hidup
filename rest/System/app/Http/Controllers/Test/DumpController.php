<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Helpers\Helpers;
use App\Models\Pengutipan;
use App\Models\Usaha;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\User;

class DumpController extends Controller
{
    // created usaha data by json
    public function UsahaCreated(Request $request)
    {
        $dataJson = json_decode(file_get_contents(public_path('public/json/Budianto.json')), 200);
        $i = 1;
        $result = [];
        $error = [];

        foreach ($dataJson as $key => $val) {
            if (!empty($val)) {
                if (!empty($val["nama_usaha"])) {
                    $rolesValidate = [
                        "id_zona"       => 'required',
                        "alamat"        => 'required',
                        "no_telp"       => 'nullable',
                    ];
                    $validator = Validator::make($val, $rolesValidate);
                    if ($validator->fails()) {
                        return response()->json($validator->errors(), 422);
                    }
                    $data = array_merge($validator->validated(), [
                        "jenis_usaha" => $val["nama_usaha"],
                        "nama_usaha" => $val["nama_pemilik"],
                        "nama_pemilik" =>  $val["nama_pemilik"],
                        "id_jurupungut" => 1,
                        "id_tipe_usaha" => 1,
                        "kode"   => $val['k1'] . '-' . $val['k2'] . '-' . $val['k3'],
                        "qrCode" => Str::random(40),
                        "foto" => 'default.png',
                        "didata" => date("Y-m-d"),
                        "status" => true,
                        "visible" => true,
                        "date_visible" => date("Y-m-d H:i:s"),
                    ]);
                    array_push($result, $data);
                    Usaha::create($data);
                } else {
                    array_push($error, $val);
                }

                // cek saldo user

            }
            $i++;
        }
        return response()->json([
            "success" => $result,
            "error" => $error,
        ]);
    }

    // created usaha data by json
    public function Retribusi(Request $request)
    {
        $dataJson = json_decode(file_get_contents(public_path('public/json/data_pengutipan.json')), 200);
        $i = 1;
        foreach ($dataJson as $value) {
            $id = $i;
            foreach ($value as $key => $val) {
                if (!empty($val)) {
                    $d = [
                        "session_create" => Str::random(20),
                        "id_user" => 1,
                        "id_usaha" => $id,
                        "tahun" => date("Y"),
                        "bulan" => $key  < 10 ? "2022-" . "0" . $key  : "2022-" . $key,
                        "tanggal_kutip" => date("Y-m-d"),
                        "jumlah_tagihan" => $val,
                        "status_penyerahan" => false
                    ];
                    $usaha = Pengutipan::create($d);
                    $saldo = User::where('id', '1')->first();
                    User::where('id', '1')->update(['saldo' => (float)$saldo->saldo + (float)$val]);
                }
            }
            $i++;
        }
    }
}

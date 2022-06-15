<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Helpers\Helpers;
use App\Models\Pengutipan;
use App\Models\Usaha;
use App\Models\User;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\UsahaImport;
use PhpOffice\PhpSpreadsheet\IOFactory;
use App\Models\Zona;
use App\Models\JenisUsaha;
use Illuminate\Support\Str;

class ImportController extends Controller
{
    public function imports(Request $request)
    {
        $data = Excel::toArray(new UsahaImport(), $request->file("excels"))[0];
        $d = [];
        foreach ($data as $key => $values) {
            $obj = [];
            $index = 0;
            foreach ($values as $key => $value) {

                if (!empty($values) && $values != "" && $values != null) {

                    $obj += [
                        $data[0][$index] => $value
                    ];
                    $index++;
                }
            }
            array_push($d, $obj);
        }

        // ========================================================================
        // unset($d[0]);
        $___result = [];
        $___error = [];
        foreach ($d as $val) {
            if ($val["jurupungut"] != "jurupungut") {
                $checkJurupungut = User::where(["role" => "JURUPUNGUT", "nama" => $val["jurupungut"]])->first();
                if (empty($checkJurupungut)) {
                    $nips = "";
                    for ($i = 0; $i < 6; $i++) {
                        $nips .= mt_rand(0, 9);
                    }
                    $roleValidate = [
                        'nip'       => $nips,
                        'nama'      => $val["jurupungut"],
                        'alamat'    => "-",
                        'no_telp'   => "0",
                        'jabatan'   => "-",
                        'username'  => $nips,
                        'role'      => 'JURUPUNGUT',
                        'password' => bcrypt($nips),
                        'password_default' => bcrypt('pelalawan@'),
                        'foto' => 'default.png',
                        'status_account' => 'isActive',
                        'saldo' => 0,
                        "visible" => true,
                        "date_visible" => date('Y-m-d H:i:s')
                    ];
                    User::create($roleValidate);
                }

                $getZon = Zona::where(["nama_zona" => $val["zona"]])->first();
                if (empty($getZon)) {
                    $Zon = [
                        'nama_zona'     => $val["zona"],
                        'keterangan'    => '-',
                        'status_zona'   => 'active'
                    ];
                    Zona::create($Zon);
                }


                $cekTarif = JenisUsaha::where(["jumlah_retribusi" => $val["tarif"]])->first();
                if (empty($cekTarif)) {
                    $Triff = [
                        'tipe_usaha'       => $val["tarif"],
                        'keterangan'       => '-',
                        'jumlah_retribusi' => $val["tarif"],
                        'status'           => 'aktif'
                    ];
                    JenisUsaha::create($Triff);
                }
                $__tarif = JenisUsaha::where(["jumlah_retribusi" => $val["tarif"]])->first();
                $Us = User::where(["role" => "JURUPUNGUT", "nama" => $val["jurupungut"]])->first();
                $getZonCreated = Zona::where(["nama_zona" => $val["zona"]])->first();
                $__data = [
                    "id_zona"       => $getZonCreated->id_zona,
                    "alamat"        => $val["alamat"],
                    "jenis_usaha" => !empty($val["nama_pemilik"]) ? $val["nama_pemilik"] : "-",
                    "nama_usaha" => !empty($val["nama_pemilik"]) ? $val["nama_pemilik"] : "-",
                    "nama_pemilik" =>  !empty($val["nama_pemilik"]) ? $val["nama_pemilik"] : "-",
                    "id_jurupungut" => $Us->id,
                    "id_tipe_usaha" => $__tarif->id_tipe_usaha,
                    "kode"   => $val['kode'] . '-' . $val['bagian'] . '-' . $val['nomor'],
                    "qrCode" => Str::random(40),
                    "foto" => 'default.png',
                    "didata" => date("Y-m-d"),
                    "status" => true,
                    "visible" => true,
                    "date_visible" => date("Y-m-d H:i:s"),
                ];
                if (empty(Usaha::where("kode", $__data["kode"])->first())) {
                    $_usaha = new Usaha($__data);
                    if ($_usaha->save()) {
                        array_push($___result, $_usaha);
                    } else {
                        array_push($___error, $__data);
                    }
                } else {
                    array_push($___error, $__data);
                }
            }
        }

        return response()->json([
            "status" => "success",
            "data" => $___result,
            "error" => $___error
        ]);
    }
}

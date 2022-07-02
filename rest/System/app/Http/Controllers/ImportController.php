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

                $getZon = Zona::where(["nama_zona" => $val["keterangan"]])->first();
                if (empty($getZon)) {
                    $Zon = [
                        'nama_zona'     => $val["keterangan"],
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
                $getZonCreated = Zona::where(["nama_zona" => $val["keterangan"]])->first();
                $__data = [
                    "id_zona"       => $getZonCreated->id_zona,
                    "alamat"        => $val["alamat"],
                    "jenis_usaha" => !empty($val["jenis"]) ? $val["jenis"] : "-",
                    "nama_usaha" => !empty($val["nama"]) ? $val["nama"] : "-",
                    "nama_pemilik" =>  !empty($val["nama"]) ? $val["nama"] : "-",
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
    public function importsDataDua(Request $request)
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
            if ($val["jurupungut"] != "jurupungut" && !empty($val['jurupungut'])) {
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
                        'username'  => strtolower(trim($val["jurupungut"])),
                        'role'      => 'JURUPUNGUT',
                        'password' => bcrypt("pelalawan@"),
                        'password_default' => bcrypt('pelalawan@'),
                        'foto' => 'default.png',
                        'status_account' => 'isActive',
                        'saldo' => 0,
                        "visible" => true,
                        "date_visible" => date('Y-m-d H:i:s')
                    ];
                    User::create($roleValidate);
                }

                $getZon = Zona::where(["nama_zona" => $val["keterangan"]])->first();
                if (empty($getZon)) {
                    $Zon = [
                        'nama_zona'     => $val["keterangan"],
                        'keterangan'    => '-',
                        'status_zona'   => 'active'
                    ];
                    Zona::create($Zon);
                }


                // $cekTarif = JenisUsaha::where(["jumlah_retribusi" => $val["tarif"]])->first();
                // if (empty($cekTarif)) {
                //     $jenisSplit = explode("/", $val['jenis']);
                //     if (count($jenisSplit) == 3) {
                //         $Triff = [
                //             'kode_tipe'        => trim($jenisSplit[1]) . "-" . trim($jenisSplit[2]),
                //             'tipe_usaha'       => trim($jenisSplit[1]) . "-" . trim($jenisSplit[2]),
                //             'keterangan'       => '-',
                //             'jumlah_retribusi' => $val["tarif"],
                //             'status'           => 'aktif'
                //         ];
                //     } else {
                //         $Triff = [
                //             'tipe_usaha'       => $val["tarif"],
                //             'keterangan'       => '-',
                //             'jumlah_retribusi' => $val["tarif"],
                //             'status'           => 'aktif'
                //         ];
                //     }

                //     JenisUsaha::create($Triff);
                // }
                if (empty($val['kode_tipe'])) {
                    $jenisSplit = explode("/", $val['jenis']);
                    if (empty($jenisSplit[2])) {
                        array_push($___error, $val);
                        continue;
                    }
                    $__tarif = JenisUsaha::where(["kode_tipe" =>  trim($jenisSplit[1]) . "-" . trim($jenisSplit[2])])->first();
                } else {
                    $kode_tipe = explode("-", $val['kode_tipe']);
                    $__tarif = JenisUsaha::where(["kode_tipe" =>  trim($kode_tipe[0]) . "-" . trim($kode_tipe[1])])->first();
                }

                $Us = User::where(["role" => "JURUPUNGUT", "nama" => $val["jurupungut"]])->first();
                $getZonCreated = Zona::where(["nama_zona" => $val["keterangan"]])->first();
                $__data = [
                    "id_zona"       => $getZonCreated->id_zona,
                    "alamat"        => $val["alamat"],
                    "jenis_usaha" => !empty($val["jenis"]) ? explode("/", $val['jenis'])[0] : "-",
                    "nama_usaha" => !empty($val["nama"]) ? $val["nama"] : "-",
                    "nama_pemilik" =>  !empty($val["nama"]) ? $val["nama"] : "-",
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
            "data" => [
                "result" => $___result,
                "jumlah" => count($___result),
            ],
            "error" => [
                "jumlah" => count($___error),
                "data" => $___error
            ]
        ]);
        // =======================================================================
    }
    public function TipeUsahaImport(Request $request)
    {
        $data = Excel::toArray(new UsahaImport(), $request->file("excels"))[0];
        $sessionUpload = Str::random(10);
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
        $___result = [];
        $___error = [];
        $___sudah_upload = [];
        $nomor = 1;
        foreach ($d as $val) {
            if ($val["NO"] != "NO") {
                $no = !empty(str_replace(".", "", $val["NO"])) ? str_replace(".", "", $val["NO"]) : "err";
                $pecahanSumber = explode("*", $val["Sumber sampah"]);
                $pecahanSumber_tanpa_bintang = explode(";", $val["Sumber sampah"]);
                $ketSumber = "";
                $kode = (string)$val['kode'];
                if (count($pecahanSumber_tanpa_bintang) > 1) {
                    $ketSumber = count($pecahanSumber) > 1 ? $pecahanSumber[0] : "";
                    $tipe_sumber = count($pecahanSumber) > 1 ? $pecahanSumber[1] : $pecahanSumber[0];
                    $listSuber = explode(";",  $tipe_sumber);
                    $kriteria  = explode(";", $val['Kriteria']);
                    $tarif = explode(";", $val['Tarif']);
                    if (count($listSuber) > 1) {
                        for ($i = 0; $i < count($listSuber); $i++) {
                            $res = [
                                "no" =>  $nomor++,
                                "session_id" => $sessionUpload,
                                "kode_tipe" => $kode . "-" . $no,
                                "keterangan_sampah" => $ketSumber,
                                "tipe_sumber_sampah" => !empty($listSuber[$i]) ? $listSuber[$i] : null,
                                "zona_tipe" => $val['zona'],
                                "tipe_usaha" => $val['Wajib Retribusi'],
                                "keterangan" => !empty($kriteria[$i]) ? $kriteria[$i] : null,
                                "jumlah_retribusi" => !empty($tarif[$i]) ? (int) $tarif[$i] : null,
                                "status" => "Aktif"
                            ];
                            array_push($___result, $res);
                            // $checks = JenisUsaha::where(["kode_tipe" => $val['kode'] . "-" . $no, "tipe_sumber_sampah" => $listSuber[$i]])->first();
                            // if (!$checks) {
                            //     $created = JenisUsaha::create($res);
                            //     if ($created) {
                            //         array_push($___result, $created);
                            //     } else {
                            //         array_push($___error, $res);
                            //     }
                            // } else {
                            //     array_push($___sudah_upload, $res);
                            // }
                        }
                    }
                } else {
                    $res = [
                        "no" => $nomor++,
                        "session_id" => $sessionUpload,
                        "kode_tipe" =>  $kode . "-" . $no,
                        "keterangan_sampah" => count(explode("*", $val["Sumber sampah"])) > 1 ? explode("*", $val["Sumber sampah"])[0] : $val["Sumber sampah"],
                        "tipe_sumber_sampah" => count(explode("*", $val["Sumber sampah"])) > 1 ? explode("*", $val["Sumber sampah"])[1] : $val["Sumber sampah"],
                        "zona_tipe" => $val['zona'],
                        "tipe_usaha" => $val['Wajib Retribusi'],
                        "keterangan" => !empty($val['Kriteria']) ? $val['Kriteria'] : $val["Sumber sampah"],
                        "jumlah_retribusi" => (int) $val['Tarif'],
                        "status" => "Aktif"
                    ];
                    array_push($___result, $res);
                    // $checks = JenisUsaha::where(["kode_tipe" => $val['kode'] . "-" . $no, "keterangan_sampah" => $val["Sumber sampah"]])->first();
                    // if (!$checks) {
                    //     $created = JenisUsaha::create($res);
                    //     if ($created) {
                    //         array_push($___result, $created);
                    //     } else {
                    //         array_push($___error, $res);
                    //     }
                    // } else {
                    //     array_push($___sudah_upload, $res);
                    // }
                }
            }
        }

        $ress = [];
        $err = [];
        $selesai = [];
        try {
            foreach ($___result as  $value) {

                $created = JenisUsaha::create($value);
                if ($created) {
                    array_push($ress, $created);
                } else {
                    array_push($err, $value);
                }
            }
        } catch (\Throwable $th) {

            return response()->json([
                "status" => "error",
                "message" => $th->getMessage()
            ]);
        }
        return response()->json([
            "success" => $ress,
            "sudah_terInput" => $selesai,
            "error"    => $err
        ]);
    }
}

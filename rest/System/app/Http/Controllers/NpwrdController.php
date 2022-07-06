<?php

namespace App\Http\Controllers;

use App\Helpers\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\Npwrd;
use App\Models\RetribusiNpwrd;
use App\Models\User;
use App\Models\RiwayatRetribusiPrusahaan;
use App\Models\SessionId;

class NpwrdController extends Controller
{
    public function getDataNpwrd()
    {
        $data = \App\Models\Npwrd::getAllNpwrd();
        return response()->json($data);
    }
    public function create(Request $request)
    {
        $data = $request->all();

        if ($data['action'] == "create") {
            $sessionId = Validator::make($data, [
                'session_id' => 'required|unique:session_id',
            ]);
            if ($sessionId->fails()) {
                return response()->json($sessionId->errors(), 422);
            }
            SessionId::create([
                'session_id' =>  $sessionId->validated()['session_id']
            ]);
            if (!empty($request->isNew)) {
                $rolesValidate = [
                    "no_urut" => 'nullable|unique:npwrd',
                    "npwrd" => 'required|unique:npwrd',
                    "nama" => 'required',
                    "alamat" => 'nullable',
                    "menyetoran_berdasarkan" => 'required',

                ];
                $validator = Validator::make($request->all(), $rolesValidate);
                if ($validator->fails()) {
                    return response()->json($validator->errors(), 422);
                }
                $UPiMG = Helpers::Upgambar($request, 'foto', 'public/img/usaha');
                $data = array_merge($validator->validated(), [
                    "qr_code"    => Str::random(40),
                    "foto"      => $UPiMG['status'] ? $UPiMG['fileName'] : 'default.png',
                    "didata"    => date("Y-m-d"),
                ]);
                try {
                    Npwrd::create($data);
                } catch (\Exception $e) {
                    return response()->json(["status" => false, "response" => "error", "msg" => $e], 400);
                }
            }
            $ret_Npwrd = [
                "npwrd" => 'required',
                "nama_penyetor" => 'required',
                "kode_rekening" => 'nullable',
                "tahun" => 'required',
                "bulan" => 'required',
                "masa_retribusi" => 'required',
                "jenis_retribusi" => 'nullable',
                "periode_mulai" => 'required',
                "periode_sampai" => 'required',
                "jumlah" => 'nullable',
                "retribusi" => 'required',
            ];
            $validator1 = Validator::make($request->all(), $ret_Npwrd);
            if ($validator1->fails()) {
                return response()->json($validator1->errors(), 422);
            }
            $saldoAwalAdmin   = User::where("role", "SUPER_ADMIN")->first()->saldo;
            try {
                $retribusi = !empty($request->retribusi) ? json_decode($request->retribusi, true) : [];
                $jml = array_reduce($retribusi, function ($carry, $item) {
                    return $carry + $item['jumlah'];
                });

                $saldoBaru = (float) $saldoAwalAdmin + (float) $jml;
                $pengutipan = RetribusiNpwrd::create(array_merge($validator1->validated(), [
                    "id_admin" =>  auth()->user()->id,
                    "jumlah" => $jml,
                    "tgl_setor" => date("Y-m-d")
                ]));
                User::where("role", "SUPER_ADMIN")->update(["saldo" => $saldoBaru]);

                RiwayatRetribusiPrusahaan::create([
                    "id_retribusi" => $pengutipan->id_retribusi,
                    "id_admin" => auth()->user()->id,
                    "id_npwrd" => Npwrd::where("npwrd", $request->npwrd)->first()->id_npwrd,
                    "jumlah" =>  $jml,
                    "saldo_awal" => $saldoAwalAdmin,
                    "saldo_akhir" => User::where("role", "SUPER_ADMIN")->first()->saldo,
                ]);

                return response()->json(["status" => true, "response" => $pengutipan, "msg" => "data berhasil di insert"], 200);
            } catch (\Exception $e) {
                return response()->json(["status" => false, "response" => $e, "msg" => "oops"], 401);
            }
        } elseif ($data['action'] == "update") {
            try {
                if (!empty($data["id_retribusiUsaha"])) {
                    $get = RetribusiNpwrd::getDataRetribusiBNpwrd($data["id_retribusiUsaha"]);
                    $rolesValidate = [
                        "no_urut" => 'nullable',
                        "npwrd" => 'required',
                        "nama" => 'required',
                        "alamat" => 'nullable',
                        "menyetoran_berdasarkan" => 'required',

                    ];

                    // ------------------------------------------------------------
                    $ret_Npwrd = [
                        "npwrd" => 'required',
                        "kode_rekening" => 'nullable',
                        "tahun" => 'required',
                        "bulan" => 'required',
                        "masa_retribusi" => 'required',
                        "jenis_retribusi" => 'nullable',
                        "periode_mulai" => 'required',
                        "periode_sampai" => 'required',
                        "jumlah" => 'nullable',
                        "retribusi" => 'required',
                    ];

                    $retribusi = !empty($request->retribusi) ? json_decode($request->retribusi, true) : [];
                    $jml = array_reduce($retribusi, function ($carry, $item) {
                        return $carry + $item['jumlah'];
                    });
                    $validator = Validator::make($request->all(), $rolesValidate);
                    if ($validator->fails()) {
                        return response()->json($validator->errors(), 422);
                    }
                    $UPiMG = Helpers::Upgambar($request, 'foto', 'public/img/usaha');
                    $data = array_merge($validator->validated(), [
                        "foto"      => $UPiMG['status'] ? $UPiMG['fileName'] : Npwrd::where('npwrd', $get->npwrd)->first()->foto,
                    ]);

                    $validator1 = Validator::make($request->all(), $ret_Npwrd);
                    if ($validator1->fails()) {
                        return response()->json($validator1->errors(), 422);
                    }

                    try {
                        Npwrd::where('npwrd', $get->npwrd)->update($data);
                        RetribusiNpwrd::where("id_retribusi", $get->id_retribusi)->update(array_merge($validator1->validated(), [
                            "id_admin" =>  auth()->user()->id,
                            "jumlah" => $jml,
                        ]));
                        $getRiwayat = RiwayatRetribusiPrusahaan::where("id_retribusi", $get["id_retribusi"])->first();
                        if ($getRiwayat) {
                            $calculate = (float) User::where("role", "SUPER_ADMIN")->first()->saldo - (float) $getRiwayat->jumlah;
                            User::where("role", "SUPER_ADMIN")->update(["saldo" => (float) $calculate + (float) $jml]);
                            RiwayatRetribusiPrusahaan::where("id_retribusi", $get["id_retribusi"])->update([
                                "jumlah" => $jml,
                                "saldo_awal" => $calculate,
                                "saldo_akhir" => User::where("role", "SUPER_ADMIN")->first()->saldo,
                            ]);
                        }
                        return response()->json(["status" => true, "response" => $get, "msg" => "data berhasil di update"], 200);
                    } catch (\Throwable $th) {
                        return response()->json(["status" => false, "response" => $th, "msg" => "data gagal di update"], 401);
                    }
                }
            } catch (\Throwable $th) {
                return response()->json(["status" => false, "response" => $th, "msg" => "data gagal di update"], 401);
            }
        }
    }
    public function retribusiNpwrd()
    {
        $data = RetribusiNpwrd::getDataRetribusi();
        return response()->json($data);
    }
    public function delete($id)
    {
        try {
            $getRiwayat = RiwayatRetribusiPrusahaan::where("id_retribusi", $id)->first();
            if ($getRiwayat) {
                $calculate = (float) User::where("role", "SUPER_ADMIN")->first()->saldo - (float) $getRiwayat->jumlah;
                User::where("role", "SUPER_ADMIN")->update(["saldo" => $calculate]);
                RiwayatRetribusiPrusahaan::where("id_retribusi", $id)->update([
                    "status" => "DELETED",
                ]);
            }

            RetribusiNpwrd::where("id_retribusi", $id)->delete();
            return response()->json(["status" => true, "response" => [], "msg" => "data berhasil di hapus"], 200);
        } catch (\Exception $e) {
            return response()->json(["status" => false, "response" => $e, "msg" => "data gagal di hapus"], 401);
        }
    }
    public function getDataPerusahaanById($id)
    {
        $data = Npwrd::getDataPerusahaanById($id);
        return response()->json($data);
    }
    public function getDataRetribusiById($npwrd)
    {
        $data = RetribusiNpwrd::getDataRetribusiById($npwrd);
        return response()->json($data);
    }
}

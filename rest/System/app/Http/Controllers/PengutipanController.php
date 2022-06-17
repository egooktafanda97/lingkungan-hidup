<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Helpers\Helpers;
use App\Models\Pengutipan;
use App\Models\Usaha;
use App\Models\User;

class PengutipanController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => [
            'created',
            'getData',
            "getDataRetribusi"
        ]]);
    }
    // created zona
    public function action(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "session_create"    => "required|unique:pengutipan",
            "id_usaha"          => "required",
            "bulan"             => "required",
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $jml  = !empty($request->jumlah_tagihan) ? $request->jumlah_tagihan : Usaha::where('id_usaha', $request->id_usaha)->first()->tipe_usaha->jumlah_retribusi;
        $data = array_merge($validator->validated(), [
            "id_user"           => auth()->user()->id,
            "jumlah_tagihan"    => $jml,
            "tahun" => date("Y"),
            "tanggal_kutip"     => date("Y-m-d"),
            "status_penyerahan" => false
        ]);
        //insert
        if (!empty($request->id_pengutipan)) {
            try {
                Pengutipan::where('id_pengutipan', $request->id_pengutipan)->update($data);
                return response()->json(["status" => true, "response" => $data, "msg" => "data berhasil di update"], 200);
            } catch (\Throwable $th) {
                return response()->json(["status" => false, "response" => "error", "msg" => "oops error update"], 400);
            }
        } else {
            try {
                $usaha = Pengutipan::create($data);
                $us = User::where('id', auth()->user()->id)->first();
                $jmlSaldo = (float) $us->saldo + (float) $jml;


                User::where('id', auth()->user()->id)->update(["saldo" => $jmlSaldo]);
                // ----
                return response()->json(["status" => true, "response" => $usaha, "msg" => "data berhasil di insert"], 200);
            } catch (\Throwable $th) {
                return response()->json(["status" => false, "response" => "error", "msg" => "oops error insert"], 400);
            }
        }
    }
    public function delete($del)
    {
        try {
            Pengutipan::where('id_pengutipan', $del)->delete();
            return response()->json(["status" => true, "response" => "success", "msg" => "data berhasil di hapus"], 200);
        } catch (\Throwable $th) {
            return response()->json(["status" => false, "response" => "error", "msg" => "oops"], 401);
        }
    }
    public function getData($type)
    {
        $header = [];
        $h = [];
        if (!empty(\Request::header("where"))) {
            $header = json_decode(\Request::header("where"), true);
            foreach ($header as $key => $value) {
                if ($header[$key] != "" && $header[$key] != null && $header[$key] != "null" && $header[$key] != "undefined" && $header[$key] != NULL && $header[$key] != "NULL") {
                    $h[$key] = $header[$key];
                }
            }
        }
        $get = Usaha::getdataUsaha($type, $h);
        return response()->json($get, 200);
    }
    public function getDataRetri($type)
    {
        $header = [];
        $h = [];
        if (!empty(\Request::header("where"))) {
            $header = json_decode(\Request::header("where"), true);
            foreach ($header as $key => $value) {
                if ($header[$key] != "" && $header[$key] != null && $header[$key] != "null" && $header[$key] != "undefined" && $header[$key] != NULL && $header[$key] != "NULL") {
                    $h[$key] = $header[$key];
                }
            }
        }
        $get = Pengutipan::getData($type, $h);
        return response()->json($get, 200);
    }
    public function getDataRetribusi($user_id, $bulan = null)
    {
        $where = !empty($bulan) ? ["id_user" => $user_id, "bulan" => $bulan] : ["id_user" => $user_id];
        $data = Pengutipan::getDataRetribusi($where);
        return response()->json($data);
    }
    public function getBarChartCount($id, $tahun = null)
    {
        $data = Pengutipan::getBarChartCount($id, $tahun);
        return response()->json($data);
    }
    public function getInfoRetriTable($id, $tahun = null)
    {
        $data = Pengutipan::getInfoRetriTable($id, $tahun);
        return response()->json($data);
    }
    public function getLaporanTahunan($tahun = null)
    {
        $thn = !empty($tahun) ? $tahun : date("Y");
        $data = Pengutipan::getInfoTahunan($thn);
        return response()->json($data);
    }
    public function getRetribusiByIdUsaha($id_usaha, $tahun = null)
    {
        $thn  = !empty($tahun) ? $tahun : date("Y");
        $data = Pengutipan::getRetribusiByIdUsaha($id_usaha, $thn);
        return response()->json($data);
    }
    public function getLineChartCount($tahun = null)
    {
        $th = date("Y");
        if (!empty($tahun)) {
            $th = $tahun;
        }
        $gets = Pengutipan::getLineChartCount($th);
        return response()->json($gets);
    }
}

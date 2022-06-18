<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Helpers\Helpers;
use App\Models\Usaha;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Zona;

class UsahaController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => [
            'action',
            'get',
            'getData',
            'delete'
        ]]);
    }
    // created zona
    public function action(Request $request)
    {
        $rolesValidate = [
            "id_jurupungut"       => 'required',
            "kode"   => 'nullable|unique:usaha',
            // "id_zona"       => 'required',
            "nama_usaha" => 'required',
            "jenis_usaha" => 'required',
            "nama_pemilik" => 'required',
            "alamat" => 'required',
            "no_telp" => 'nullable',
            "status" => 'required',
            "id_tipe_usaha" => 'required',
        ];
        if (!empty($request->id_usaha)) {
            unset($rolesValidate["kode"]);
        }
        $validator = Validator::make($request->all(), $rolesValidate);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $id_zona = $request->id_zona;
        if (!empty($request->newZona) && $request->newZona == "new") {
            $ZonaData = [
                "nama_zona" => $request->id_zona,
                "keterangan" => "-",
                "status_zona" => true
            ];
            $zon = Zona::create($ZonaData);
            $id_zona = $zon->id;
        } else {
            $id_zona = $request->id_zona;
        }

        $UPiMG = Helpers::Upgambar($request, 'foto', 'public/img/usaha');
        $data = array_merge($validator->validated(), [
            "id_zona" => $id_zona,
            "qrCode"    => Str::random(40),
            "foto"      => $UPiMG['status'] ? $UPiMG['fileName'] : 'default.png',
            "didata"    => date("Y-m-d"),
            // "role"      => 'USAHA',
            "visible"   => true,
            "date_visible" => date("Y-m-d H:i:s"),
        ]);

        if (!empty($request->id_usaha)) {
            try {
                unset($data['didata']);
                if (!$UPiMG['status']) {
                    unset($data['foto']);
                }
                Usaha::where('id_usaha', $request->id_usaha)->update($data);
                return response()->json(["status" => true, "response" => $data, "msg" => "data berhasil di update"], 200);
            } catch (\Throwable $th) {
                return response()->json(["status" => false, "response" => "error", "msg" => "oops error update"], 400);
            }
        } else {
            try {
                $usaha = Usaha::create($data);
                return response()->json(["status" => true, "response" => $usaha, "msg" => "data berhasil di insert", "res" => $request->newZona], 200);
            } catch (\Exception $e) {
                return response()->json(["status" => false, "response" => "error", "msg" => $e], 400);
            }
        }
    }
    public function actionPerusahaan(Request $request)
    {
        $rolesValidate = [
            "id_jurupungut"       => 'required',
            "kode"   => 'nullable|unique:usaha',
            "id_zona"       => 'required',
            "nama_usaha" => 'required',
            "jenis_usaha" => 'required',
            "nama_pemilik" => 'nullable',
            "alamat" => 'required',
            "no_telp" => 'nullable',
            "status" => 'required',
            "id_tipe_usaha" => 'required',
        ];
        if (!empty($request->id_usaha)) {
            unset($rolesValidate["kode"]);
        }
        $validator = Validator::make($request->all(), $rolesValidate);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $UPiMG = Helpers::Upgambar($request, 'foto', 'public/img/usaha');
        $data = array_merge($validator->validated(), [
            "qrCode"    => Str::random(40),
            "foto"      => $UPiMG['status'] ? $UPiMG['fileName'] : 'default.png',
            "didata"    => date("Y-m-d"),
            "role"      => 'USAHA',
            "visible"   => true,
            "date_visible" => date("Y-m-d H:i:s"),
        ]);
        //insert
        if (!empty($request->id_usaha)) {
            try {
                unset($data['didata']);
                if (!$UPiMG['status']) {
                    unset($data['foto']);
                }
                Usaha::where('id_usaha', $request->id_usaha)->update($data);
                return response()->json(["status" => true, "response" => $data, "msg" => "data berhasil di update"], 200);
            } catch (\Throwable $th) {
                return response()->json(["status" => false, "response" => "error", "msg" => "oops error update"], 400);
            }
        } else {
            try {
                $usaha = Usaha::create($data);
                return response()->json(["status" => true, "response" => $usaha, "msg" => "data berhasil di insert"], 200);
            } catch (\Exception $e) {
                return response()->json(["status" => false, "response" => "error", "msg" => $e], 400);
            }
        }
    }
    public function delete($del)
    {
        try {
            $data = Usaha::where('id_usaha', $del)->update(["visible" => false, "date_visible" => date("Y-m-d H:i:s")]);
            return response()->json([
                'message' => 'User successfully deleted',
                'user' => $data
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(["status" => false, "response" => "error", "msg" => "oops"], 401);
        }
    }
    public function getByQrCode($qrcode, $thn = null)
    {
        $tahun = $thn ? $thn : date("Y");
        $get = Usaha::getByQr($qrcode, $tahun);
        return response()->json($get, 200);
    }
    public function checkByQr($Qr)
    {
        $get = Usaha::where(['qrCode' => $Qr, "id_jurupungut" => auth()->user()->id])->get()->count();
        if ($get == 1) {
            return response()->json(true, 200);
        } else {
            return response()->json(false, 400);
        }
    }
    public function get($type, $param = null)
    {
        switch ($type) {
            case 'id':
                $get = Usaha::getById($param);
                return response()->json($get, 200);
                break;
            case 'Qr':
                $get = Usaha::getByQr($param);
                return response()->json($get, 200);
                break;
            default:
                $get = Usaha::get_all();
                return response()->json($get, 200);
                break;
        }
        return response()->json(Usaha::get_all(), 200);
    }

    public function relationGet()
    {
        $data = DB::table('usaha')
            ->join('user', function ($join) {
                $join->on('user.id', '=', 'usaha.id_user');
            })
            ->join('zona', function ($join) {
                $join->on('zona.id_zona', '=', 'usaha.id_zona');
            })
            ->orderBy('usaha.created_at', 'desc')
            ->get();

        return response()->json($data, 200);
    }

    public function relationFirst($type, $param = null)
    {
        $data = DB::table('usaha')
            ->join('user', function ($join) {
                $join->on('user.id', '=', 'usaha.id_user');
            })
            ->join('zona', function ($join) {
                $join->on('zona.id_zona', '=', 'usaha.id_zona');
            });
        switch ($type) {
            case 'id':
                $firsts = $data->where('usaha.id_usaha', $param)->first();
                return response()->json($firsts, 200);
                break;
            case 'Qr':
                $firsts = $data->where('usaha.qrCode', $param)->first();
                return response()->json($firsts, 200);
                break;
            default:

                break;
        }
    }
    public function getData($type = null)
    {
        $header = !empty(\Request::header('where') ? \Request::header('where') : null);
        switch ($type) {
            case 'whereGet':
                $get = Usaha::getData($type, $header);
                return response()->json($get, 200);
                break;
            case 'whereOne':
                $get = Usaha::getData($type, $header);
                return response()->json($get, 200);
                break;
            default:
                if (!empty($_GET["juruId"])) {
                    $get = Usaha::where(["visible" => true, "id_jurupungut" => $_GET["juruId"]])->orderBy("created_at", "DESC")->get();
                } else {
                    $get = Usaha::where("visible", true)->orderBy("created_at", "DESC")->get();
                }
                foreach ($get as  $value) {
                    $value->user;
                    $value->zona;
                    $value->tipe_usaha;
                }
                return response()->json($get, 200);
                break;
        }
    }
    public function registerQrCode(Request $request)
    {
        try {
            Usaha::where('id_usaha', $request->id_usaha)->update([
                "qrCode" => $request->qrCode
            ]);
            return response()->json(["status" => true, "response" => Usaha::where('id_usaha', $request->id_usaha)->first(), "msg" => "data berhasil di hapus"], 200);
        } catch (\Throwable $th) {
            return response()->json(["status" => false, "response" => "error", "msg" => "oops"], 401);
        }
    }
    public function getByIdUsaha($id)
    {
        $result = Usaha::getByIdUsaha($id);
        return response()->json($result);
    }
    public function setMap(Request $request)
    {
        try {
            $req = $request->all();
            $up = Usaha::where('id_usaha', $req["id_usaha"])->update([
                "latitude" => $req['latitude'] . "," . $req['longitude']
            ]);
            if ($up) {
                return response()->json(["status" => true, "response" => $req, "msg" => "data berhasil di update"], 200);
            } else {
                return response()->json(["status" => false, "response" => "error", "msg" => "oops error update"], 400);
            }
        } catch (\Throwable $th) {
            return response()->json(["status" => false, "response" => "error", "msg" => "oops error update"], 400);
        }
    }
    public function getByKodeUsaha()
    {
        $result = Usaha::getByKodeUsaha();
        return response()->json($result);
    }
}

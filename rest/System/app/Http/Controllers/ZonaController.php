<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Helpers\Helpers;
use App\Models\Zona;


class ZonaController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => [
            'created',
            'get'
        ]]);
    }
    // created zona
    public function action(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_zona'     => 'required',
            'keterangan'    => 'nullable',
            'status_zona'   => 'required',
            "polygon"       => 'nullable'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        //insert
        if (!empty($request->id_zona)) {
            try {
                Zona::where('id_zona', $request->id_zona)->update($validator->validated());
                return response()->json(["status" => true, "response" => $validator->validated(), "msg" => "data berhasil di update"], 200);
            } catch (\Throwable $th) {
                return response()->json(["status" => false, "response" => "error", "msg" => "oops error update"], 400);
            }
        } else {
            try {
                $zon = Zona::create(array_merge($validator->validated(), ["creare_by" => "ADMIN"]));
                return response()->json(["status" => true, "response" => $zon, "msg" => "data berhasil di insert"], 200);
            } catch (\Throwable $th) {
                return response()->json(["status" => false, "response" => "error", "msg" => "oops error insert"], 400);
            }
        }
    }
    public function delete($del)
    {
        try {
            Zona::where('id_zona', $del)->delete();
            return response()->json(["status" => true, "response" => "success", "msg" => "data berhasil di hapus"], 200);
        } catch (\Throwable $th) {
            return response()->json(["status" => false, "response" => "error", "msg" => "oops"], 401);
        }
    }
    public function get($type, $param = null)
    {
        $paramS = empty($param) ? [] : $param;
        $get = Zona::getData($type, $paramS);
        return response()->json($get, 200);
    }
}

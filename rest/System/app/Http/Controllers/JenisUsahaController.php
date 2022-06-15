<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\JenisUsaha;

class JenisUsahaController extends Controller
{
    //create
    public function action(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tipe_usaha'       => 'required',
            'keterangan'       => 'required',
            'jumlah_retribusi' => 'required',
            'status'           => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        //insert
        if (!empty($request->id_tipe_usaha)) {
            // try {
            JenisUsaha::where('id_tipe_usaha', $request->id_tipe_usaha)->update($validator->validated());
            return response()->json(["status" => true, "response" => $validator->validated(), "msg" => "data berhasil di update"], 200);
            // } catch (\Throwable $th) {
            //     return response()->json(["status" => false, "response" => "error", "msg" => "oops error update"], 400);
            // }
        } else {
            try {
                $zon = JenisUsaha::create($validator->validated());
                return response()->json(["status" => true, "response" => $zon, "msg" => "data berhasil di insert"], 200);
            } catch (\Throwable $th) {
                return response()->json(["status" => false, "response" => "error", "msg" => "oops error insert"], 400);
            }
        }
    }
    public function get($type, $param = null)
    {
        switch ($type) {
            case 'id':
                $get = JenisUsaha::getById($param);
                return response()->json($get, 200);
                break;
            default:
                $get = JenisUsaha::get_all();
                return response()->json($get, 200);
                break;
        }
    }
    public function delete($del)
    {
        try {
            JenisUsaha::where('id_tipe_usaha', $del)->delete();
            return response()->json(["status" => true, "response" => "success", "msg" => "data berhasil di hapus"], 200);
        } catch (\Throwable $th) {
            return response()->json(["status" => false, "response" => "error", "msg" => "oops"], 401);
        }
    }
}

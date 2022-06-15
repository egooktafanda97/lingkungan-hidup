<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\HistorySaldo;
use App\Models\User;

class HistorySaldoController extends Controller
{
    public function UpSaldo(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'pin'              => 'required',
                'id_user'       => 'required',
                'jumlah_storan' => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            if (auth()->user()->pin != $request->pin) {
                return response()->json([
                    'status' => false,
                    'message' => "anda tidak memiliki akses"
                ], 422);
            }

            $saldoAwalPngutip = User::where("id", $request->id_user)->first()->saldo;
            $saldoAwalAdmin   = User::where("role", "SUPER_ADMIN")->first()->saldo;

            if ($request->jumlah_storan >  $saldoAwalPngutip) {
                return response()->json([
                    'status' => false,
                    'message' => "saldo yang di stor melebihi saldo pengutip"
                ], 422);
            }

            $data = [
                "admin_id" => auth()->user()->id,
                "id_user" => $request->id_user,
                "tahun" => date("Y"),
                "bulan" => date("m"),
                "jumlah_saldo" => User::where("id", $request->id_user)->first()->saldo,
                "jumlah_storan" => $request->jumlah_storan,
                "saldo" => (float) User::where("id", $request->id_user)->first()->saldo - (float) $request->jumlah_storan,
                "saldo_admin" => (float) User::where("role", "SUPER_ADMIN")->first()->saldo + (float) $request->jumlah_storan,
                "tanggal_stor" => date("Y-m-d"),
            ];

            $upSaldoPengutip = User::where("id", $request->id_user)->update([
                "saldo" => (float) User::where("id", $request->id_user)->first()->saldo - (float) $request->jumlah_storan
            ]);

            $upSaldoAdmin = User::where("role", "SUPER_ADMIN")->update([
                "saldo" => (float) User::where("role", "SUPER_ADMIN")->first()->saldo + (float) $request->jumlah_storan
            ]);

            if ($upSaldoPengutip == true && $upSaldoAdmin == true) {
                $historySaldo = HistorySaldo::create($data);
                return response()->json([
                    'status' => true,
                    "response" => $historySaldo,
                    'message' => "Berhasil mengupdate saldo"
                ], 200);
            } else {
                User::where("id", $request->id_user)->update([
                    "saldo" =>  $saldoAwalPngutip
                ]);

                User::where("role", "SUPER_ADMIN")->update([
                    "saldo" => $saldoAwalAdmin
                ]);

                return response()->json([
                    'status' => false,
                    'message' => "Gagal mengupdate saldo"
                ], 422);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    public function getRiwayatSaldo($id_user = null)
    {
        $his = HistorySaldo::getRiwayatSaldo($id_user);
        return response()->json($his);
    }
    public function getRiwayatSaldoByAuth()
    {
        $his = HistorySaldo::getRiwayatSaldo(auth()->user()->id);
        return response()->json($his);
    }
}

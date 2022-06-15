<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getCountUsaha()
    {
        $data = \App\Models\Usaha::get()->count();
        return ($data);
    }
    public function getCountJurupungut()
    {
        $data = \App\Models\User::where("role", "JURUPUNGUT")->get()->count();
        return ($data);
    }
    public function getCountPerusahaan()
    {
        $data = \App\Models\Npwrd::get()->count();
        return ($data);
    }
    public function counting()
    {
        $data = [
            "usaha" => $this->getCountUsaha(),
            "jurupungut" => $this->getCountJurupungut(),
            "npwrd" => $this->getCountPerusahaan(),
        ];
        return response()->json($data);
    }
}

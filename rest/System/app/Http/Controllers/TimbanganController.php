<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TimbanganController extends Controller
{
    public function timbangan()
    {
        $data = \App\Models\Timbangan::orderBy("tanggal", "DESC")->get();
        foreach ($data as $value) {
            $value->truck;
            $value->sender;
        }
        return response()->json($data);
    }
    public function truck()
    {
        $data = \App\Models\Truck::orderBy("id_truck", "DESC")->get();
        foreach ($data as  $value) {
            $value->sender;
        }
        return response()->json($data);
    }
    public function sender()
    {
        $data = \App\Models\Sender::orderBy("id_sender", "DESC")->get();
        return response()->json($data);
    }
}

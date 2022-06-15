<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Timbangan;
use App\Models\Sender;
use App\Models\Truck;

use Validator;
use Carbon\Carbon;

class SyncronusController extends Controller
{
    public function syncronCreate(Request $request)
    {
        $req = $request->all();
        Truck::truncate();
        Sender::truncate();
        Timbangan::truncate();
        if (!empty($req['truck'])) {
            foreach ($req['truck'] as $value1) {
                unset($value1['created_at']);
                unset($value1['updated_at']);
                $truck = Truck::where('no_polisi', $value1['no_polisi'])->first();
                if (empty($truck)) {
                    $truck = Truck::create($value1);
                } else {
                    $truck->update($value1);
                }
            }
        }

        if (!empty($req['sender'])) {
            foreach ($req['sender'] as $value2) {
                unset($value2['created_at']);
                unset($value2['updated_at']);
                $sender = Sender::where('id_sender', $value2['id_sender'])->first();
                if (empty($sender)) {
                    $sender = Sender::create($value2);
                } else {
                    $sender->update($value2);
                }
            }
        }

        if (!empty($req['timbangan'])) {
            foreach ($req['timbangan'] as $value3) {
                unset($value3['created_at']);
                unset($value3['updated_at']);
                $timbangan = Timbangan::where('serial_no', $value3['serial_no'])->first();
                if (empty($timbangan)) {
                    $timbangan = Timbangan::create($value3);
                } else {
                    $timbangan->update($value3);
                }
            }
        }

        return response()->json($req, 200);
    }
}

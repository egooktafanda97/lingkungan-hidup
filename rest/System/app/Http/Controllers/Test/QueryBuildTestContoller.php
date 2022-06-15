<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Helpers\Helpers;
use App\Models\Pengutipan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class QueryBuildTestContoller extends Controller
{
    // created usaha data by json
    public function testCountMonth()
    {
        $data = Pengutipan::where('bulan', '2022-01')->sum('jumlah_tagihan');
        return response()->json($data);
    }
}

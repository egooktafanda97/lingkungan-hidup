<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use App\Helpers\Helpers;
use App\Models\Usaha;
use App\Models\Pengutipan;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => [
            'login',
            'loginAdmin',
            'register',
            'userGet',
            'deleted'
        ]]);
    }
    public function loginAdmin(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }


        if (User::whereUsername($request->username)->count() == 0) {
            return response()->json([
                "username" => "username salah",
                "password" => "password salah"
            ], 422);
        }

        if (!Hash::check($request->password, User::whereUsername($request->username)->first()->password)) {
            return response()->json([
                "password" => "password salah"
            ], 422);
        }

        if (User::whereUsername($request->username)->first()->role != "SUPER_ADMIN" && User::whereUsername($request->username)->first()->role != "ADMIN") {
            return response()->json([
                "username" => "bukan admin",
                "password" => "bukan admin"
            ], 422);
        }


        if (!$token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized', "status" => false,], 401);
        }

        return $this->createNewToken($token);
    }
    public function login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }


        if (User::whereUsername($request->username)->count() == 0) {
            return response()->json([
                "username" => "username salah",
                "password" => "password salah"
            ], 422);
        }

        if (!Hash::check($request->password, User::whereUsername($request->username)->first()->password)) {
            return response()->json([
                "password" => "password salah"
            ], 422);
        }

        if ($request->role == "JURUPUNGUT" && User::whereUsername($request->username)->first()->role != "JURUPUNGUT") {
            return response()->json([
                "username" => "username salah",
                "password" => "password salah"
            ], 422);
        }

        if (!$token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized', "status" => false,], 401);
        }

        return $this->createNewToken($token);
    }
    public function register(Request $request)
    {
        $UPiMG = Helpers::Upgambar($request, 'foto', 'public/img/users/');
        if (!empty($request->id)) {
            $roleValidate = [
                'nip'       => 'required|unique:users,nip,' . $request->id,
                'nama'      => 'required',
                'alamat'    => 'nullable',
                'no_telp'   => 'required',
                'jabatan'   => 'nullable',
                'username'  => 'nullable|string|between:2,100|unique:users,username,' . $request->id,
                'email'     => 'nullable|string|email|max:100|unique:users,email,' . $request->id,
                'role'      => 'required',
            ];
            unset($roleValidate['nip']);
            $dataUser = User::find($request->id);
            $validator = Validator::make($request->all(), $roleValidate);
            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }
            $data = array_merge(
                $validator->validated(),
                [

                    'nip' => $request->nip,
                    'foto' => $UPiMG['status'] ? $UPiMG['fileName'] : $dataUser->foto
                ]
            );
            if (!empty($request->password)) {
                $data = $data + ["password" => bcrypt($request->password)];
            }
            if (!empty($request->pin)) {
                $data = $data + ["pin" => $request->pin];
            }
            $user = User::where('id', $request->id)->update($data);
        } else {
            $roleValidate = [
                'nip'       => 'required|unique:users',
                'nama'      => 'required',
                'alamat'    => 'nullable',
                'no_telp'   => 'required',
                'jabatan'   => 'nullable',
                'username'  => 'required|string|unique:users|between:2,100',
                'email'     => 'nullable|unique:users|string|email|max:100',
                'password'  => 'required|string|min:3',
                'role'      => 'required',
            ];
            $validator = Validator::make($request->all(), $roleValidate);
            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }
            $data =  [
                'password' => bcrypt($request->password),
                'password_default' => bcrypt('pelalawan@'),
                'foto' => $UPiMG['status'] ? $UPiMG['fileName'] : 'default.png',
                'status_account' => 'isActive',
                'saldo' => 0,
                "visible" => true,
                "date_visible" => date('Y-m-d H:i:s')
            ];
            if (!empty($request->pin)) {
                $data = $data + ["pin" => $request->pin];
            }
            $user = User::create(array_merge(
                $validator->validated(),
                $data

            ));
        }
        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 200);
    }
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }
    public function refresh()
    {
        return $this->createNewToken(auth()->refresh());
    }
    public function userProfile()
    {
        return response()->json(auth()->user());
    }
    public function userGet()
    {
        $user = User::where(['role' => 'JURUPUNGUT', "visible" => true, "status_account" => 'isActive'])->orderBy("id", "DESC")->get();
        return response()->json($user);
    }
    // get data role admin
    public function userGetAdmin()
    {
        $user = User::where(['role' => 'ADMIN', "visible" => true, "status_account" => 'isActive'])->orderBy("id", "DESC")->get();
        return response()->json($user);
    }
    public function userByAuth($month)
    {
        $user = User::where(['id' => auth()->user()->id])->first();
        $dataUsaha = Usaha::where('id_jurupungut', auth()->user()->id)->get();
        $retribusi = Pengutipan::where(["id_user" => auth()->user()->id, "bulan" => $month])->orderBy('id_pengutipan', 'desc')->take(5)->get();
        foreach ($retribusi as $value) {
            $value->usaha = Usaha::where('id_usaha', $value->id_usaha)->first();
        }
        $user->wp = $dataUsaha;
        $user->retribusi = $retribusi;
        return response()->json($user);
    }
    public function userByAuthHome()
    {
        $user = User::where(['id' => auth()->user()->id])->first();
        $dataUsaha = Usaha::where('id_jurupungut', auth()->user()->id)->get();
        $retribusi = Pengutipan::where(["id_user" => auth()->user()->id, "tanggal_kutip" => date("Y-m-d")])->orderBy('id_pengutipan', 'desc')->take(5)->get();
        foreach ($retribusi as $value) {
            $value->usaha = Usaha::where('id_usaha', $value->id_usaha)->first();
            $value->usaha->jumlah_bayar = Usaha::where('id_usaha', $value->id_usaha)->first()->tipe_usaha->jumlah_retribusi;
        }
        $user->wp = $dataUsaha;
        $user->retribusi = $retribusi;
        $user->counting_usaha_selesai =  Pengutipan::where(["id_user" => auth()->user()->id, "bulan" => date("Y-m")])->groupBy('id_usaha')->get();
        return response()->json($user);
    }
    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 600,
            'user' => auth()->user(),
            'role' => auth()->user()->role
        ]);
    }
    // delete user
    public function deleted($id)
    {
        $user = User::find($id);
        $user->visible = false;
        $user->date_visible = date('Y-m-d H:i:s');
        $user->status_account = 'isNotActive';
        $user->save();
        return response()->json([
            'message' => 'User successfully deleted',
            'user' => $user
        ], 200);
    }
    // detect login auth
    public function authCheck()
    {
        return response()->json(auth()->user());
    }
    public function getUserById($id)
    {
        $user = User::where('id', $id)->first();
        $user->usaha = Usaha::where('id_jurupungut', $user->id)->get();
        return response()->json($user);
    }
    public function updateUser(Request $request)
    {
        try {
            $req = $request->all();
            unset($req['password']);
            unset($req['passwordOld']);
            if (!empty($request->passwordOld) && !empty($request->password)) {
                if (Hash::check($request->passwordOld, auth()->user()->password)) {
                    $req = $req + ["password" => bcrypt($request->password)];
                } else {
                    return response()->json(['message' => 'Password old is wrong'], 400);
                }
            }
            $user = User::where('id', auth()->user()->id)->update($req);
            return response()->json(["status" => true, "response" => $user, "msg" => "data berhasil di update"], 200);
        } catch (\Throwable $th) {
            return response()->json(["status" => false, "response" => $th, "msg" => "oops error update"], 400);
        }
    }
    // delete user
    public function deleteUser($id)
    {
        $user = User::find($id);
        $user->visible = false;
        $user->date_visible = date('Y-m-d H:i:s');
        $user->status_account = 'isNotActive';
        $user->save();
        return response()->json([
            'message' => 'User successfully deleted',
            'user' => $user
        ], 200);
    }
    // me
    public function me()
    {
        return response()->json(auth()->user());
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistorySaldo extends Model
{
    use HasFactory;
    protected $table = 'history_saldo';
    protected $primaryKey = 'id_history_saldo';
    protected $fillable = [
        "admin_id",
        "id_user",
        "tahun",
        "bulan",
        "jumlah_saldo",
        "jumlah_storan",
        "saldo",
        "tanggal_stor",
        "saldo_admin"
    ];
    // join to user
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'id_user', 'id');
    }

    public static function getRiwayatSaldo($id_user = null)
    {
        if ($id_user != null) {
            $gets = self::where('id_user', $id_user)->orderBy("created_at", "DESC")->get();
        } else {
            $gets = self::get();
        }

        foreach ($gets as  $value) {
            $value->user;
            $value->admin = User::where('id', $value->admin_id)->first();
        }
        return $gets;
    }
}

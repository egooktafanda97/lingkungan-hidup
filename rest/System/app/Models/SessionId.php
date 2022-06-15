<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SessionId extends Model
{
    use HasFactory;
    protected $table = 'session_id';
    protected $primaryKey = 'session_id';
    protected $fillable = [
        "session_id",
    ];
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nip');
            $table->string('nama');
            $table->string('alamat');
            $table->string('no_telp');
            $table->string('email')->unique()->nullable();
            $table->string('jabatan');
            $table->string('username');
            $table->string('password');
            $table->string('password_default');
            $table->string('api_key')->unique();
            $table->string('role');
            $table->string('status_account', 30);
            $table->string('foto', 200);
            $table->string('saldo', 200);
            $table->string('visible', 30);
            $table->date('date_visible');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}

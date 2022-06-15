<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsahasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usaha', function (Blueprint $table) {
            $table->bigIncrements('id_usaha');
            $table->bigInteger('id_jurupungut')->nullable();
            $table->string('kode')->nullable()->uniqid();
            $table->bigInteger('id_zona');
            $table->string('qrCode');
            $table->string('nama_usaha');
            $table->string('nama_pemilik');
            $table->string('alamat');
            $table->string('no_telp', 20)->nullable();
            $table->string('status', 20);
            $table->string('foto')->nullable();
            $table->text('alamat_lengkap')->nullable();
            $table->string('latitude')->nullable();
            $table->date('didata')->nullable();
            $table->bigInteger('id_jenis_usaha');
            $table->string('visible', 20);
            $table->date('date_visible')->nullable();
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
        Schema::dropIfExists('usaha');
    }
}

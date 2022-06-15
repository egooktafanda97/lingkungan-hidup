<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSendersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sender', function (Blueprint $table) {
            $table->bigIncrements('id_sender');
            $table->string('nama_lokasi');
            $table->text('keterangan')->nullable();
            $table->text('spesifikasi_alamat')->nullable();
            $table->string('kabupaten', 60)->nullable();
            $table->string('kecamatan', 60)->nullable();
            $table->string('desa', 60)->nullable();
            $table->string('status', 50);
            $table->string('synchronous', 20);
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
        Schema::dropIfExists('sender');
    }
}

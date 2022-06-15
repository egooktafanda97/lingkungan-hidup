<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePengutipansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pengutipan', function (Blueprint $table) {
            $table->bigIncrements('id_pengutipan');
            $table->bigInteger('id_user')->unsigned();
            $table->bigInteger('id_usaha')->unsigned();
            $table->string('session_create', 100)->uniqid();
            $table->string('bulan', 60)->comment('tahun dan bulan');
            $table->date('tanggal_kutip');
            $table->string('jumlah_tagihan', 200);
            $table->string('lokasi', 100);
            $table->boolean('status_penyerahan')->default(false);
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
        Schema::dropIfExists('pengutipan');
    }
}

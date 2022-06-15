<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRiwayatSaldosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('riwayat_saldo', function (Blueprint $table) {
            $table->bigIncrements('id_riwayat');
            $table->bigInteger('id_retribusi')->unsigned();
            $table->string('bulan');
            $table->string('tanggal_kutip');
            $table->string('saldo_awal');
            $table->string('saldo_akhir');
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
        Schema::dropIfExists('riwayat_saldo');
    }
}

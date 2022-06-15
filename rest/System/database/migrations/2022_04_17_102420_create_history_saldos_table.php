<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistorySaldosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('history_saldo', function (Blueprint $table) {
            $table->bigIncrements('id_history_saldo');
            $table->bigInteger('id_user')->unsigned();
            $table->string('tahun');
            $table->string('bulan');
            $table->string('jumlah_saldo');
            $table->dateTime('jumlah_storan');
            $table->dateTime('tanggal_stor')->nullable();
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
        Schema::dropIfExists('history_saldo');
    }
}

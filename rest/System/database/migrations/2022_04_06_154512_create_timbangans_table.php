<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTimbangansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('timbangan', function (Blueprint $table) {
            $table->string('serial_no', 100)->uniqid()->primary();
            $table->bigInteger('id_truck');
            $table->bigInteger('id_sender');
            $table->bigInteger('id_user');
            $table->string('berat', 100);
            $table->string('tare', 100);
            $table->string('total', 100);
            $table->date('tanggal');
            $table->time('jam');
            $table->string('status', 40);
            $table->string('status_cetak', 20)->nullable();
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
        Schema::dropIfExists('timbangan');
    }
}

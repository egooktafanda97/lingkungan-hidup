<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrucksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('truck', function (Blueprint $table) {
            $table->bigIncrements('id_truck');
            $table->string('no_polisi', 40);
            $table->string('jenis_mobil', 40);
            $table->string('tare', 40);
            $table->string('nama_sopir', 40);
            $table->bigInteger('id_lokasi');
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
        Schema::dropIfExists('truck');
    }
}

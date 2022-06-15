<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJenisUsahasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jenis_usaha', function (Blueprint $table) {
            $table->bigIncrements('id_jenis_usaha');
            $table->string('nama_jenis_usaha');
            $table->text('keterangan');
            $table->string('jumlah_retribusi');
            $table->string('status', 20);
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
        Schema::dropIfExists('jenis_usahas');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRetribusiNpwrdsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('retribusi_npwrd', function (Blueprint $table) {
            $table->bigIncrements("id_retribusi");
            $table->bigInteger("id_npwrd");
            $table->string("tahun", 20);
            $table->string("bukan", 30);
            $table->string("jenis_retribusi", 150);
            $table->date("periode_mulai");
            $table->date("periode_sampai");
            $table->string("jumlah", 100);
            $table->date("tgl_setor");
            $table->softDeletes();
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
        Schema::dropIfExists('retribusi_npwrd');
    }
}

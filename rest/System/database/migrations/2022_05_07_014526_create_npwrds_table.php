<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNpwrdsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('npwrd', function (Blueprint $table) {
            $table->bigIncrements("id_npwrd");
            $table->bigInteger("id_jurupungut");
            $table->string("no_urut");
            $table->string("nama");
            $table->string("alamat");
            $table->string("penyetoran_berdasarkan", 50);
            $table->string("masa_retribusi", 50);
            $table->string("kode_rekening", 50);
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
        Schema::dropIfExists('npwrd');
    }
}

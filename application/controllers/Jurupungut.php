<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Jurupungut extends CI_Controller
{
    public function index()
    {
        $data = [
            "page" => "Jurupungut/index",
            "style" => "Jurupungut/style",
            "script" => "Jurupungut/script",
        ];
        $this->load->view('Layout/index', $data);
    }
    public function detail()
    {
        $data = [
            "page" => "JurupungutDetail/index",
            "style" => "JurupungutDetail/style",
            "script" => "JurupungutDetail/script",
        ];
        $this->load->view('Layout/index', $data);
    }
    public function Laporan()
    {
        $data = [
            "page" => "LaporanJuruPungut/index",
            "style" => "LaporanJuruPungut/style",
            "script" => "LaporanJuruPungut/script",
        ];
        $this->load->view('Layout/index', $data);
    }
}

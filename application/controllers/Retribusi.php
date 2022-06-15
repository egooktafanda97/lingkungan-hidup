<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Retribusi extends CI_Controller
{
    public function index()
    {
        $data = [
            "page" => "Retribusi/LaporanTable/index",
            "style" => "Retribusi/LaporanTable/style",
            "script" => "Retribusi/LaporanTable/script",
        ];
        $this->load->view('Layout/index', $data);
    }
}

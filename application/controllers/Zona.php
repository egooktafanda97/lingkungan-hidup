<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Zona extends CI_Controller
{
    public function index()
    {
        $data = [
            "page" => "Zona/index",
            "style" => "Zona/style",
            "script" => "Zona/script",
        ];
        $this->load->view('Layout/index', $data);
    }
}

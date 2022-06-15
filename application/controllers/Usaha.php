<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Usaha extends CI_Controller
{
    public function index()
    {
        $data = [
            "page" => "Usaha/index",
            "style" => "Usaha/style",
            "script" => "Usaha/script",
        ];
        $this->load->view('Layout/index', $data);
    }
    public function detail($id)
    {
        $data = [
            "page" => "DetailUsaha/index",
            "style" => "DetailUsaha/style",
            "script" => "DetailUsaha/script",
        ];
        $this->load->view('Layout/index', $data);
    }
}

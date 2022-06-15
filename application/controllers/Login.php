<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Login extends CI_Controller
{
    public function index()
    {
        $data = [
            "page" => "Usaha/index",
            "style" => "Usaha/style",
            "script" => "Usaha/script",
        ];
        $this->load->view('page/Login/index', $data);
    }
}

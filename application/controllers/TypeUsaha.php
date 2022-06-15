<?php
defined('BASEPATH') or exit('No direct script access allowed');

class TypeUsaha extends CI_Controller
{
    public function index()
    {
        $data = [
            "page" => "TipeUsaha/index",
            "style" => "TipeUsaha/style",
            "script" => "TipeUsaha/script",
        ];
        $this->load->view('Layout/index', $data);
    }
}

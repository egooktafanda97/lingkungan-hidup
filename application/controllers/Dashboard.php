<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Dashboard extends CI_Controller
{
    public function index()
    {

        $data = [
            "page" => "Dashboard/index",
            "style" => "Dashboard/style",
            "script" => "Dashboard/script",
        ];
        $this->load->view('Layout/index', $data);
    }
}

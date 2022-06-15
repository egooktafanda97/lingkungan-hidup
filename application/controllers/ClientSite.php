<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ClientSite extends CI_Controller
{
    public function index()
    {
        $data = [
            "page" => "ClientSite/index",
            "style" => "ClientSite/style",
            "script" => "ClientSite/script",
        ];
        $this->load->view('Layout/index', $data);
    }
}

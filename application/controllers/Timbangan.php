<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Timbangan extends CI_Controller
{
    public function index()
    {
        // redirect(base_url('dashboard/index'));
    }
    public function scales()
    {
        $data = [
            "page" => "Timbangan/index",
            "style" => "Timbangan/style",
            "script" => "Timbangan/script",
        ];
        $this->load->view('Layout/index', $data);
    }
    public function truck()
    {
        $data = [
            "page" => "Truck/index",
            "style" => "Truck/style",
            "script" => "Truck/script",
        ];
        $this->load->view('Layout/index', $data);
    }
    public function sender()
    {
        $data = [
            "page" => "Sender/index",
            "style" => "Sender/style",
            "script" => "Sender/script",
        ];
        $this->load->view('Layout/index', $data);
    }
}

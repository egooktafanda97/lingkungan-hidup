<?php
defined('BASEPATH') or exit('No direct script access allowed');

class RetribusiNpwrd extends CI_Controller
{
    public function index()
    {
        $data = [
            "page"      => "Retribusi/RetribusiNpwrd/index",
            "style"     => "Retribusi/RetribusiNpwrd/style",
            "script"    => "Retribusi/RetribusiNpwrd/script",
        ];
        $this->load->view('Layout/index', $data);
    }
}

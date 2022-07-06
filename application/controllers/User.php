<?php
defined('BASEPATH') or exit('No direct script access allowed');

class User extends CI_Controller
{
    public function index()
    {
        $data = [
            "page" => "user/index",
            "style" => "user/style",
            "script" => "user/script",
        ];
        $this->load->view('Layout/index', $data);
    }
    public function profile()
    {
        $data = [
            "page" => "profile/index",
            "style" => "profile/style",
            "script" => "profile/script",
        ];
        $this->load->view('Layout/index', $data);
    }
}

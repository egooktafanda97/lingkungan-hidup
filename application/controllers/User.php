<?php
defined('BASEPATH') or exit('No direct script access allowed');

class User extends CI_Controller
{
    public function index()
    {
        $data = [
            "page" => "User/index",
            "style" => "User/style",
            "script" => "User/script",
        ];
        $this->load->view('Layout/index', $data);
    }
    public function profile()
    {
        $data = [
            "page" => "Profile/index",
            "style" => "Profile/style",
            "script" => "Profile/script",
        ];
        $this->load->view('Layout/index', $data);
    }
}

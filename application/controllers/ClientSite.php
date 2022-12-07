<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ClientSite extends CI_Controller
{
    public function index()
    {
        if (empty($_GET['key']))
            return;
        $data["usaha"] = $this->db->get_where("usaha", ["qrCode" => $_GET['key']])->row_array();
        $this->load->view('web/cient_retribusi', $data);
    }
}

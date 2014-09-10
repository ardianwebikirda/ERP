<?php
class Menu extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        if ($this->session->userdata('logged_in') !== true) {
            redirect('main');
        }
    }

    function index()
    {
        $this->load->model('user_model');
        $node = $this->input->post('node');
        // var_dump($node);
        // exit();
        $node = ($node === 'NaN') ? null : $node;
        echo json_encode($this->user_model->validasi_rule($node));
    }
}
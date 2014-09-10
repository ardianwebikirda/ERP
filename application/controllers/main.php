<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Main extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
    }
    function index()
    {
        $this->load->view('authlogin');
    }

    function validasi_credential()
    {
    	$this->form_validation->set_rules('username','Username','trim|required|xss_clean');
    	$this->form_validation->set_rules('password','Password','trim|required|xss_clean|callback_check_database');

    	if($this->form_validation->run() == FALSE)
    	{
    		$this->index();
    	}
    	else
    	{
    		redirect('site/user_area/');
    	}
    }

    function check_database()
    {
        $this->load->model('user_model');

    	$username = $this->input->post('username', TRUE);
    	$password = $this->input->post('password');
    	$result = $this->user_model->validasi_user($username, $password); //Proses Parsing Variabel Ke Model 
        // var_dump($result);
        // exit();
    	if($result)
    	{
    		$sess_array = array();// Deklarasi Variabel Yg Bersifat Array 
    		foreach($result as $row)
    		{
    			$sess_array = array('logged_in'   => true, 'username' => $row->username, 'id' => $row->ad_user_id); // Array Definisi yg bersifat true
    			$this->session->set_userdata($sess_array);
    		}
    		return TRUE;
    	}
    	else
    	{
    		$this->form_validation->set_message('check_database', 'Invalid Username or Password');
    		return FALSE;
    	}

    }

    function logout()
    {
    	$this->session->sess_destroy();
    	$this->index();
    }
}
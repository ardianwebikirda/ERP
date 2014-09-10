<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Site extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
    }

    function user_area()
    {
        if($this->session->userdata('logged_in') == true)
        {
            $this->load->model('user_model');
            $iscreate   = $this->user_model->iscreatePrevilege()->result();
            $isupdate   = $this->user_model->isupdatePrevilege()->result();
            $isdelete   = $this->user_model->isdeletePrevilege()->result();
            $isprocess  = $this->user_model->isprocessPrevilege()->result();

            $previlege   = '';
            foreach($iscreate as $create){
                $previlege   .= 'var create'.$create->menu.' = '.$create->iscreate.'; ';
            }
            foreach($isupdate as $update){
                $previlege   .= 'var update'.$update->menu.' = '.$update->isupdate.'; ';
            }
            foreach($isdelete as $delete){
                $previlege   .= 'var delete'.$delete->menu.' = '.$delete->isdelete.'; ';
            }
            foreach($isprocess as $process){
                $previlege   .= 'var process'.$process->menu.' = '.$process->isprocess.'; ';
            }
            $data['previlege'] = $previlege;
            $this->load->view('dashboard', $data);
        }
        else
        {
            $this->load->view('authlogin');
        }
    }
}
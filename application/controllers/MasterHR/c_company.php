<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class C_company extends CI_Controller{

  public function __construct(){
    parent::__construct();
    $this->load->library('excel');
    $this->load->model('MasterHR/m_company');
  }

  public function getCompany(){
        $start      = ($this->input->get('start', TRUE) ? $this->input->get('start', TRUE) : 0);
        $limit      = ($this->input->get('limit', TRUE) ? $this->input->get('limit', TRUE) : 20);
     
    $result   = $this->m_company->getGridCompany($start, $limit);
    $result1  = $this->m_company->countGridCompany();
    $count    = $result1->num_rows();
      foreach ($result->result() as $key => $value) {
        $data['data'][] = array( 
          'id'  => $value->id,
          'name'  => $value->name,
          'code' => $value->code  
        );
      }
        $data['total']   = $count;
        $data['success'] = true;
        echo json_encode($data);
  }

  public function delCompany(){
    $data   = json_decode($this->input->post('post'));
    foreach ($data as $row) {
      $this->m_company->delCompany($row->id);
     }

     $this->getCompany(); 
  }

  public function saveCompany(){
    $id     = ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
    $name     = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    $code    = ($this->input->post('code', TRUE) ? $this->input->post('code', TRUE) : '');
    $uuid     = $this->m_company->getUUID();

    if($name == '' || $name == null){
      $success = 3;
    } else if($this->m_company->cekName($name) == 0){
      $this->m_company->saveCompany($name, $code, $uuid);
      if($this->m_company->saveConfirm($uuid)==0){
        $success = 0;
      } else {
        $success = 1;
      }
    } else {
      $success = 2;
    }

    $data['total']    = $success;
    $data['success']  = TRUE;
    echo json_encode($data);
  }

  public function editCompany(){
    $id     = ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
    $name     = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    $code    = ($this->input->post('code', TRUE) ? $this->input->post('code', TRUE) : '');
    $uuid     = $this->m_company->getUUID();

    if($id == '' || $id == null){
      $success = 0;
    } else if($this->m_company->cekCompanyID($name, $id)==0) {
      $this->m_company->updateCompany($name, $code, $id);
      $success = 1;
    } else {
      $success = 2;
    }
    $data['total']    = $success;
    $data['success']  = true;
    echo json_encode($data);
  }

  public function searchCompany(){
      $name     = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
      $result   = $this->m_company->searchCompany($name);
      foreach ($result->result() as $key => $value) {
        $data['data'][] = array(        
          'id'    => $value->id,
          'name'      => $value->name,
          'code'     => $value->lavel
        );
      }
        $data['success'] = TRUE;
        echo json_encode($data);
    }

    public function viewCompany(){
      $result = $this->m_company->getViewCompany();
      foreach ($result->result() as $key => $value) {
        $data['data'][]= array(
          'namecompany'  => $value->name,
          'id'      => $value->id_company
        );
      }
      echo json_encode($data);
    }
}
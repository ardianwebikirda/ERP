<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class C_bank extends CI_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->library('excel');
		$this->load->model('MasterData/m_bank');
	}

	public function getBank(){
        $start      = ($this->input->get('start', TRUE) ? $this->input->get('start', TRUE) : 0);
        $limit      = ($this->input->get('limit', TRUE) ? $this->input->get('limit', TRUE) : 20);
     
		$result 	= $this->m_bank->getGridBank($start, $limit);
		$result1	= $this->m_bank->countGridBank();
		$count 		= $result1->num_rows();
    	foreach ($result->result() as $key => $value) {
      		$data['data'][] = array( 
				'id' 	=> $value->id,
				'name'	=> $value->name	
			);
		}
        $data['total']   = $count;
        $data['success'] = true;
        echo json_encode($data);
	}

	public function delBank(){
		$data 	= json_decode($this->input->post('post'));
		foreach ($data as $row) {
	 		$this->m_bank->delBank($row->id);
		 }

		 $this->getBank(); 
	}

	public function saveBank(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$uuid 		= $this->m_bank->getUUID();

		if($name == '' || $name == null){
			$success = 3;
		} else if($this->m_bank->cekName($name) == 0){
			$this->m_bank->saveBank($name, $uuid);
		 	if($this->m_bank->saveConfirm($uuid)==0){
		 		$success = 0;
		 	} else {
			 	$success = 1;
		 	}
		} else {
			$success = 2;
		}

		$data['total'] 		= $success;
		$data['success']	= TRUE;
		echo json_encode($data);
	}

	public function editBank(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$uuid 		= $this->m_bank->getUUID();

		if($id == '' || $id == null){
			$success = 0;
		} else if($this->m_bank->cekBankID($name, $id)==0) {
			$this->m_bank->updateBank($name, $id);
			$success = 1;
		} else {
			$success = 2;
		}
		$data['total']		= $success;
		$data['success'] 	= true;
		echo json_encode($data);
	}

	public function searchBank(){
	    $name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
	    $result 	= $this->m_bank->searchBank($name);
	    foreach ($result->result() as $key => $value) {
	      $data['data'][] = array(        
	        'id'		=> $value->id,
	        'name'      => $value->name
	      );
	    }
        $data['success'] = TRUE;
        echo json_encode($data);
  	}
}
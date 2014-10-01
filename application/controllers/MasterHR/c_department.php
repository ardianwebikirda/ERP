<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class C_department extends CI_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->library('excel');
		$this->load->model('MasterHR/m_department');
	}

	public function getDepartment(){
        $start      = ($this->input->get('start', TRUE) ? $this->input->get('start', TRUE) : 0);
        $limit      = ($this->input->get('limit', TRUE) ? $this->input->get('limit', TRUE) : 20);
     
		$result 	= $this->m_department->getGridDepartment($start, $limit);
		$result1	= $this->m_department->countGridDepartment();
		$count 		= $result1->num_rows();
    	foreach ($result->result() as $key => $value) {
      		$data['data'][] = array( 
				'id' 	=> $value->id,
				'name'	=> $value->name,
				'code'	=> $value->code	
			);
		}
        $data['total']   = $count;
        $data['success'] = true;
        echo json_encode($data);
	}

	public function delDepartment(){
		$data 	= json_decode($this->input->post('post'));
		foreach ($data as $row) {
	 		$this->m_department->delDepartment($row->id);
		 }

		 $this->getDepartment(); 
	}

	public function saveDepartment(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$level 		= ($this->input->post('code', TRUE) ? $this->input->post('code', TRUE) : '');
		$uuid 		= $this->m_department->getUUID();

		if($name == '' || $name == null){
			$success = 3;
		} else if($this->m_department->cekName($name) == 0){
			$this->m_department->saveDepartment($name, $level, $uuid);
		 	if($this->m_department->saveConfirm($uuid)==0){
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

	public function editDepartment(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$level 		= ($this->input->post('code', TRUE) ? $this->input->post('code', TRUE) : '');
		$uuid 		= $this->m_department->getUUID();

		if($id == '' || $id == null){
			$success = 0;
		} else if($this->m_department->cekDepartmentID($name, $id)==0) {
			$this->m_department->updateDepartment($name, $level, $id);
			$success = 1;
		} else {
			$success = 2;
		}
		$data['total']		= $success;
		$data['success'] 	= true;
		echo json_encode($data);
	}

	public function searchDepartment(){
	    $name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
	    $result 	= $this->m_department->searchDepartment($name);
	    foreach ($result->result() as $key => $value) {
	      $data['data'][] = array(        
	        'id'		=> $value->id,
	        'name'      => $value->name,
	        'code'   	=> $value->code
	      );
	    }
        $data['success'] = TRUE;
        echo json_encode($data);
  	}

  	public function viewDepartment(){
  		$result = $this->m_department->getViewDepartment();
  		foreach ($result->result() as $key => $value) {
  			$data['data'][]= array(
  				'namedepartment'	=> $value->name,
  				'id' 			=> $value->id_department
  			);
  		}
  		echo json_encode($data);
  	}
}
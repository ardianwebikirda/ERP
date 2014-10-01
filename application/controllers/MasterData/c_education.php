<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class C_education extends CI_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->library('excel');
		$this->load->model('MasterData/m_education');
	}

	public function getEducation(){
        $start      = ($this->input->get('start', TRUE) ? $this->input->get('start', TRUE) : 0);
        $limit      = ($this->input->get('limit', TRUE) ? $this->input->get('limit', TRUE) : 20);
     
		$result 	= $this->m_education->getGridEducation($start, $limit);
		$result1	= $this->m_education->countGridEducation();
		$count 		= $result1->num_rows();
    	foreach ($result->result() as $key => $value) {
      		$data['data'][] = array( 
				'id' 	=> $value->id,
				'name'	=> $value->name,
				'level'	=> $value->level	
			);
		}
        $data['total']   = $count;
        $data['success'] = true;
        echo json_encode($data);
	}

	public function delEducation(){
		$data 	= json_decode($this->input->post('post'));
		foreach ($data as $row) {
	 		$this->m_education->delEducation($row->id);
		 }

		 $this->getEducation(); 
	}

	public function saveEducation(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$level 		= ($this->input->post('level', TRUE) ? $this->input->post('level', TRUE) : '');
		$uuid 		= $this->m_education->getUUID();

		if($name == '' || $name == null){
			$success = 3;
		} else if($this->m_education->cekName($name) == 0){
			$this->m_education->saveEducation($name, $level, $uuid);
		 	if($this->m_education->saveConfirm($uuid)==0){
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

	public function editEducation(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$level 		= ($this->input->post('level', TRUE) ? $this->input->post('level', TRUE) : '');
		$uuid 		= $this->m_education->getUUID();

		if($id == '' || $id == null){
			$success = 0;
		} else if($this->m_education->cekEducationID($name, $level, $id)==0) {
			$this->m_education->updateEducation($name, $level, $id);
			$success = 1;
		} else {
			$success = 2;
		}
		$data['total']		= $success;
		$data['success'] 	= true;
		echo json_encode($data);
	}

	public function searchEducation(){
	    $name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
	    $result 	= $this->m_education->searchEducation($name);
	    foreach ($result->result() as $key => $value) {
	      $data['data'][] = array(        
	        'id'		=> $value->id,
	        'name'      => $value->name,
	        'level'   	=> $value->lavel
	      );
	    }
        $data['success'] = TRUE;
        echo json_encode($data);
  	}
}
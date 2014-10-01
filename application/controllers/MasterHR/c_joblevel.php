<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class C_joblevel extends CI_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->library('excel');
		$this->load->model('MasterHR/m_joblevel');
	}

	public function getJobLevel(){
        $start      = ($this->input->get('start', TRUE) ? $this->input->get('start', TRUE) : 0);
        $limit      = ($this->input->get('limit', TRUE) ? $this->input->get('limit', TRUE) : 20);
     
		$result 	= $this->m_joblevel->getGridJobLevel($start, $limit);
		$result1	= $this->m_joblevel->countGridJobLevel();
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

	public function delJobLevel(){
		$data 	= json_decode($this->input->post('post'));
		foreach ($data as $row) {
	 		$this->m_joblevel->delJobLevel($row->id);
		 }

		 $this->getJobLevel(); 
	}

	public function saveJobLevel(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$level 		= ($this->input->post('level', TRUE) ? $this->input->post('level', TRUE) : '');
		$uuid 		= $this->m_joblevel->getUUID();

		if($name == '' || $name == null){
			$success = 3;
		} else if($this->m_joblevel->cekName($name) == 0){
			$this->m_joblevel->saveJobLevel($name, $level, $uuid);
		 	if($this->m_joblevel->saveConfirm($uuid)==0){
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

	public function editJobLevel(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$level 		= ($this->input->post('level', TRUE) ? $this->input->post('level', TRUE) : '');
		$uuid 		= $this->m_joblevel->getUUID();

		if($id == '' || $id == null){
			$success = 0;
		} else if($this->m_joblevel->cekJobLevelID($name, $id)==0) {
			$this->m_joblevel->updateJobLevel($name, $level, $id);
			$success = 1;
		} else {
			$success = 2;
		}
		$data['total']		= $success;
		$data['success'] 	= true;
		echo json_encode($data);
	}

	public function searchJobLevel(){
	    $name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
	    $result 	= $this->m_joblevel->searchJobLevel($name);
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

  	public function viewJobLevel(){
  		$result = $this->m_joblevel->getViewJobLevel();
  		foreach ($result->result() as $key => $value) {
  			$data['data'][]= array(
  				'namejoblevel'	=> $value->name,
  				'id' 			=> $value->id_joblevel
  			);
  		}
  		echo json_encode($data);
  	}
}
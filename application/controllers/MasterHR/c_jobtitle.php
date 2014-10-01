<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class C_jobtitle extends CI_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->library('excel');
		$this->load->model('MasterHR/m_jobtitle');
	}

	public function getJobTitle(){
        $start      = ($this->input->get('start', TRUE) ? $this->input->get('start', TRUE) : 0);
        $limit      = ($this->input->get('limit', TRUE) ? $this->input->get('limit', TRUE) : 20);
     
		$result 	= $this->m_jobtitle->getGridJobTitle($start, $limit);
		$result1	= $this->m_jobtitle->countGridJobTitle();
		$count 		= $result1->num_rows();
        foreach ($result->result() as $key => $value) {
      		$data['data'][] = array( 
				'id' 			=> $value->id,
				'name'			=> $value->name,
				'id_joblevel'	=> $value->id_joblevel,
				'namejoblevel' 	=> $value->namejoblevel
			);
		}
        $data['total']   = $count;
        $data['success'] = true;

        echo json_encode($data);
	}

	public function delJobTitle(){
		$data 	= json_decode($this->input->post('post'));
		foreach ($data as $row) {
	 		$this->m_jobtitle->delJobTitle($row->id);
		 }

		 $this->getJobTitle(); 
	}

	public function saveJobTitle(){
		$id 			= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$id_joblevel	= ($this->input->post('id_joblevel', TRUE) ? $this->input->post('id_joblevel', TRUE) : '');
		$name 			= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$uuid 			= $this->m_jobtitle->getUUID();

		if($name == '' || $name == null){
			$success = 3;
		} else if($this->m_jobtitle->cekName($name) == 0){
			$this->m_jobtitle->saveJobTitle($id_joblevel, $name, $uuid);
		 	if($this->m_jobtitle->saveConfirm($uuid)==0){
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

	public function editJobTitle(){
		$id 			= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$id_joblevel	= ($this->input->post('id_joblevel', TRUE) ? $this->input->post('id_joblevel', TRUE) : '');
		$name 			= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$uuid 			= $this->m_jobtitle->getUUID();

		if($id == '' || $id == null){
			$success = 0;
		} else if($this->m_jobtitle->cekJobTitleID($name, $id)==0) {
			$this->m_jobtitle->updateJobTitle($id_joblevel, $name, $id);
			$success = 1;
		} else {
			$success = 2;
		}
		$data['total']		= $success;
		$data['success'] 	= true;
		echo json_encode($data);
	}

	public function searchJobTitle(){
	    $name     = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
	    $result = $this->m_jobtitle->searchJobTitle($name);
	    foreach ($result->result() as $key => $value) {
	      $data['data'][] = array(        
	        'id'        	=> $value->id,
	        'id_joblevel'	=> $value->id_joblevel,
	        'namejoblevel'	=> $value->namejoblevel, 
		    'name'      	=> $value->name   
	      );
	    }
        $data['success'] = TRUE;
        echo json_encode($data);
  	}
}
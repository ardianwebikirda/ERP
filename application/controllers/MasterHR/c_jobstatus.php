<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class C_jobstatus extends CI_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->library('excel');
		$this->load->model('MasterHR/m_jobstatus');
	}

	public function getJobStatus(){
        $start      = ($this->input->get('start', TRUE) ? $this->input->get('start', TRUE) : 0);
        $limit      = ($this->input->get('limit', TRUE) ? $this->input->get('limit', TRUE) : 20);
     
		$result 	= $this->m_jobstatus->getGridJobStatus($start, $limit);
		$result1	= $this->m_jobstatus->countGridJobStatus();
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

	public function delJobStatus(){
		$data 	= json_decode($this->input->post('post'));
		foreach ($data as $row) {
	 		$this->m_jobstatus->delJobStatus($row->id);
		 }

		 $this->getJobStatus(); 
	}

	public function saveJobStatus(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$uuid 		= $this->m_jobstatus->getUUID();

		if($name == '' || $name == null){
			$success = 3;
		} else if($this->m_jobstatus->cekName($name) == 0){
			$this->m_jobstatus->saveJobStatus($name, $uuid);
		 	if($this->m_jobstatus->saveConfirm($uuid)==0){
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

	public function editJobStatus(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$uuid 		= $this->m_jobstatus->getUUID();

		if($id == '' || $id == null){
			$success = 0;
		} else if($this->m_jobstatus->cekJobStatusID($name, $id)==0) {
			$this->m_jobstatus->updateJobStatus($name, $id);
			$success = 1;
		} else {
			$success = 2;
		}
		$data['total']		= $success;
		$data['success'] 	= true;
		echo json_encode($data);
	}

	public function searchJobStatus(){
	    $name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
	    $result 	= $this->m_jobstatus->searchJobStatus($name);
	    foreach ($result->result() as $key => $value) {
	      $data['data'][] = array(        
	        'id'		=> $value->id,
	        'name'      => $value->name
	      );
	    }
        $data['success'] = TRUE;
        echo json_encode($data);
  	}

  	public function viewJobStatus(){
  		$result = $this->m_jobstatus->getViewJobStatus();
  		foreach ($result->result() as $key => $value) {
  			$data['data'][]= array(
  				'namejobstatus'	=> $value->name,
  				'id' 			=> $value->id_jobstatus
  			);
  		}
  		echo json_encode($data);
  	}
}
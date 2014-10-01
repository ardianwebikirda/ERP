<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class C_officehour extends CI_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->library('excel');
		$this->load->model('MasterHR/m_officehour');
	}

	public function getOfficeHour(){
        $start      = ($this->input->get('start', TRUE) ? $this->input->get('start', TRUE) : 0);
        $limit      = ($this->input->get('limit', TRUE) ? $this->input->get('limit', TRUE) : 20);
     
		$result 	= $this->m_officehour->getGridOfficeHour($start, $limit);
		$result1	= $this->m_officehour->countGridOfficeHour();
		$count 		= $result1->num_rows();
    	foreach ($result->result() as $key => $value) {
      		$data['data'][] = array( 
				'id' 		=> $value->id,
				'name'		=> $value->name,
				'time_in'	=> $value->time_in,
				'time_out' 	=> $value->time_out	
			);
		}
        $data['total']   = $count;
        $data['success'] = true;
        echo json_encode($data);
	}

	public function delOfficeHour(){
		$data 	= json_decode($this->input->post('post'));
		foreach ($data as $row) {
	 		$this->m_officehour->delOfficeHour($row->id);
		 }

		 $this->getOfficeHour(); 
	}

	public function saveOfficeHour(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$time_in	= ($this->input->post('time_in', TRUE) ? $this->input->post('time_in', TRUE) : '');
		$time_out	= ($this->input->post('time_out', TRUE) ? $this->input->post('time_out', TRUE) : '');
		$uuid 		= $this->m_officehour->getUUID();

		if($name == '' || $name == null){
			$success = 3;
		} else if($this->m_officehour->cekName($name) == 0){
			$this->m_officehour->saveOfficeHour($name, $time_in, $time_out, $uuid);
		 	if($this->m_officehour->saveConfirm($uuid)==0){
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

	public function editOfficeHour(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$time_in	= ($this->input->post('time_in', TRUE) ? $this->input->post('time_in', TRUE) : '');
		$time_out	= ($this->input->post('time_out', TRUE) ? $this->input->post('time_out', TRUE) : '');
		$uuid 		= $this->m_officehour->getUUID();

		if($id == '' || $id == null){
			$success = 0;
		} else if($this->m_officehour->cekOfficeHourID($name, $id)==0) {
			$this->m_officehour->updateOfficeHour($name, $time_in, $time_out, $id);
			$success = 1;
		} else {
			$success = 2;
		}
		$data['total']		= $success;
		$data['success'] 	= true;
		echo json_encode($data);
	}

	public function searchOfficeHour(){
	    $name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
	    $result 	= $this->m_officehour->searchOfficeHour($name);
	    foreach ($result->result() as $key => $value) {
	      $data['data'][] = array(        
	        'id'		=> $value->id,
	        'name'      => $value->name,
	        'time_in' 	=> $value->time_in,
	        'time_out' 	=> $value->time_out
	      );
	    }
        $data['success'] = TRUE;
        echo json_encode($data);
  	}

  	public function viewOfficeHour(){
  		$result = $this->m_officehour->getViewOfficeHour();
  		foreach ($result->result() as $key => $value) {
  			$data['data'][]= array(
  				'nameofficehour'	=> $value->name,
  				'id' 				=> $value->id_officehour
  			);
  		}
  		echo json_encode($data);
  	}
}
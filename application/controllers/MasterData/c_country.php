<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class C_country extends CI_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->library('excel');
		$this->load->model('MasterData/m_country');
	}

	public function getCountry(){
        $start      = ($this->input->get('start', TRUE) ? $this->input->get('start', TRUE) : 0);
        $limit      = ($this->input->get('limit', TRUE) ? $this->input->get('limit', TRUE) : 20);
     
		$result 	= $this->m_country->getGridCountry($start, $limit);
		$result1	= $this->m_country->countGridCountry();
		$count 		= $result1->num_rows();
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array( 
				'id' 		=> $value->id,
				'code'		=> $value->code,
				'name'		=> $value->name,
				'phonecode'	=> $value->phonecode
			);
		}
        $data['total']   = $count;
        $data['success'] = true;
        echo json_encode($data);
	}

	public function delCountry(){
		$data 	= json_decode($this->input->post('post'));
		foreach ($data as $row) {
	 		$this->m_country->delCountry($row->id);
		 }

		 $this->getCountry(); 
	}

	public function saveCountry(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$code 		= ($this->input->post('code', TRUE) ? $this->input->post('code', TRUE) : '');
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$phonecode 	= ($this->input->post('phonecode', TRUE) ? $this->input->post('phonecode', TRUE) : '');
		$uuid 		= $this->m_country->getUUID();

		if($name == '' || $name == null){
			$success = 3;
		} else if($this->m_country->cekName($name) == 0){
			$this->m_country->saveCountry($code, $name, $phonecode, $uuid);
		 	if($this->m_country->saveConfirm($uuid)==0){
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

	public function editCountry(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$code 		= ($this->input->post('code', TRUE) ? $this->input->post('code', TRUE) : '');
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$phonecode 	= ($this->input->post('phonecode', TRUE) ? $this->input->post('phonecode', TRUE) : '');
		$uuid 		= $this->m_country->getUUID();

		if($id == '' || $id == null){
			$success = 0;
		} else if($this->m_country->cekCountryID($name, $id)==0) {
			$this->m_country->updateCountry($code, $name, $phonecode, $id);
			$success = 1;
		} else {
			$success = 2;
		}
		$data['total']		= $success;
		$data['success'] 	= true;
		echo json_encode($data);
	}

	public function searchCountry(){
	    $name     = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
	    $result = $this->m_country->searchCountry($name);
	    foreach ($result->result() as $key => $value) {
	      $data['data'][] = array(        
	        'id'        	=> $value->id, 
	        'code'      	=> $value->code,       
	        'name'      	=> $value->name,                
	        'phonecode'     => $value->phonecode    
	      );
	    }
        $data['success'] = TRUE;
        echo json_encode($data);
  	}

  	public function viewCountry(){
  		$result = $this->m_country->getViewCountry();
  		foreach ($result->result() as $key => $value) {
  			$data['data'][]= array(
  				'namecountry'	=> $value->name,
  				'id' 			=> $value->id_country
  			);
  		}
  		echo json_encode($data);
  	}
}
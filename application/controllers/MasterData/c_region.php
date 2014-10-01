<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class C_region extends CI_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->library('excel');
		$this->load->model('MasterData/m_region');
	}

	public function getRegion(){
        $start      = ($this->input->get('start', TRUE) ? $this->input->get('start', TRUE) : 0);
        $limit      = ($this->input->get('limit', TRUE) ? $this->input->get('limit', TRUE) : 20);
     
		$result 	= $this->m_region->getGridRegion($start, $limit);
		$result1	= $this->m_region->countGridRegion();
		$count 		= $result1->num_rows();
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array( 
				'id' 			=> $value->id,
				'code'			=> $value->code,
				'name'			=> $value->name,
				'id_province'	=> $value->id_province,
				'nameprovince'	=> $value->nameprovince,
				'codearea'		=> $value->codearea
			);
		}
        $data['total']   = $count;
        $data['success'] = true;
        echo json_encode($data);
	}

	public function delRegion(){
		$data 	= json_decode($this->input->post('post'));
		foreach ($data as $row) {
	 		$this->m_region->delRegion($row->id);
		 }

		 $this->getRegion(); 
	}

	public function saveRegion(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$id_province	= ($this->input->post('id_province', TRUE) ? $this->input->post('id_province', TRUE) : '');
		$code 		= ($this->input->post('code', TRUE) ? $this->input->post('code', TRUE) : '');
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$codearea 	= ($this->input->post('codearea', TRUE) ? $this->input->post('codearea', TRUE) : '');
		$uuid 		= $this->m_region->getUUID();

		if($name == '' || $name == null){
			$success = 3;
		} else if($this->m_region->cekName($name) == 0){
			$this->m_region->saveRegion($id_province, $code, $name, $codearea, $uuid);
		 	if($this->m_region->saveConfirm($uuid)==0){
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

	public function editRegion(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$id_province	= ($this->input->post('id_province', TRUE) ? $this->input->post('id_province', TRUE) : '');
		$code 		= ($this->input->post('code', TRUE) ? $this->input->post('code', TRUE) : '');
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$codearea 	= ($this->input->post('codearea', TRUE) ? $this->input->post('codearea', TRUE) : '');
		$uuid 		= $this->m_region->getUUID();

		if($id == '' || $id == null){
			$success = 0;
		} else if($this->m_region->cekRegionID($name, $id)==0) {
			$this->m_region->updateRegion($id_province, $code, $name, $codearea, $id);
			$success = 1;
		} else {
			$success = 2;
		}
		$data['total']		= $success;
		$data['success'] 	= true;
		echo json_encode($data);
	}

	public function searchRegion(){
	    $name     = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
	    $result = $this->m_region->searchRegion($name);
	    foreach ($result->result() as $key => $value) {
	      $data['data'][] = array(        
	        'id'        	=> $value->id,
	        'id_province'	=> $value->id_province,
	        'nameprovince'	=> $value->nameprovince, 
	        'code'      	=> $value->code,       
	        'name'      	=> $value->name,                
	        'codearea'     => $value->codearea    
	      );
	    }
        $data['success'] = TRUE;
        echo json_encode($data);
  	}
}
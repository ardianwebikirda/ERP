<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class C_province extends CI_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->library('excel');
		$this->load->model('MasterData/m_province');
	}

	public function getProvince(){
        $start      = ($this->input->get('start', TRUE) ? $this->input->get('start', TRUE) : 0);
        $limit      = ($this->input->get('limit', TRUE) ? $this->input->get('limit', TRUE) : 20);
     
		$result 	= $this->m_province->getGridProvince($start, $limit);
		$result1	= $this->m_province->countGridProvince();
		$count 		= $result1->num_rows();
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array( 
				'id' 			=> $value->id,
				'code'			=> $value->code,
				'name'			=> $value->name,
				'id_country'	=> $value->id_country,
				'namecountry'	=> $value->namecountry,
				'codearea'		=> $value->codearea
			);
		}
        $data['total']   = $count;
        $data['success'] = true;
        echo json_encode($data);
	}

	public function delProvince(){
		$data 	= json_decode($this->input->post('post'));
		foreach ($data as $row) {
	 		$this->m_province->delProvince($row->id);
		 }

		 $this->getProvince(); 
	}

	public function saveProvince(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$id_country	= ($this->input->post('id_country', TRUE) ? $this->input->post('id_country', TRUE) : '');
		$code 		= ($this->input->post('code', TRUE) ? $this->input->post('code', TRUE) : '');
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$codearea 	= ($this->input->post('codearea', TRUE) ? $this->input->post('codearea', TRUE) : '');
		$uuid 		= $this->m_province->getUUID();

		if($name == '' || $name == null){
			$success = 3;
		} else if($this->m_province->cekName($name) == 0){
			$this->m_province->saveProvince($id_country, $code, $name, $codearea, $uuid);
		 	if($this->m_province->saveConfirm($uuid)==0){
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

	public function editProvince(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$id_country	= ($this->input->post('id_country', TRUE) ? $this->input->post('id_country', TRUE) : '');
		$code 		= ($this->input->post('code', TRUE) ? $this->input->post('code', TRUE) : '');
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$codearea 	= ($this->input->post('codearea', TRUE) ? $this->input->post('codearea', TRUE) : '');
		$uuid 		= $this->m_province->getUUID();

		if($id == '' || $id == null){
			$success = 0;
		} else if($this->m_province->cekProvinceID($name, $id)==0) {
			$this->m_province->updateProvince($id_country, $code, $name, $codearea, $id);
			$success = 1;
		} else {
			$success = 2;
		}
		$data['total']		= $success;
		$data['success'] 	= true;
		echo json_encode($data);
	}

	public function searchProvince(){
	    $name     = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
	    $result = $this->m_province->searchProvince($name);
	    foreach ($result->result() as $key => $value) {
	      $data['data'][] = array(        
	        'id'        	=> $value->id,
	        'id_country'	=> $value->id_country,
	        'namecountry'	=> $value->namecountry, 
	        'code'      	=> $value->code,       
	        'name'      	=> $value->name,                
	        'codearea'     => $value->codearea    
	      );
	    }
        $data['success'] = TRUE;
        echo json_encode($data);
  	}

  	public function viewProvince(){
  		$result = $this->m_province->getViewProvince();
  		foreach ($result->result() as $key => $value) {
  			$data['data'][]= array(
  				'nameprovince'	=> $value->name,
  				'id' 			=> $value->id_province
  			);
  		}
  		echo json_encode($data);
  	}

  	public function filterProvince(){
	  	$id       = $this->input->post('countryId');
	  	// var_dump($id);
	  	// exit();
	    $result1  = $this->m_province->filterProvince($id);
	    $count    = $result1->num_rows();

	    foreach ($result1->result() as $key => $value) {
	      $data['data'][] = array(        
	        'id'            => $value->id,
	        'id_country'    => $value->id_country,
	        'code'          => $value->code,         
	        'nameprovince'  => $value->name                 
	        );
	    }
	    echo json_encode($data);
	}
}
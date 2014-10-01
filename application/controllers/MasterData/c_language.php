<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class C_language extends CI_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->library('excel');
		$this->load->model('MasterData/m_language');
	}

	public function getLanguage(){
        $start      = ($this->input->get('start', TRUE) ? $this->input->get('start', TRUE) : 0);
        $limit      = ($this->input->get('limit', TRUE) ? $this->input->get('limit', TRUE) : 20);
     
		$result 	= $this->m_language->getGridLanguage($start, $limit);
		$result1	= $this->m_language->countGridLanguage();
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

	public function delLanguage(){
		$data 	= json_decode($this->input->post('post'));
		foreach ($data as $row) {
	 		$this->m_language->delLanguage($row->id);
		 }

		 $this->getLanguage(); 
	}

	public function saveLanguage(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$uuid 		= $this->m_language->getUUID();

		if($name == '' || $name == null){
			$success = 3;
		} else if($this->m_language->cekName($name) == 0){
			$this->m_language->saveLanguage($name, $uuid);
		 	if($this->m_language->saveConfirm($uuid)==0){
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

	public function editLanguage(){
		$id 		= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
		$uuid 		= $this->m_language->getUUID();

		if($id == '' || $id == null){
			$success = 0;
		} else if($this->m_language->cekLanguageID($name, $id)==0) {
			$this->m_language->updateLanguage($name, $id);
			$success = 1;
		} else {
			$success = 2;
		}
		$data['total']		= $success;
		$data['success'] 	= true;
		echo json_encode($data);
	}

	public function searchLanguage(){
	    $name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
	    $result 	= $this->m_language->searchLanguage($name);
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
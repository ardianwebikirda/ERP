<?php if ( ! defined('BASEPATH')) exit('No direct seript access allowed');
class M_jobstatus extends CI_Model{

	private $connectionName;

	public function __construct(){
		parent::__construct();
	}

	public function setConnection($connectionName){
		$this->connectionName = $connectionName;
	}

	public function getConnection(){
		return $this->load->database($this->connectionName, TRUE);
	}

	public function getGridJobStatus($limit, $offset){
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("se.id_jobstatus AS id, se.name AS name", FALSE);
        $db->from('sys_jobstatus se');
        $db->order_by('se.name');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
    }
    public function countGridJobStatus()
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("se.id_jobstatus AS id, se.name AS name", FALSE);
        $db->from('sys_jobstatus se');
        $db->order_by('se.name');
        $query = $db->get();
        return $query;
    }

    public function getViewJobStatus(){
        $this->setConnection('erph');
        $db = $this->getConnection();
        $db->select("name AS name, id_jobstatus AS id_jobstatus", FALSE);
        $db->from('sys_jobstatus');
        $db->like('LOWER(name)',strtolower($this->input->get('query')),'after');
        $db->or_like('LOWER(id_jobstatus)',strtolower($this->input->get('query')),'after');
        $db->order_by('name');
        $query = $db->get();
        // echo $db->last_query();
        return $query;
    }

    public function getUUID(){
    	$this->setConnection('erph');
    	$db = $this->getConnection();
    	return $db->query('SELECT get_uuid() AS uuid;')->row()->uuid;    
    }

    public function cekName($name){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_jobstatus')->where('name',$name)->get()->row()->id;
    }

    public function cekJobStatusID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_jobstatus')->where('name',$name)->where('id_jobstatus !=', $id)->get()->row()->id;
    }

    public function saveConfirm($uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_jobstatus')->where('id_jobstatus', $uuid)->get()->row()->id;
    }

    public function searchJobStatus($name){
    	$this->setConnection('erph');
    	$db = $this->getConnection();
		$db->select("se.id_jobstatus AS id, se.name AS name", FALSE);
        $db->from('sys_jobstatus se');
        $db->like('LOWER(se.name)',strtolower($name));
        $db->order_by('se.name');
        $query = $db->get();
        return $query;
    }

    public function saveJobStatus($name, $uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	$db->set('id_jobstatus', $uuid);
        $db->set('name', $name);
        $db->set('createdby', $this->session->userdata('id'));
        $db->set('created', date('Y-m-d H:i:s'));
        $db->set('updatedby', $this->session->userdata('id'));
        $db->set('updated', date('Y-m-d H:i:s'));
        $db->insert('sys_jobstatus');
    }

    public function updateJobStatus($name, $id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $data = array(
           'name'           => $name,
           'updated'        => date('Y-m-d H:i:s'),
           'updatedby'      => $this->session->userdata('id')
        );
        $db->where('id_jobstatus', $id);
        $db->update('sys_jobstatus', $data);
    }

    public function delJobStatus($id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $db->where('id_jobstatus',$id);
        $db->delete('sys_jobstatus');
    }
}
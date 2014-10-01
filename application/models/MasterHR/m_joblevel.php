<?php if ( ! defined('BASEPATH')) exit('No direct seript access allowed');
class M_joblevel extends CI_Model{

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

	public function getGridJobLevel($limit, $offset){
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("se.id_joblevel AS id, se.name AS name, se.level AS level", FALSE);
        $db->from('sys_joblevel se');
        $db->order_by('se.level');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
    }
    public function countGridJobLevel()
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("se.id_joblevel AS id, se.name AS name, se.level AS level", FALSE);
        $db->from('sys_joblevel se');
        $db->order_by('se.level');
        $query = $db->get();
        return $query;
    }

    public function getViewJobLevel(){
        $this->setConnection('erph');
        $db = $this->getConnection();
        $db->select("name AS name, id_joblevel AS id_joblevel", FALSE);
        $db->from('sys_joblevel');
        $db->like('LOWER(name)',strtolower($this->input->get('query')),'after');
        $db->or_like('LOWER(id_joblevel)',strtolower($this->input->get('query')),'after');
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

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_joblevel')->where('name',$name)->get()->row()->id;
    }

    public function cekJobLevelID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_joblevel')->where('name',$name)->where('id_joblevel !=', $id)->get()->row()->id;
    }

    public function saveConfirm($uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_joblevel')->where('id_joblevel', $uuid)->get()->row()->id;
    }

    public function searchJobLevel($name){
    	$this->setConnection('erph');
    	$db = $this->getConnection();
		$db->select("se.id_joblevel AS id, se.name AS name, se.level AS level", FALSE);
        $db->from('sys_joblevel se');
        $db->like('LOWER(se.name)',strtolower($name));
        $db->order_by('se.level');
        $query = $db->get();
        return $query;
    }

    public function saveJobLevel($name, $level, $uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	$db->set('id_joblevel', $uuid);
        $db->set('name', $name);
        $db->set('level', $level);
        $db->set('createdby', $this->session->userdata('id'));
        $db->set('created', date('Y-m-d H:i:s'));
        $db->set('updatedby', $this->session->userdata('id'));
        $db->set('updated', date('Y-m-d H:i:s'));
        $db->insert('sys_joblevel');
    }

    public function updateJobLevel($name, $level, $id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $data = array(
           'name'           => $name,
           'level'          => $level,
           'updated'        => date('Y-m-d H:i:s'),
           'updatedby'      => $this->session->userdata('id')
        );
        $db->where('id_joblevel', $id);
        $db->update('sys_joblevel', $data);
    }

    public function delJobLevel($id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $db->where('id_joblevel',$id);
        $db->delete('sys_joblevel');
    }
}
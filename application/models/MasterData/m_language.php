<?php if ( ! defined('BASEPATH')) exit('No direct seript access allowed');
class M_language extends CI_Model{

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

	public function getGridLanguage($limit, $offset){
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("se.id_language AS id, se.name AS name", FALSE);
        $db->from('sys_language se');
        $db->order_by('se.name');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
    }
    public function countGridLanguage()
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("se.id_language AS id, se.name AS name", FALSE);
        $db->from('sys_language se');
        $db->order_by('se.name');
        $query = $db->get();
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

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_language')->where('name',$name)->get()->row()->id;
    }

    public function cekLanguageID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_language')->where('name',$name)->where('id_language !=', $id)->get()->row()->id;
    }

    public function saveConfirm($uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_language')->where('id_language', $uuid)->get()->row()->id;
    }

    public function searchLanguage($name){
    	$this->setConnection('erph');
    	$db = $this->getConnection();
		$db->select("se.id_language AS id, se.name AS name", FALSE);
        $db->from('sys_language se');
        $db->like('LOWER(se.name)',strtolower($name));
        $db->order_by('se.name');
        $query = $db->get();
        return $query;
    }

    public function saveLanguage($name, $uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	$db->set('id_language', $uuid);
        $db->set('name', $name);
        $db->set('createdby', $this->session->userdata('id'));
        $db->set('created', date('Y-m-d H:i:s'));
        $db->set('updatedby', $this->session->userdata('id'));
        $db->set('updated', date('Y-m-d H:i:s'));
        $db->insert('sys_language');
    }

    public function updateLanguage($name, $id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $data = array(
           'name'           => $name,
           'updated'        => date('Y-m-d H:i:s'),
           'updatedby'      => $this->session->userdata('id')
        );
        $db->where('id_language', $id);
        $db->update('sys_language', $data);
    }

    public function delLanguage($id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $db->where('id_language',$id);
        $db->delete('sys_language');
    }
}
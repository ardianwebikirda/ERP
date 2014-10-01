<?php if ( ! defined('BASEPATH')) exit('No direct seript access allowed');
class M_education extends CI_Model{

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

	public function getGridEducation($limit, $offset){
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("se.id_education AS id, se.name AS name, se.level AS level", FALSE);
        $db->from('sys_education se');
        $db->order_by('se.level');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
    }
    public function countGridEducation()
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("se.id_education AS id, se.name AS name, se.level AS level", FALSE);
        $db->from('sys_education se');
        $db->order_by('se.level');
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

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_education')->where('name',$name)->get()->row()->id;
    }

    public function cekEducationID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_education')->where('name',$name)->where('id_education !=', $id)->get()->row()->id;
    }

    public function saveConfirm($uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_education')->where('id_education', $uuid)->get()->row()->id;
    }

    public function searchEducation($name){
    	$this->setConnection('erph');
    	$db = $this->getConnection();
		$db->select("se.id_education AS id, se.name AS name, se.level AS level", FALSE);
        $db->from('sys_education se');
        $db->like('LOWER(se.name)',strtolower($name));
        $db->order_by('se.level');
        $query = $db->get();
        return $query;
    }

    public function saveEducation($name, $level, $uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	$db->set('id_education', $uuid);
        $db->set('name', $name);
        $db->set('level', $level);
        $db->set('createdby', $this->session->userdata('id'));
        $db->set('created', date('Y-m-d H:i:s'));
        $db->set('updatedby', $this->session->userdata('id'));
        $db->set('updated', date('Y-m-d H:i:s'));
        $db->insert('sys_education');
    }

    public function updateEducation($name, $level, $id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $data = array(
           'name'           => $name,
           'level'          => $level,
           'updated'        => date('Y-m-d H:i:s'),
           'updatedby'      => $this->session->userdata('id')
        );
        $db->where('id_education', $id);
        $db->update('sys_education', $data);
    }

    public function delEducation($id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $db->where('id_education',$id);
        $db->delete('sys_education');
    }
}
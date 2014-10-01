<?php if ( ! defined('BASEPATH')) exit('No direct seript access allowed');
class M_bank extends CI_Model{

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

	public function getGridBank($limit, $offset){
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("se.id_bank AS id, se.name AS name", FALSE);
        $db->from('sys_bank se');
        $db->order_by('se.name');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
    }
    public function countGridBank()
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("se.id_bank AS id, se.name AS name", FALSE);
        $db->from('sys_bank se');
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

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_bank')->where('name',$name)->get()->row()->id;
    }

    public function cekBankID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_bank')->where('name',$name)->where('id_bank !=', $id)->get()->row()->id;
    }

    public function saveConfirm($uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_bank')->where('id_bank', $uuid)->get()->row()->id;
    }

    public function searchBank($name){
    	$this->setConnection('erph');
    	$db = $this->getConnection();
		$db->select("se.id_bank AS id, se.name AS name", FALSE);
        $db->from('sys_bank se');
        $db->like('LOWER(se.name)',strtolower($name));
        $db->order_by('se.name');
        $query = $db->get();
        return $query;
    }

    public function saveBank($name, $uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	$db->set('id_bank', $uuid);
        $db->set('name', $name);
        $db->set('createdby', $this->session->userdata('id'));
        $db->set('created', date('Y-m-d H:i:s'));
        $db->set('updatedby', $this->session->userdata('id'));
        $db->set('updated', date('Y-m-d H:i:s'));
        $db->insert('sys_bank');
    }

    public function updateBank($name, $id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $data = array(
           'name'           => $name,
           'updated'        => date('Y-m-d H:i:s'),
           'updatedby'      => $this->session->userdata('id')
        );
        $db->where('id_bank', $id);
        $db->update('sys_bank', $data);
    }

    public function delBank($id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $db->where('id_bank',$id);
        $db->delete('sys_bank');
    }
}
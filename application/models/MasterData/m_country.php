<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class M_country extends CI_Model{

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

	public function getGridCountry($limit, $offset){
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("sc.id_country AS id, sc.code AS code, sc.name AS name, sc.phonecode AS phonecode", FALSE);
        $db->from('sys_country sc');
        $db->order_by('sc.name');
        $db->limit($offset, $limit);
        $query = $db->get();
       	// echo $db->last_query();
        return $query;
    }
    public function countGridCountry()
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
 		$db->select("sc.id_country AS id, sc.code AS code, sc.name AS name, sc.phonecode AS phonecode", FALSE);
        $db->order_by('sc.name');
        $db->from('sys_country sc');
        $query = $db->get();
        return $query;
    }

    public function getViewCountry(){
        $this->setConnection('erph');
        $db = $this->getConnection();
        $db->select("name AS name, id_country AS id_country", FALSE);
        $db->from('sys_country');
        $db->like('LOWER(name)',strtolower($this->input->get('query')),'after');
        $db->or_like('LOWER(id_country)',strtolower($this->input->get('query')),'after');
        $db->order_by('name');
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

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_country')->where('name',$name)->get()->row()->id;
    }

    public function cekCountryID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_country')->where('name',$name)->where('id_country !=', $id)->get()->row()->id;
    }

    public function saveConfirm($uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_country')->where('id_country', $uuid)->get()->row()->id;
    }

    public function searchCountry($name){
    	$this->setConnection('erph');
    	$db = $this->getConnection();
		$db->select("sc.id_country AS id, sc.code AS code, sc.name AS name, sc.phonecode AS phonecode", FALSE);
        $db->from('sys_country sc');
        $db->like('LOWER(sc.name)',strtolower($name));
        $db->or_like('LOWER(sc.code)', strtolower($name));
        $db->order_by('sc.name');
        $query = $db->get();
        return $query;
    }

    public function saveCountry($code, $name, $phonecode, $uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	$db->set('id_country', $uuid);
        $db->set('name', $name);
        $db->set('code', $code);
        $db->set('phonecode', $phonecode);
        $db->set('createdby', $this->session->userdata('id'));
        $db->set('created', date('Y-m-d H:i:s'));
        $db->set('updatedby', $this->session->userdata('id'));
        $db->set('updated', date('Y-m-d H:i:s'));
        $db->insert('sys_country');
    }

    public function updateCountry($code, $name, $phonecode, $id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $data = array(
           'code'        => $code,
           'name'        => $name,
           'phonecode'   => $phonecode,
           'updated'     => date('Y-m-d H:i:s'),
           'updatedby'   => $this->session->userdata('id')
        );
        $db->where('id_country', $id);
        $db->update('sys_country', $data);
    }

    public function delCountry($id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $db->where('id_country',$id);
        $db->delete('sys_country');
    }
}
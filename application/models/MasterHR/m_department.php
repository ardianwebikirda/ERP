<?php if ( ! defined('BASEPATH')) exit('No direct seript access allowed');
class M_department extends CI_Model{

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

	public function getGridDepartment($limit, $offset){
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("se.id_department AS id, se.name AS name, se.code AS code", FALSE);
        $db->from('sys_department se');
        $db->order_by('se.code');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
    }
    public function countGridDepartment()
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("se.id_department AS id, se.name AS name, se.code AS code", FALSE);
        $db->from('sys_department se');
        $db->order_by('se.code');
        $query = $db->get();
        return $query;
    }

    public function getViewDepartment(){
        $this->setConnection('erph');
        $db = $this->getConnection();
        $db->select("name AS name, id_department AS id_department", FALSE);
        $db->from('sys_department');
        $db->like('LOWER(name)',strtolower($this->input->get('query')),'after');
        $db->or_like('LOWER(id_department)',strtolower($this->input->get('query')),'after');
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

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_department')->where('name',$name)->get()->row()->id;
    }

    public function cekDepartmentID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_department')->where('name',$name)->where('id_department !=', $id)->get()->row()->id;
    }

    public function saveConfirm($uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_department')->where('id_department', $uuid)->get()->row()->id;
    }

    public function searchDepartment($name){
    	$this->setConnection('erph');
    	$db = $this->getConnection();
		$db->select("se.id_department AS id, se.name AS name, se.code AS code", FALSE);
        $db->from('sys_department se');
        $db->like('LOWER(se.name)',strtolower($name));
        $db->order_by('se.code');
        $query = $db->get();
        return $query;
    }

    public function saveDepartment($name, $code, $uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	$db->set('id_department', $uuid);
        $db->set('name', $name);
        $db->set('code', $code);
        $db->set('createdby', $this->session->userdata('id'));
        $db->set('created', date('Y-m-d H:i:s'));
        $db->set('updatedby', $this->session->userdata('id'));
        $db->set('updated', date('Y-m-d H:i:s'));
        $db->insert('sys_department');
    }

    public function updateDepartment($name, $code, $id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $data = array(
           'name'           => $name,
           'code'          => $code,
           'updated'        => date('Y-m-d H:i:s'),
           'updatedby'      => $this->session->userdata('id')
        );
        $db->where('id_department', $id);
        $db->update('sys_department', $data);
    }

    public function delDepartment($id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $db->where('id_department',$id);
        $db->delete('sys_department');
    }
}
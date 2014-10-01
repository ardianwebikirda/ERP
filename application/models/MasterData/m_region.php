<?php if ( ! defined('BASEPATH')) exit('No direct spript access allowed');
class M_region extends CI_Model{

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

	public function getGridRegion($limit, $offset){
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("sp.id_region AS id, sp.id_province AS id_province, sc.name AS nameprovince, sp.code AS code, sp.name AS name, sp.codearea AS codearea", FALSE);
        $db->from('sys_region sp');
        $db->join('sys_province sc','sc.id_province = sp.id_province','left');
        $db->order_by('sp.name');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
    }
    public function countGridRegion()
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
 		$db->select("sp.id_region AS id, sp.id_province AS id_province, sc.name AS nameprovince, sp.code AS code, sp.name AS name, sp.codearea AS codearea", FALSE);
        $db->from('sys_region sp');
        $db->join('sys_province sc','sc.id_province = sp.id_province','left');
        $db->order_by('sp.name');
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

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_region')->where('name',$name)->get()->row()->id;
    }

    public function cekRegionID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_region')->where('name',$name)->where('id_region !=', $id)->get()->row()->id;
    }

    public function saveConfirm($uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_region')->where('id_region', $uuid)->get()->row()->id;
    }

    public function searchRegion($name){
    	$this->setConnection('erph');
    	$db = $this->getConnection();
		$db->select("sp.id_region AS id, sp.id_province AS id_province, sc.name AS nameprovince, sp.code AS code, sp.name AS name, sp.codearea AS codearea", FALSE);
        $db->from('sys_region sp');
        $db->join('sys_province sc','sc.id_province = sp.id_province','left');
        $db->like('LOWER(sp.name)',strtolower($name));
        $db->or_like('LOWER(sp.code)', strtolower($name));
        $db->order_by('sp.name');
        $query = $db->get();
        return $query;
    }

    public function saveRegion($id_province, $code, $name, $codearea, $uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	$db->set('id_region', $uuid);
        $db->set('id_province', $id_province);
        $db->set('name', $name);
        $db->set('code', $code);
        $db->set('codearea', $codearea);
        $db->set('createdby', $this->session->userdata('id'));
        $db->set('created', date('Y-m-d H:i:s'));
        $db->set('updatedby', $this->session->userdata('id'));
        $db->set('updated', date('Y-m-d H:i:s'));
        $db->insert('sys_region');
    }

    public function updateRegion($id_province, $code, $name, $codearea, $id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $data = array(
           'code'           => $code,
           'id_province'     => $id_province,
           'name'           => $name,
           'codearea'       => $codearea,
           'updated'        => date('Y-m-d H:i:s'),
           'updatedby'      => $this->session->userdata('id')
        );
        $db->where('id_region', $id);
        $db->update('sys_region', $data);
    }

    public function delRegion($id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $db->where('id_region',$id);
        $db->delete('sys_region');
    }
}
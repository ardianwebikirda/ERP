<?php if ( ! defined('BASEPATH')) exit('No direct spript access allowed');
class M_province extends CI_Model{

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

	public function getGridProvince($limit, $offset){
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("sp.id_province AS id, sp.id_country AS id_country, sc.name AS namecountry, sp.code AS code, sp.name AS name, sp.codearea AS codearea", FALSE);
        $db->from('sys_province sp');
        $db->join('sys_country sc','sc.id_country = sp.id_country','left');
        $db->order_by('sp.name');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
    }
    public function countGridProvince()
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
 		$db->select("sp.id_province AS id, sp.id_country AS id_country, sc.name AS namecountry, sp.code AS code, sp.name AS name, sp.codearea AS codearea", FALSE);
        $db->from('sys_province sp');
        $db->join('sys_country sc','sc.id_country = sp.id_country','left');
        $db->order_by('sp.name');
        $query = $db->get();
        return $query;
    }

    public function getViewProvince(){
        $this->setConnection('erph');
        $db = $this->getConnection();
        $db->select("name AS name, id_province AS id_province", FALSE);
        $db->from('sys_province');
        $db->like('LOWER(name)',strtolower($this->input->get('query')),'after');
        $db->or_like('LOWER(id_province)',strtolower($this->input->get('query')),'after');
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

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_province')->where('name',$name)->get()->row()->id;
    }

    public function cekProvinceID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_province')->where('name',$name)->where('id_province !=', $id)->get()->row()->id;
    }

    public function saveConfirm($uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_province')->where('id_province', $uuid)->get()->row()->id;
    }

    public function searchProvince($name){
    	$this->setConnection('erph');
    	$db = $this->getConnection();
		$db->select("sp.id_province AS id, sp.id_country AS id_country, sc.name AS namecountry, sp.code AS code, sp.name AS name, sp.codearea AS codearea", FALSE);
        $db->from('sys_province sp');
        $db->join('sys_country sc','sc.id_country = sp.id_country','left');
        $db->like('LOWER(sp.name)',strtolower($name));
        $db->or_like('LOWER(sp.code)', strtolower($name));
        $db->order_by('sp.name');
        $query = $db->get();
        return $query;
    }

    public function saveProvince($id_country, $code, $name, $codearea, $uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	$db->set('id_province', $uuid);
        $db->set('id_country', $id_country);
        $db->set('name', $name);
        $db->set('code', $code);
        $db->set('codearea', $codearea);
        $db->set('createdby', $this->session->userdata('id'));
        $db->set('created', date('Y-m-d H:i:s'));
        $db->set('updatedby', $this->session->userdata('id'));
        $db->set('updated', date('Y-m-d H:i:s'));
        $db->insert('sys_province');
    }

    public function updateProvince($id_country, $code, $name, $codearea, $id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $data = array(
           'code'           => $code,
           'id_country'     => $id_country,
           'name'           => $name,
           'codearea'       => $codearea,
           'updated'        => date('Y-m-d H:i:s'),
           'updatedby'      => $this->session->userdata('id')
        );
        $db->where('id_province', $id);
        $db->update('sys_province', $data);
    }

    public function delProvince($id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $db->where('id_province',$id);
        $db->delete('sys_province');
    }
}
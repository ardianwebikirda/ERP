<?php if ( ! defined('BASEPATH')) exit('No direct spript access allowed');
class M_jobtitle extends CI_Model{

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

	public function getGridJobTitle($limit, $offset){
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("sp.id_jobtitle AS id, sp.id_joblevel AS id_joblevel, sc.name AS namejoblevel, sp.name AS name", FALSE);
        $db->from('sys_jobtitle sp');
        $db->join('sys_joblevel sc','sc.id_joblevel = sp.id_joblevel','left');
        $db->order_by('sp.name');
        $db->limit($offset, $limit);
        $query = $db->get();
        // echo $db->last_query();
        // exit();
        return $query;
    }
    public function countGridJobTitle()
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
 		$db->select("sp.id_jobtitle AS id, sp.id_joblevel AS id_joblevel, sc.name AS namejoblevel, sp.name AS name", FALSE);
        $db->from('sys_jobtitle sp');
        $db->join('sys_joblevel sc','sc.id_joblevel = sp.id_joblevel','left');
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

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_jobtitle')->where('name',$name)->get()->row()->id;
    }

    public function cekJobTitleID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_jobtitle')->where('name',$name)->where('id_jobtitle !=', $id)->get()->row()->id;
    }

    public function saveConfirm($uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_jobtitle')->where('id_jobtitle', $uuid)->get()->row()->id;
    }

    public function searchJobTitle($name){
    	$this->setConnection('erph');
    	$db = $this->getConnection();
		$db->select("sp.id_jobtitle AS id, sp.id_joblevel AS id_joblevel, sc.name AS namejoblevel, sp.code AS code, sp.name AS name, sp.codearea AS codearea", FALSE);
        $db->from('sys_jobtitle sp');
        $db->join('sys_joblevel sc','sc.id_joblevel = sp.id_joblevel','left');
        $db->like('LOWER(sp.name)',strtolower($name));
        $db->or_like('LOWER(sp.code)', strtolower($name));
        $db->order_by('sp.name');
        $query = $db->get();
        return $query;
    }

    public function saveJobTitle($id_joblevel, $name, $uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	$db->set('id_jobtitle', $uuid);
        $db->set('id_joblevel', $id_joblevel);
        $db->set('name', $name);
        $db->set('createdby', $this->session->userdata('id'));
        $db->set('created', date('Y-m-d H:i:s'));
        $db->set('updatedby', $this->session->userdata('id'));
        $db->set('updated', date('Y-m-d H:i:s'));
        $db->insert('sys_jobtitle');
    }

    public function updateJobTitle($id_joblevel,$name, $id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $data = array(
           'id_joblevel'     => $id_joblevel,
           'name'           => $name,
           'updated'        => date('Y-m-d H:i:s'),
           'updatedby'      => $this->session->userdata('id')
        );
        $db->where('id_jobtitle', $id);
        $db->update('sys_jobtitle', $data);
    }

    public function delJobTitle($id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $db->where('id_jobtitle',$id);
        $db->delete('sys_jobtitle');
    }
}
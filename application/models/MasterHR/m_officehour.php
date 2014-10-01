<?php if ( ! defined('BASEPATH')) exit('No direct seript access allowed');
class M_officehour extends CI_Model{

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

	public function getGridOfficeHour($limit, $offset){
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("se.id_officehour AS id, se.name AS name, se.time_in AS time_in, se.time_out AS time_out", FALSE);
        $db->from('sys_officehour se');
        $db->order_by('se.name');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
    }
    public function countGridOfficeHour()
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("se.id_officehour AS id, se.name AS name, se.time_in AS time_in, se.time_out AS time_out", FALSE);
        $db->from('sys_officehour se');
        $db->order_by('se.name');
        $query = $db->get();
        return $query;
    }

    public function getViewOfficeHour(){
        $this->setConnection('erph');
        $db = $this->getConnection();
        $db->select("name AS name, id_officehour AS id_officehour", FALSE);
        $db->from('sys_officehour');
        $db->like('LOWER(name)',strtolower($this->input->get('query')),'after');
        $db->or_like('LOWER(id_officehour)',strtolower($this->input->get('query')),'after');
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

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_officehour')->where('name',$name)->get()->row()->id;
    }

    public function cekOfficeHourID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_officehour')->where('name',$name)->where('id_officehour !=', $id)->get()->row()->id;
    }

    public function saveConfirm($uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	return $db->select('COUNT(*) AS id', FALSE)->from('sys_officehour')->where('id_officehour', $uuid)->get()->row()->id;
    }

    public function searchOfficeHour($name){
    	$this->setConnection('erph');
    	$db = $this->getConnection();
		$db->select("se.id_officehour AS id, se.name AS name, se.time_in AS time_in, se.time_out AS time_out", FALSE);
        $db->from('sys_officehour se');
        $db->like('LOWER(se.name)',strtolower($name));
        $db->order_by('se.name');
        $query = $db->get();
        return $query;
    }

    public function saveOfficeHour($name, $time_in, $time_out, $uuid){
    	$this->setConnection('erph');
    	$db = $this->getConnection();

    	$db->set('id_officehour', $uuid);
        $db->set('name', $name);
        $db->set('time_in', $time_in);
        $db->set('time_out', $time_out);
        $db->set('createdby', $this->session->userdata('id'));
        $db->set('created', date('Y-m-d H:i:s'));
        $db->set('updatedby', $this->session->userdata('id'));
        $db->set('updated', date('Y-m-d H:i:s'));
        $db->insert('sys_officehour');
    }

    public function updateOfficeHour($name, $time_in, $time_out, $id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $data = array(
           'name'           => $name,
           'time_in'        => $time_in,
           'time_out'       => $time_out,
           'updated'        => date('Y-m-d H:i:s'),
           'updatedby'      => $this->session->userdata('id')
        );
        $db->where('id_officehour', $id);
        $db->update('sys_officehour', $data);
    }

    public function delOfficeHour($id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $db->where('id_officehour',$id);
        $db->delete('sys_officehour');
    }
}
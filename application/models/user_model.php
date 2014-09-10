<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class User_model extends CI_Model
{
	private $connectionName;
	public function __construct(){
	        parent::__construct();
	}
	public function setConnection($connectionName){
	  $this->connectionName = $connectionName;
	}
	public function getConnection(){
	  return $this->load->database($this->connectionName,TRUE);
	}

	function validasi_user($username, $password)
	{
        $this->setConnection('erph');
        $db   = $this->getConnection();

		$db->select('ad_user_id, username, password');
		$db->from('ad_user');
		$db->where('username',$username);
		$db->where('password',base64_encode(sha1($password,TRUE)));
		$db->where('isactive','Y');
		$db->limit(1);
		$query = $db->get();
		if($query->num_rows() == 1)
		{
			return $query->result();
		}
		else
		{
			return FALSE;
		}
	}

	function user_rules($id)
	{
        $this->setConnection('erph');
        $db   = $this->getConnection();

		$db->select('gm.ad_menu_id AS id');
		$db->from('ad_role_menu AS gm');
		$db->join('ad_role r', 'r.ad_role_id=gm.ad_role_id');
		$db->join('ad_user u', 'r.ad_role_id=u.ad_role_id');
		$db->where('u.ad_user_id',$id);
		$query = $db->get();
		return $query;
	}

	public function cekrulesparent($rules){
        $this->setConnection('erph');
        $db   = $this->getConnection();

		$db->select('ad_menu_id AS id, name AS name, icon AS icon, leaf AS leaf, selector AS selector, cls AS cls');
		$db->from('ad_menu');
		$db->where_in('ad_menu_id',$rules);
		$db->where('parent',0);
		$db->where('isactive','Y');
		$db->order_by('ad_menu_id');
		$query = $db->get(); 		
		return $query;
	}

	public function cekruleschild($id, $rules){
        $this->setConnection('erph');
        $db   = $this->getConnection();

		$db->select('ad_menu_id AS id, name AS name, icon AS icon, leaf AS leaf, selector AS selector, cls AS cls');
		$db->from('ad_menu');
		$db->where_in('parent',$id);
		$db->where('parent !=',0);
		$db->where('isactive','Y');
		$db->where_in('ad_menu_id',$rules);
		$db->order_by('ad_menu_id');
		$query = $db->get();     		    
		return $query;
	}

	function validasi_rule($node)
	{
	  	$menus = $this->user_rules($this->session->userdata('id'));
	    foreach($menus->result() as $val){
	        $data[]       = $val->id;
	    }
	  	// var_dump($data);
	  	// exit();
	  	if ($node) {
	    	$result = $this->cekruleschild($node, $data);
	  	} else {
	    	$result = $this->cekrulesparent($data);
	  	}

	    foreach ($result->result() as $key => $value) {
	      $rules[] = array(
	        'id' 		=> $value->id,        
	        'text' 		=> $value->name,
	        'iconCls' 	=> $value->icon,
	        'leaf' 		=> ($value->leaf === 't') ? true : false,
	        'selector' 	=> $value->selector,
	        'cls' 		=> $value->cls
	        );
	    }
	  	return $rules;
	}
    public function iscreatePrevilege(){ 
        $this->setConnection('erph');
        $db   = $this->getConnection();

        $db->select(" REPLACE(m.name, ' ', '') AS menu, CASE WHEN rm.iscreate = 'Y' THEN 'false' ELSE 'true' END AS iscreate", FALSE);
        $db->from('ad_role_menu rm');
        $db->join('ad_role r','r.ad_role_id=rm.ad_role_id');
        $db->join('ad_user u','r.ad_role_id=u.ad_role_id');
        $db->join('ad_menu m','rm.ad_menu_id=m.ad_menu_id');
        $db->where('u.ad_user_id',$this->session->userdata('id'));
        $query = $db->get();        
        return $query;
    }
    public function isupdatePrevilege(){   
        $this->setConnection('erph');
        $db   = $this->getConnection();

        $db->select(" REPLACE(m.name, ' ', '') AS menu, CASE WHEN rm.isupdate = 'Y' THEN 'false' ELSE 'true' END AS isupdate", FALSE);
        $db->from('ad_role_menu rm');
        $db->join('ad_role r','r.ad_role_id=rm.ad_role_id');
        $db->join('ad_user u','r.ad_role_id=u.ad_role_id');
        $db->join('ad_menu m','rm.ad_menu_id=m.ad_menu_id');
        $db->where('u.ad_user_id',$this->session->userdata('id'));
        $query = $db->get();         
        return $query;
    }
    public function isdeletePrevilege(){              
        $this->setConnection('erph');
        $db   = $this->getConnection();
       
        $db->select(" REPLACE(m.name, ' ', '') AS menu, CASE WHEN rm.isdelete = 'Y' THEN 'false' ELSE 'true' END AS isdelete", FALSE);
        $db->from('ad_role_menu rm');
        $db->join('ad_role r','r.ad_role_id=rm.ad_role_id');
        $db->join('ad_user u','r.ad_role_id=u.ad_role_id');
        $db->join('ad_menu m','rm.ad_menu_id=m.ad_menu_id');
        $db->where('u.ad_user_id',$this->session->userdata('id'));
        $query = $db->get();          
        return $query;
    }
    public function isprocessPrevilege(){              
        $this->setConnection('erph');
        $db   = $this->getConnection();

        $db->select(" REPLACE(m.name, ' ', '') AS menu, CASE WHEN rm.isprocess = 'Y' THEN 'false' ELSE 'true' END AS isprocess", FALSE);
        $db->from('ad_role_menu rm');
        $db->join('ad_role r','r.ad_role_id=rm.ad_role_id');
        $db->join('ad_user u','r.ad_role_id=u.ad_role_id');
        $db->join('ad_menu m','rm.ad_menu_id=m.ad_menu_id');
        $db->where('u.ad_user_id',$this->session->userdata('id'));
        // $this->db->where('m.name','Users');
        $query = $db->get();
        return $query;
    }
}
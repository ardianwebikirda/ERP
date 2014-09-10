<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class M_users extends CI_Model
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

    public function getGridUsers($limit, $offset)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();

        $db->select("u.ad_user_id AS id, u.username AS username, u.name AS name, u.firstname AS firstname, r.name AS role, r.ad_role_id AS id_role, o.name AS org, o.value AS value,
            u.lastname AS lastname, u.description AS description, u.email AS email, u.phone AS phone, u.phone2 AS mobile, u.isactive AS isactive,
            CASE WHEN u.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $db->from('ad_user u');
        $db->join('ad_role r','r.ad_role_id=u.ad_role_id','left');
        $db->join('ad_organisasi o','o.ad_organisasi_id=u.ad_organisasi_id','left');
        $db->order_by('u.name');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
    }
    public function countGridUsers()
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();

        $db->select("u.ad_user_id AS id, u.username AS username, u.name AS name, u.firstname AS firstname, r.name AS role, r.ad_role_id AS id_role, o.name AS org, o.value AS value,
            u.lastname AS lastname, u.description AS description, u.email AS email, u.phone AS phone, u.phone2 AS mobile, u.isactive AS isactive,
            CASE WHEN u.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $db->from('ad_user u');
        $db->join('ad_role r','r.ad_role_id=u.ad_role_id','left');
        $db->join('ad_organisasi o','o.ad_organisasi_id=u.ad_organisasi_id','left');
        $db->order_by('u.name');
        $query = $db->get();
        // echo $this->db->last_query();
        // exit();   
        return $query;
    }
    public function viewFormUsers($id)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();

        $db->select("u.ad_user_organisasi_id AS id_org, r.ad_user_id AS id_users, o.name AS name", FALSE);
        $db->from('ad_user_organisasi u');
        $db->join('ad_user r','r.ad_user_id=u.ad_user_id','left');
        $db->join('ad_organisasi o','o.ad_organisasi_id=u.ad_organisasi_id','left');
        $db->where('r.ad_user_id',$id);
        $db->order_by('o.name');
        $query = $db->get();
        return $query;
    }

    public function deleteUsers($id)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->where('ad_user_id',$id);
        $db->delete('ad_user');
    }
    public function deleteUserOrg($id_org)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->where('ad_user_organisasi_id',$id_org);
        $db->delete('ad_user_organisasi');
    }
    public function saveUsers($name, $firstname, $lastname, $username, $password, $email, $phone, $mobile, $isactive, $description, $role, $uuid, $Organisasi)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->set('ad_user_id', $uuid);
        $db->set('name', $name);
        $db->set('firstname', $firstname);
        $db->set('lastname', $lastname);
        $db->set('ad_role_id', $role);
        $db->set('username', $username);
        $db->set('password', $password);
        $db->set('email', $email);
        $db->set('phone', $phone);
        $db->set('phone2', $mobile);
        $db->set('isactive', $isactive);
        $db->set('description', $description);
        $db->set('ad_organisasi_id', $Organisasi);
        $db->set('createdby', $this->session->userdata('id'));
        $db->set('created', date('Y-m-d H:i:s'));
        $db->set('updatedby', $this->session->userdata('id'));
        $db->set('updated', date('Y-m-d H:i:s'));
        $db->insert('ad_user');
    }
    public function getUUID(){   
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->query('SELECT get_uuid() AS uuid;')->row()->uuid;
    }
    public function saveConfirm($uuid){  
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('ad_user')->where('ad_user_id',$uuid)->get()->row()->id;
    }
    public function saveConfirmUserOrg($uuid){  
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('ad_user_organisasi')->where('ad_user_organisasi_id',$uuid)->get()->row()->id;
    }
    public function cekUser($username){     
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('ad_user')->where('username',$username)->get()->row()->id;
    } 

    public function cekInUsersorg($id)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('ad_user_organisasi')->where('ad_user_id',$id)->get()->row()->id;
    } 

    public function cekOrganisasi($org){   
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('ad_organisasi_id AS id', FALSE)->from('ad_organisasi')->where('value',$org)->get()->row()->id;
    } 
    public function cekUserOrganisasi($org, $id){   
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('ad_user_organisasi')->where('ad_organisasi_id',$org)->where('ad_user_id',$id)->get()->row()->id;
    } 
    public function cekUserID($username, $id){ 
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('ad_user')->where('username',$username)->where('ad_user_id !=',$id)->get()->row()->id;
    } 
    public function cekPswd(){   
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('password AS id', FALSE)->from('ad_user')->where('ad_user_id',$this->session->userdata('id'))->get()->row()->id;
    }
    public function updateUsers($name, $firstname, $lastname, $username, $email, $phone, $mobile, $isactive, $description, $role, $Organisasi, $id){
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $data = array(
                       'name'               => $name,
                       'ad_organisasi_id'   => $Organisasi,
                       'firstname'          => $firstname,
                       'lastname'           => $lastname,
                       'username'           => $username,
                       'ad_role_id'         => $role,
                       'email'              => $email,
                       'phone'              => $phone,
                       'phone2'             => $mobile,
                       'isactive'           => $isactive,
                       'description'        => $description,
                       'updated'            => date('Y-m-d H:i:s'),
                       'updatedby'          => $this->session->userdata('id')
                    );
        $db->where('ad_user_id',$id);
        $db->update('ad_user', $data);              
    }
    public function updatePswd($newpswd1){
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $data = array(
                       'password'       => $newpswd1,
                       'updated'        => date('Y-m-d H:i:s'),
                       'updatedby'      => $this->session->userdata('id')
                    );
        $db->where('ad_user_id',$this->session->userdata('id'));
        $db->update('ad_user', $data);              
    } 
    public function cekUsersOrg($id)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('ad_user_organisasi')->where('ad_user_id',$id)->get()->row()->id;
    }
    public function searchGridUsers($username)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("u.ad_user_id AS id, u.username AS username, u.name AS name, u.firstname AS firstname, r.name AS role, r.ad_role_id AS id_role, o.name AS org, o.value AS value,
            u.lastname AS lastname, u.description AS description, u.email AS email, u.phone AS phone, u.phone2 AS mobile, u.isactive AS isactive,
            CASE WHEN u.isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $db->from('ad_user u');
        $db->join('ad_role r','r.ad_role_id=u.ad_role_id','left');
        $db->join('ad_organisasi o','o.ad_organisasi_id=u.ad_organisasi_id','left');
        $db->like('LOWER(u.username)', strtolower($username));
        $db->or_like('LOWER(u.name)', strtolower($username));
        $db->or_like('LOWER(u.firstname)', strtolower($username));
        $db->or_like('LOWER(u.lastname)', strtolower($username));
        $db->or_like('LOWER(u.phone)', strtolower($username));
        $db->or_like('LOWER(u.phone2)', strtolower($username));
        $db->or_like('LOWER(u.description)', strtolower($username));
        $db->or_like('LOWER(u.email)', strtolower($username));
        $db->order_by('u.name');
        $query = $db->get();
        return $query;
    }
    public function printUsers()
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("u.ad_user_id AS id, u.username AS username, u.name AS name, u.firstname AS firstname, r.name AS role, o.name AS org,
            u.lastname AS lastname, u.description AS description, u.email AS email, u.phone AS phone, u.phone2 AS mobile,
            u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
            u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
        $db->from('ad_user AS u');
        $db->join('ad_user AS u1', 'u.createdby=u1.ad_user_id');
        $db->join('ad_user AS u2', 'u.updatedby=u2.ad_user_id');
        $db->join('ad_role r','r.ad_role_id=u.ad_role_id');
        $db->join('ad_organisasi o','u.ad_organisasi_id=o.ad_organisasi_id','left');
        $db->order_by('name');
        $query = $db->get();
        return $query;
    }
    public function saveUsersOrg($id_users, $Organisasi, $uuid)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->set('ad_user_organisasi_id', $uuid);
        $db->set('ad_user_id', $id_users);
        $db->set('isactive', 'Y');
        $db->set('ad_organisasi_id', $Organisasi);
        $db->set('createdby', $this->session->userdata('id'));
        $db->set('created', date('Y-m-d H:i:s'));
        $db->set('updatedby', $this->session->userdata('id'));
        $db->set('updated', date('Y-m-d H:i:s'));
        $db->insert('ad_user_organisasi');
    }
}
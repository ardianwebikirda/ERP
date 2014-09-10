<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class M_organisasi extends CI_Model
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

    public function getGridOrganisasi($limit, $offset)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("ad_organisasi_id AS id, CAST(value as varchar(10)) AS value, name AS name, parent AS parent, description AS description, CASE WHEN isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $db->from('ad_organisasi');
        $db->order_by('CAST(value as varchar(10))', FALSE);
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
    }
    public function countGridOrganisasi()
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("ad_organisasi_id AS id, CAST(value as varchar(10)) AS value, name AS name, parent AS parent, description AS description, CASE WHEN isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $db->from('ad_organisasi');
        $db->order_by('CAST(value as varchar(10))', FALSE);
        $query = $db->get();
        return $query;
    }
    public function getViewOrganisasi()
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("CAST(value as varchar(10)) AS value, name AS name", FALSE);
        $db->from('ad_organisasi');
        $db->where('isactive','Y');
        $db->like('name', $this->input->post('query'), 'after'); 
        $db->order_by('CAST(value as varchar(10))', FALSE);
        $query = $db->get();
        return $query;
    }

    public function deleteOrganisasi($id)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->where('ad_organisasi_id',$id);
        $db->delete('ad_organisasi');
    }
    public function getUUID()
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->query('SELECT get_uuid() AS uuid;')->row()->uuid;
    }    
    public function saveOrganisasi($value, $name, $parent, $isactive, $description, $uuid)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
            $db->set('ad_organisasi_id', $uuid );
            $db->set('value', $value);
            $db->set('name', $name);
            $db->set('parent', $parent);
            $db->set('isactive', $isactive);
            $db->set('description', $description);
            $db->set('createdby', $this->session->userdata('id'));
            $db->set('created', date('Y-m-d H:i:s'));
            $db->set('updatedby', $this->session->userdata('id'));
            $db->set('updated', date('Y-m-d H:i:s'));
            $db->insert('ad_organisasi');
    }

    public function saveConfirm($id)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('ad_organisasi')->where('value',$id)->get()->row()->id;
    }
    public function cekOrganisasi($name)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('ad_organisasi')->where('name',$name)->get()->row()->id;
    }
    public function cekParent($id)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('parent AS id')->from('ad_organisasi')->where('ad_organisasi_id',$id)->get()->row()->id;
    } 
    public function cekValueOld($id)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('value AS value')->from('ad_organisasi')->where('ad_organisasi_id',$id)->get()->row()->value;
    } 
    public function cekAnak($value)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('ad_organisasi')->where('parent',$value)->get()->row()->id;
    }
    public function cekDoubleID($value, $id)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('ad_organisasi')->where('parent',$value)->where('ad_organisasi_id',$id)->get()->row()->id;
    }

    public function cekInUsers($id)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('ad_user')->where('ad_organisasi_id',$id)->get()->row()->id;
    } 

    public function cekInUsersorg($id)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('ad_user_organisasi')->where('ad_organisasi_id',$id)->get()->row()->id;
    } 

    public function cekOrganisasiID($name, $id)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('ad_organisasi')->where('name',$name)->where('ad_organisasi_id !=',$id)->get()->row()->id;
    } 
    public function cekOrganisasiValue($value, $id)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('ad_organisasi')->where('value',$value)->where('ad_organisasi_id !=',$id)->get()->row()->id;
    } 
    public function updateOrganisasi($id, $value, $name, $parent, $isactive, $description)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
            $data = array(
                           'name'           => $name,
                           'parent'         => $parent,
                           'value'          => $value,
                           'isactive'       => $isactive,
                           'description'    => $description,
                           'updated'        => date('Y-m-d H:i:s'),
                           'updatedby'      => $this->session->userdata('id')
                        );
            $db->where('ad_organisasi_id',$id);
            $db->update('ad_organisasi', $data);              
    } 
    public function searchGridOrganisasi($username)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("ad_organisasi_id AS id, CAST(value as varchar(10)) AS value, name AS name, parent AS parent, description AS description, CASE WHEN isactive = 'Y' THEN 1 ELSE 0 END AS isactive", FALSE);
        $db->from('ad_organisasi');
        $db->like('LOWER(name)', strtolower($username));      
        $db->order_by('CAST(value as varchar(10))', FALSE);
        $query = $db->get();
        return $query;
    }
    public function printOrganisasi()
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("CAST(u.value as varchar(10)) AS id, u.name AS name, u.parent AS parent, 
            u.description AS description,
            u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
            u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
        $db->from('ad_organisasi AS u');
        $db->join('ad_user AS u1', 'u.createdby=u1.ad_user_id');
        $db->join('ad_user AS u2', 'u.updatedby=u2.ad_user_id');
        $db->order_by('CAST(u.ad_organisasi_id as varchar(10))', FALSE);
        $query = $db->get();
        return $query;
    }
}
<?php if ( ! defined('BASEPATH')) exit('No direct sscript access allowed');
/*
* Copyright @Vinoti-Group 2014
* Author @Ardian Webi Kirda
* 082137288307 / ianwebikirda@gmail.com
*/

class M_company extends CI_Model{
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

    public function getGridCompany($limit, $offset){
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("se.id_company AS id, se.name AS name, se.code AS code", FALSE);
        $db->from('sys_company se');
        $db->order_by('se.code');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
    }
    public function countGridCompany()
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("se.id_company AS id, se.name AS name, se.code AS code", FALSE);
        $db->from('sys_company se');
        $db->order_by('se.code');
        $query = $db->get();
        return $query;
    }

    public function getViewCompany(){
        $this->setConnection('erph');
        $db = $this->getConnection();
        $db->select("name AS name, id_company AS id_company", FALSE);
        $db->from('sys_company');
        $db->like('LOWER(name)',strtolower($this->input->get('query')),'after');
        $db->or_like('LOWER(id_company)',strtolower($this->input->get('query')),'after');
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

        return $db->select('COUNT(*) AS id', FALSE)->from('sys_company')->where('name',$name)->get()->row()->id;
    }

    public function cekDept($id_dept, $id_comp){
        $this->setConnection('erph');
        $db = $this->getConnection();

        return $db->select('COUNT(*) AS id', FALSE)->from('trs_compdep')->where('id_department',$id_dept)->where('id_company',$id_comp)->get()->row()->id;
    }

    public function cekCompanyID($name, $id){
        return $this->db->select('COUNT(*) AS id', FALSE)->from('sys_company')->where('name',$name)->where('id_company !=', $id)->get()->row()->id;
    }

    public function saveConfirm($uuid){
        $this->setConnection('erph');
        $db = $this->getConnection();

        return $db->select('COUNT(*) AS id', FALSE)->from('sys_company')->where('id_company', $uuid)->get()->row()->id;
    }

    public function searchCompany($name){
        $this->setConnection('erph');
        $db = $this->getConnection();
        $db->select("se.id_company AS id, se.name AS name, se.code AS code", FALSE);
        $db->from('sys_company se');
        $db->like('LOWER(se.name)',strtolower($name));
        $db->order_by('se.code');
        $query = $db->get();
        return $query;
    }

    public function saveCompany($name, $code, $uuid){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $db->set('id_company', $uuid);
        $db->set('name', $name);
        $db->set('code', $code);
        $db->set('createdby', $this->session->userdata('id'));
        $db->set('created', date('Y-m-d H:i:s'));
        $db->set('updatedby', $this->session->userdata('id'));
        $db->set('updated', date('Y-m-d H:i:s'));
        $db->insert('sys_company');
    }

    public function saveTrscomp($id_comp, $id_dept, $uuid){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $db->set('id_compdep', $uuid);
        $db->set('id_company', $id_comp);
        $db->set('id_department', $id_dept);
        $db->set('createdby', $this->session->userdata('id'));
        $db->set('created', date('Y-m-d H:i:s'));
        $db->set('updatedby', $this->session->userdata('id'));
        $db->set('updated', date('Y-m-d H:i:s'));
        $db->insert('trs_compdep');
    }

    public function updateCompany($name, $code, $id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $data = array(
           'name'           => $name,
           'code'          => $code,
           'updated'        => date('Y-m-d H:i:s'),
           'updatedby'      => $this->session->userdata('id')
        );
        $db->where('id_company', $id);
        $db->update('sys_company', $data);
    }

    public function delCompany($id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $db->where('id_company',$id);
        $db->delete('sys_company');
    }

    public function getDepartment2($id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        $db->select("tcp.id_compdep AS id, tcp.id_company AS id_company, sc.code AS code_company, sc.name AS name_company,
        tcp.id_department AS id_department, sd.code AS code_department, sd.name AS name_department", FALSE);
        $db->from('trs_compdep tcp');
        $db->join('sys_company sc','tcp.id_company=sc.id_company');
        $db->join('sys_department sd','tcp.id_department=sd.id_department');
        $db->where('tcp.id_company',$id);
        $query = $db->get();
        return $query;
    }

    public function cekCompDep($id){
        $this->setConnection('erph');
        $db = $this->getConnection();

        return $db->select("COUNT(*) AS id",FALSE)->from('trs_compdep')->where('id_company',$id)->get()->row()->id;
    }
}
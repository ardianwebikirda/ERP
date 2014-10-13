<?php if ( ! defined('BASEPATH')) exit('No direct sseript access allowed');
/*
* Copyright @Vinoti-Group 2014
* Author @Ardian Webi Kirda
* 082137288307 / ianwebikirda@gmail.com
*/

class M_employee extends CI_Model
{
    
    private $connectionName;



    /*
    * Contruct Function Aplikasi
    */
    public function __construct(){
        parent::__construct();
    }

    public function setConnection($connectionName){
        $this->connectionName = $connectionName;
    }

    public function getConnection(){
        return $this->load->database($this->connectionName, TRUE);
    }

    /*
    * Query Untuk mendapatkan Data Grid dari DB
    */
    public function getEmployee($limit, $offset)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->select("
            se.id_employee AS id, 
            se.fname AS fname, 
            se.lname AS lname, 
            se.username AS username, 
            se.gender AS gender,             
            se.id_religion AS id_religion, 
            se.bod_place AS bod_place, 
            se.bod AS bod, 
            se.marital_status AS marital_status, 
            se.noc AS noc,             
            se.id_education AS id_education,
            sed.name AS name_education,
            se.id_officehour AS id_officehour,
            ofh.name AS name_officehour, 
            se.blood AS blood, 
            se.photo AS photo, 
            se.address AS address, 
            se.id_country AS id_country,
            sc.name AS name_country,             
            se.id_province AS id_province,
            sp.name AS name_province, 
            se.id_region AS id_region,
            sr.name AS name_region,  
            se.zip AS zip, 
            se.code AS code, 
            se.id_company AS id_company, 
            sco.name AS name_company,
            se.id_department AS id_department,
            sdep.name AS name_department,             
            se.id_jobtitle AS id_jobtitle,
            sjt.name AS name_jobtitle, 
            se.id_jobstatus AS id_jobstatus, 
            sjs.name AS name_jobstatus, 
            se.hire AS hire, 
            se.expired AS expired, 
            se.supervisor AS supervisor,             
            se.phone AS phone, 
            se.mobile1 AS mobile1, 
            se.mobile2 AS mobile2, 
            se.email1 AS email1, 
            se.email2 AS email2, 
            se.id_bank AS id_bank,
            sb.name AS name_bank,             
            se.bank_account AS bank_account, 
            se.idcard_type AS idcard_type, 
            se.idcard_number AS idcard_number, 
            se.tax AS tax, 

            se.isactive AS isactive, 
            CASE WHEN se.isactive = 'Y' THEN 1 ELSE 0 END AS isactive,

            se.isovertime AS isovertime, 
            CASE WHEN se.isovertime = 'Y' THEN 1 ELSE 0 END AS isovertime,

            se.isresign AS isresign, 
            CASE WHEN se.isresign = 'Y' THEN 1 ELSE 0 END AS isresign", FALSE);
        $db->from('sys_employee se');
        $db->join('sys_country sc','se.id_country=sc.id_country','left');
        $db->join('sys_province sp','se.id_province=sp.id_province','left');
        $db->join('sys_region sr','se.id_region=sr.id_region','left');
        $db->join('sys_officehour ofh','se.id_officehour = ofh.id_officehour','left');
        $db->join('sys_company sco','se.id_company = sco.id_company','left');
        $db->join('sys_department sdep','se.id_department = sdep.id_department','left');
        $db->join('sys_bank sb','se.id_bank = sb.id_bank','left');
        $db->join('sys_jobtitle sjt','se.id_jobtitle = sjt.id_jobtitle','left');
        $db->join('sys_jobstatus sjs','se.id_jobstatus = sjs.id_jobstatus','left');
        $db->join('sys_education sed','se.id_education = sed.id_education','left');
        $db->order_by('fname');
        $db->limit($offset, $limit);
        $query = $db->get();
        // echo $db->last_query();
        // exit();
        return $query;
    }

    /*
    * Query Untuk Menghitung Jumlah Data Grid
    */
    public function countGridEmployee()
    {
      
      $this->setConnection('erph');
      $db   = $this->getConnection(); 
      $db->select("
            se.id_employee AS id, 
            se.fname AS fname, 
            se.lname AS lname, 
            se.username AS username, 
            se.gender AS gender,             
            se.id_religion AS id_religion, 
            se.bod_place AS bod_place, 
            se.bod AS bod, 
            se.marital_status AS marital_status, 
            se.noc AS noc,             
            se.id_education AS id_education,
            sed.name AS name_education,
            se.id_officehour AS id_officehour,
            ofh.name AS name_officehour, 
            se.blood AS blood, 
            se.photo AS photo, 
            se.address AS address, 
            se.id_country AS id_country,
            sc.name AS name_country,             
            se.id_province AS id_province,
            sp.name AS name_province, 
            se.id_region AS id_region,
            sr.name AS name_region,  
            se.zip AS zip, 
            se.code AS code, 
            se.id_company AS id_company, 
            sco.name AS name_company,
            se.id_department AS id_department,
            sdep.name AS name_department,             
            se.id_jobtitle AS id_jobtitle,
            sjt.name AS name_jobtitle, 
            se.id_jobstatus AS id_jobstatus, 
            sjs.name AS name_jobstatus, 
            se.hire AS hire, 
            se.expired AS expired, 
            se.supervisor AS supervisor,             
            se.phone AS phone, 
            se.mobile1 AS mobile1, 
            se.mobile2 AS mobile2, 
            se.email1 AS email1, 
            se.email2 AS email2, 
            se.id_bank AS id_bank,
            sb.name AS name_bank,             
            se.bank_account AS bank_account, 
            se.idcard_type AS idcard_type, 
            se.idcard_number AS idcard_number, 
            se.tax AS tax, 

            se.isactive AS isactive, 
            CASE WHEN se.isactive = 'Y' THEN 1 ELSE 0 END AS isactive,

            se.isovertime AS isovertime, 
            CASE WHEN se.isovertime = 'Y' THEN 1 ELSE 0 END AS isovertime,

            se.isresign AS isresign, 
            CASE WHEN se.isresign = 'Y' THEN 1 ELSE 0 END AS isresign", FALSE);
        $db->from('sys_employee se');
        $db->join('sys_country sc','se.id_country=sc.id_country','left');
        $db->join('sys_province sp','se.id_province=sp.id_province','left');
        $db->join('sys_region sr','se.id_region=sr.id_region','left');
        $db->join('sys_officehour ofh','se.id_officehour = ofh.id_officehour','left');
        $db->join('sys_company sco','se.id_company = sco.id_company','left');
        $db->join('sys_department sdep','se.id_department = sdep.id_department','left');
        $db->join('sys_bank sb','se.id_bank = sb.id_bank','left');
        $db->join('sys_jobtitle sjt','se.id_jobtitle = sjt.id_jobtitle','left');
        $db->join('sys_jobstatus sjs','se.id_jobstatus = sjs.id_jobstatus','left');
        $db->join('sys_education sed','se.id_education = sed.id_education','left');
        $db->order_by('fname');
        $query = $db->get();
        // echo $db->last_query(); <-- This Query Can Activated for test parsing parameter
        // exit();   
        return $query;
    }

    /*
    * Query Untuk Menghapus data Master Employee
    */
    public function deleteEmployee($id)
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->where('id_employee',$id);
        $db->delete('sys_employee');
    }


    /*
    * Query untuk menyimpan data
    */
    public function saveEmployee($fname,
          $lname,
          $username,
          $gender,
          $religion,
          $bod_place,
          $bod,
          $marital_status,
          $noc,
          $id_education,
          $id_officehour,
          $blood,
          $photo,
          $address,
          $id_country,
          $id_province,
          $id_region,
          $zip,
          $code,
          $id_company,
          $id_department,
          $id_jobtitle,
          $id_jobstatus,
          $hire,
          $expired,
          $supervisor,
          $phone,
          $mobile1,
          $mobile2,
          $email1,
          $email2,
          $id_bank,
          $bank_account,
          $idcard_type,
          $idcard_number,
          $tax,
          $isactive,
          $isovertime,
          $isresign, 
          $uuid)
    {
        
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $db->set('id_employee', $uuid);
        $db->set('fname', $fname);
        $db->set('lname', $lname);
        $db->set('username', $username);
        $db->set('gender', $gender);
        $db->set('id_religion', $religion);
        $db->set('bod_place', $bod_place);
        $db->set('bod', $bod);
        $db->set('marital_status', $marital_status);
        $db->set('noc', $noc);
        $db->set('id_education', $id_education);
        $db->set('id_officehour', $id_officehour);
        $db->set('blood', $blood);
        $db->set('photo', $photo);
        $db->set('address', $address);
        $db->set('id_country', $id_country);
        $db->set('id_province', $id_province);
        $db->set('id_region', $id_region);
        $db->set('zip', $zip);
        $db->set('code', $code);
        $db->set('id_company', $id_company);
        $db->set('id_department', $id_department);
        $db->set('id_jobtitle', $id_jobtitle);
        $db->set('id_jobstatus', $id_jobstatus);
        $db->set('hire', $hire);
        $db->set('expired', $expired);
        $db->set('supervisor', $supervisor);
        $db->set('phone', $phone);
        $db->set('mobile1', $mobile1);
        $db->set('mobile2', $mobile2);
        $db->set('email1', $email1);
        $db->set('email2', $email2);
        $db->set('id_bank', $id_bank);
        $db->set('bank_account', $bank_account);
        $db->set('idcard_type', $idcard_type);
        $db->set('idcard_number', $idcard_number);
        $db->set('tax', $tax);
        $db->set('isactive', $isactive);
        $db->set('isovertime', $isovertime);
        $db->set('isresign', $isresign);
        $db->set('createdby', $this->session->userdata('id'));
        $db->set('created', date('Y-m-d H:i:s'));
        $db->set('updatedby', $this->session->userdata('id'));
        $db->set('updated', date('Y-m-d H:i:s'));
        $db->insert('sys_employee');
    }


    /*
    * Query untuk mendapatkan Generate ID dari DB PostgreSQL 
    */
    public function getUUID(){ 
        $this->setConnection('erph');
        $db   = $this->getConnection();     
        return $db->query('SELECT get_uuid() AS uuid;')->row()->uuid;
    }

    /*
    * Query untuk validasi ID sebelum data disimpan 
    */
    public function saveConfirm($uuid){
        $this->setConnection('erph');
        $db   = $this->getConnection();      
        return $db->select('COUNT(*) AS id', FALSE)->from('sys_employee')->where('id_employee',$uuid)->get()->row()->id;
    }

    /*
    * Query untuk validasi data unique sebelum data disimpan
    */
    public function cekID($uuid){
        $this->setConnection('erph');
        $db   = $this->getConnection();      
        return $db->select('COUNT(*) AS id', FALSE)->from('trs_compdept')->where('id_compdept',$uuid)->get()->row()->id;
    }    
    
    /*
    * Query untuk validasi ID sebelum data disimpan 
    */
    public function saveConfirm2($uuid){
        $this->setConnection('erph');
        $db   = $this->getConnection();      
        return $db->select('COUNT(*) AS id', FALSE)->from('trs_compdept')->where('id_compdept',$uuid)->get()->row()->id;
    }

    /*
    * Query untuk validasi data unique sebelum data disimpan
    */
    public function cekEmployee($code){
        $this->setConnection('erph');
        $db   = $this->getConnection();      
        return $db->select('COUNT(*) AS id', FALSE)->from('sys_employee')->where('code',$code)->get()->row()->id;
    }

    /*
    * Query untuk validasi key / index untuk udate data 
    */
    public function cekEmployeeID($code, $id){
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('sys_employee')->where('code',$code)->where('id_employee !=', $id)->get()->row()->id;
    }

    /*
    * Query Untuk Validasi id_employee 
    */
    public function cekCompDep($id){
        $this->setConnection('erph');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('trs_compdept')->where('id_employee',$id)->get()->row()->id;
    }

    /*
    * Query untuk update data 
    */ 
    public function updateEmployee(
        $id,
        $fname,
        $lname,
        $username,
        $gender,
        $religion,
        $bod_place,
        $bod,
        $marital_status,
        $noc,
        $id_education,
        $id_officehour,
        $blood,
        $photo,
        $address,
        $id_country,
        $id_province,
        $id_region,
        $code,
        $zip,
        $id_company,
        $id_department,
        $id_jobtitle,
        $id_jobstatus,
        $hire,
        $expired,
        $supervisor,
        $phone,
        $mobile1,
        $mobile2,
        $email1,
        $email2,
        $id_bank,
        $bank_account,
        $idcard_type,
        $idcard_number,
        $tax,
        $isactive,
        $isovertime,
        $isresign 

    )
    {
        $this->setConnection('erph');
        $db   = $this->getConnection();
        $data = array(
                       'fname'              => $fname,
                       'lname'              => $lname,
                       'isactive'           => $isactive,
                        'username'          => $username,
                        'gender'            => $gender,
                        'id_religion'       => $religion,
                        'bod_place'         => $bod_place,
                        'bod'               => $bod,
                        'marital_status'    => $marital_status,
                        'noc'               => $noc,
                        'id_education'      => $id_education,
                        'id_officehour'     => $id_officehour,
                        'blood'             => $blood,
                        'photo'             => $photo,
                        'address'           => $address,
                        'id_country'        => $id_country,
                        'id_province'       => $id_province,
                        'id_region'         => $id_region,
                        'zip'               => $zip,
                        'code'              => $code,
                        'id_company'        => $id_company,
                        'id_department'     => $id_department,
                        'id_jobtitle'       => $id_jobtitle,
                        'id_jobstatus'      => $id_jobstatus,
                        'hire'              => $hire,
                        'expired'           => $expired,
                        'supervisor'        => $supervisor,
                        'phone'             => $phone,
                        'mobile1'           => $mobile1,
                        'mobile2'           => $mobile2,
                        'email1'            => $email1,
                        'email2'            => $email2,
                        'id_bank'           => $id_bank,
                        'bank_account'      => $bank_account,
                        'idcard_type'       => $idcard_type,
                        'idcard_number'     => $idcard_number,
                        'tax'               => $tax,
                        'isactive'          => $isactive,
                        'isovertime'        => $isovertime,
                        'isresign'          => $isresign,
                        'updated'           => date('Y-m-d H:i:s'),
                        'updatedby'         => $this->session->userdata('id')
                    );
        $db->where('id_employee',$id);
        $db->update('sys_employee', $data);
    }

    /*
    * Query untuk pencarian data 
    */ 
    public function searchGridEmployee($name)
    {
       $this->setConnection('erph');
       $db   = $this->getConnection();
       $db->select("
            se.id_employee AS id, 
            se.fname AS fname, 
            se.lname AS lname, 
            se.username AS username, 
            se.gender AS gender,             
            se.id_religion AS id_religion, 
            se.bod_place AS bod_place, 
            se.bod AS bod, 
            se.marital_status AS marital_status, 
            se.noc AS noc,             
            se.id_education AS id_education,
            sed.name AS name_education,
            se.id_officehour AS id_officehour,
            ofh.name AS name_officehour, 
            se.blood AS blood, 
            se.photo AS photo, 
            se.address AS address, 
            se.id_country AS id_country,
            sc.name AS name_country,             
            se.id_province AS id_province,
            sp.name AS name_province, 
            se.id_region AS id_region,
            sr.name AS name_region,  
            se.zip AS zip, 
            se.code AS code, 
            se.id_company AS id_company, 
            sco.name AS name_company,
            se.id_department AS id_department,
            sdep.name AS name_department,             
            se.id_jobtitle AS id_jobtitle,
            sjt.name AS name_jobtitle, 
            se.id_jobstatus AS id_jobstatus, 
            sjs.name AS name_jobstatus, 
            se.hire AS hire, 
            se.expired AS expired, 
            se.supervisor AS supervisor,             
            se.phone AS phone, 
            se.mobile1 AS mobile1, 
            se.mobile2 AS mobile2, 
            se.email1 AS email1, 
            se.email2 AS email2, 
            se.id_bank AS id_bank,
            sb.name AS name_bank,             
            se.bank_account AS bank_account, 
            se.idcard_type AS idcard_type, 
            se.idcard_number AS idcard_number, 
            se.tax AS tax, 

            se.isactive AS isactive, 
            CASE WHEN se.isactive = 'Y' THEN 1 ELSE 0 END AS isactive,

            se.isovertime AS isovertime, 
            CASE WHEN se.isovertime = 'Y' THEN 1 ELSE 0 END AS isovertime,

            se.isresign AS isresign, 
            CASE WHEN se.isresign = 'Y' THEN 1 ELSE 0 END AS isresign", FALSE);
        $db->from('sys_employee se');
        $db->join('sys_country sc','se.id_country=sc.id_country','left');
        $db->join('sys_province sp','se.id_province=sp.id_province','left');
        $db->join('sys_region sr','se.id_region=sr.id_region','left');
        $db->join('sys_officehour ofh','se.id_officehour = ofh.id_officehour','left');
        $db->join('sys_company sco','se.id_company = sco.id_company','left');
        $db->join('sys_department sdep','se.id_department = sdep.id_department','left');
        $db->join('sys_bank sb','se.id_bank = sb.id_bank','left');
        $db->join('sys_jobtitle sjt','se.id_jobtitle = sjt.id_jobtitle','left');
        $db->join('sys_jobstatus sjs','se.id_jobstatus = sjs.id_jobstatus','left');
        $db->join('sys_education sed','se.id_education = sed.id_education','left');
        $db->like('LOWER(se.code)', strtolower($name));
        $db->or_like('LOWER(se.fname)', strtolower($name));
        $db->or_like('LOWER(se.lname)', strtolower($name));
        $db->or_like('LOWER(sco.name)', strtolower($name));
        $db->or_like('LOWER(sdep.name)', strtolower($name));
        $db->order_by('code');
        $query = $db->get();
        return $query;
    }

    /*
    * Query untuk melakukan export reporting  
    */ 
    // public function printEmployee()
    // {
    //     $db->select("u.id_employee AS id, u.username AS username, u.name AS name, u.firstname AS firstname, r.name AS role,
    //         u.lastname AS lastname, u.desseription AS desseription, u.email AS email, u.phone AS phone, u.phone2 AS mobile,
    //         u.isactive AS active, u1.name AS dibuat, to_char(u.created, 'dd-mm-yyyy') AS tgl_buat, 
    //         u2.name AS diupdate, to_char(u.updated, 'dd-mm-yyyy') AS tgl_update", FALSE);
    //     $db->from('sys_employee AS u');
    //     $db->join('sys_employee AS u1', 'u.createdby=u1.id_employee');
    //     $db->join('sys_employee AS u2', 'u.updatedby=u2.id_employee');
    //     $db->join('ad_role r','r.ad_role_id=u.ad_role_id');
    //     $db->order_by('name');
    //     $query = $db->get();
    //     return $query;
    // }
}
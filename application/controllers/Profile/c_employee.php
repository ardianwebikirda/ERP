<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class C_employee extends CI_Controller
{
  public function __construct(){
          parent::__construct();
    $this->load->library('excel');
    $this->load->model('Profile/m_employee');

  }

  public function getEmployee()
  {
    $start      = ($this->input->post('start', TRUE) ? $this->input->post('start', TRUE) : 0);
    $limit      = ($this->input->post('limit', TRUE) ? $this->input->post('limit', TRUE) : 20);  
    $result = $this->m_employee->getEmployee($start,$limit);
    $result1 = $this->m_employee->countGridEmployee();
    $count = $result1->num_rows();
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'              => $value->id,
        'fname'           => $value->fname,
        'lname'           => $value->lname,
        'username'        => $value->username,
        'gender'          => $value->gender,
        'id_religion'     => $value->id_religion,
        'bod_place'       => $value->bod_place,
        'bod'             => $value->bod,
        'marital_status'  => $value->marital_status,
        'noc'             => $value->noc,
        'id_education'    => $value->id_education,
        'name_education'  => $value->name_education,
        'blood'           => $value->blood,
        'photo'           => $value->photo,
        'address'         => $value->address,
        'id_officehour'   => $value->id_officehour,
        'name_officehour' => $value->name_officehour,
        'id_country'      => $value->id_country,
        'name_country'    => $value->name_country,
        'id_province'     => $value->id_province,
        'name_province'   => $value->name_province,
        'id_region'       => $value->id_region,
        'name_region'     => $value->name_region,
        'code'            => $value->code,
        'zip'             => $value->zip,
        'id_company'      => $value->id_company,
        'name_company'    => $value->name_company,
        'id_department'   => $value->id_department,
        'name_department' => $value->name_department,
        'id_jobtitle'     => $value->id_jobtitle,
        'name_jobtitle'   => $value->name_jobtitle,
        'id_jobstatus'    => $value->id_jobstatus,
        'name_jobstatus'  => $value->name_jobstatus,
        'hire'            => $value->hire,
        'expired'         => $value->expired,
        'supervisor'      => $value->supervisor,
        'phone'           => $value->phone,
        'mobile1'         => $value->mobile1,
        'mobile2'         => $value->mobile2,
        'email1'          => $value->email1,
        'email2'          => $value->email2,
        'id_bank'         => $value->id_bank,
        'name_bank'       => $value->name_bank,
        'bank_account'    => $value->bank_account,
        'idcard_type'     => $value->idcard_type,
        'idcard_number'   => $value->idcard_number,
        'tax'             => $value->tax,
        'isactive'        => $value->isactive,
        'isovertime'      => $value->isovertime,
        'isresign'        => $value->isresign               
        );
    }
        $data['total'] = $count;
        $data['success'] = true;
        echo json_encode($data);
  }

  public function delEmployee()
  {
    $data       = json_decode($this->input->post('post'));
    foreach($data as $row){
      $this->m_employee->deleteEmployee($row->id);
    }
  
  $this->getEmployee();   
  }

  public function delDepartment()
  {
    $data       = json_decode($this->input->post('post'));
    foreach($data as $row){
      $this->m_employee->deleteDept($row->id);
    }
  
  $this->getEmployee();   
  }


  public function saveEmployee()
  {    
      $fname           = ($this->input->post('fname', TRUE) ? $this->input->post('fname', TRUE) : '');
      $lname           = ($this->input->post('lname', TRUE) ? $this->input->post('lname', TRUE) : '');
      $username        = ($this->input->post('username', TRUE) ? $this->input->post('username', TRUE) : '');
      $gender          = ($this->input->post('gender', TRUE) ? $this->input->post('gender', TRUE) : '');
      $religion        = ($this->input->post('religion', TRUE) ? $this->input->post('religion', TRUE) : '');
      $bod_place       = ($this->input->post('bod_place', TRUE) ? $this->input->post('bod_place', TRUE) : '');
      $bod             = ($this->input->post('bod', TRUE) ? $this->input->post('bod', TRUE) : '');
      $marital_status  = ($this->input->post('marital_status', TRUE) ? $this->input->post('marital_status', TRUE) : '');
      $noc             = ($this->input->post('noc', TRUE) ? $this->input->post('noc', TRUE) : '');
      $id_education    = ($this->input->post('id_education', TRUE) ? $this->input->post('id_education', TRUE) : '');
      $id_officehour   = ($this->input->post('id_officehour', TRUE) ? $this->input->post('id_officehour', TRUE) : '');
      $blood           = ($this->input->post('blood', TRUE) ? $this->input->post('blood', TRUE) : '');
      $photo           = ($this->input->post('photo', TRUE) ? $this->input->post('photo', TRUE) : '');
      $address         = ($this->input->post('address', TRUE) ? $this->input->post('address', TRUE) : '');
      $id_country      = ($this->input->post('id_country', TRUE) ? $this->input->post('id_country', TRUE) : '');
      $id_province     = ($this->input->post('id_province', TRUE) ? $this->input->post('id_province', TRUE) : '');
      $id_region       = ($this->input->post('id_region', TRUE) ? $this->input->post('id_region', TRUE) : '');
      $zip             = ($this->input->post('zip', TRUE) ? $this->input->post('zip', TRUE) : '');
      $code            = ($this->input->post('code', TRUE) ? $this->input->post('code', TRUE) : '');
      $id_company      = ($this->input->post('id_company', TRUE) ? $this->input->post('id_company', TRUE) : '');
      $id_department   = ($this->input->post('id_department', TRUE) ? $this->input->post('id_department', TRUE) : '');
      $id_jobtitle     = ($this->input->post('id_jobtitle', TRUE) ? $this->input->post('id_jobtitle', TRUE) : '');
      $id_jobstatus    = ($this->input->post('id_jobstatus', TRUE) ? $this->input->post('id_jobstatus', TRUE) : '');
      $hire            = ($this->input->post('hire', TRUE) ? $this->input->post('hire', TRUE) : '');
      $expired         = ($this->input->post('expired', TRUE) ? $this->input->post('expired', TRUE) : '');
      $supervisor      = ($this->input->post('supervisor', TRUE) ? $this->input->post('supervisor', TRUE) : '');
      $phone           = ($this->input->post('phone', TRUE) ? $this->input->post('phone', TRUE) : '');
      $mobile1         = ($this->input->post('mobile1', TRUE) ? $this->input->post('mobile1', TRUE) : '');
      $mobile2         = ($this->input->post('mobile2', TRUE) ? $this->input->post('mobile2', TRUE) : '');
      $email1          = ($this->input->post('email1', TRUE) ? $this->input->post('email1', TRUE) : '');
      $email2          = ($this->input->post('email2', TRUE) ? $this->input->post('email2', TRUE) : '');
      $id_bank         = ($this->input->post('id_bank', TRUE) ? $this->input->post('id_bank', TRUE) : '');
      $bank_account    = ($this->input->post('bank_account', TRUE) ? $this->input->post('bank_account', TRUE) : '');
      $idcard_type     = ($this->input->post('idcard_type', TRUE) ? $this->input->post('idcard_type', TRUE) : '');
      $idcard_number   = ($this->input->post('idcard_number', TRUE) ? $this->input->post('idcard_number', TRUE) : '');
      $tax             = ($this->input->post('tax', TRUE) ? $this->input->post('tax', TRUE) : '');
      
      $isactive1       = ($this->input->post('isactive', TRUE) ? $this->input->post('isactive', TRUE) : '');
      if($isactive1 == TRUE) { $isactive = 'Y'; } else { $isactive = 'N'; }

      $isovertime      = ($this->input->post('isovertime', TRUE) ? $this->input->post('isovertime', TRUE) : '');
      if($isovertime == TRUE) {$isovertime = 'Y';} else {$isovertime = 'N';} 

      $isresign        = ($this->input->post('isresign', TRUE) ? $this->input->post('isresign', TRUE) : '');
      if($isresign == TRUE) {$isresign = 'Y';} else {$isresign = 'N';}

      $uuid         = $this->m_employee->getUUID();

    if($code == '' && $code == NULL){
      $success = 3;
    } else if($this->m_employee->cekEmployee($code) == 0){ 
      $this->m_employee->saveEmployee(
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
          $isresign, 
          $uuid
        );
      if($this->m_employee->saveConfirm($uuid) == 0){ 
        $success = 0; 
      } else { 
        $success = 1; 
      }
    } else { 
      $success = 2; 
    }
        $data['total'] = $success;
        $data['success'] = TRUE;
        echo json_encode($data); 
  }

  public function saveDepartment2()
  {
    $id_comp      = ($this->input->post('id_comp', TRUE) ? $this->input->post('id_comp', TRUE) : '');
    $id_dept      = ($this->input->post('id_dept', TRUE) ? $this->input->post('id_dept', TRUE) : '');
    $isactive1    = ($this->input->post('isactive', TRUE) ? $this->input->post('isactive', TRUE) : '');
    if($isactive1 == TRUE) { $isactive = 'Y'; } else { $isactive = 'N'; }
    $uuid         = $this->m_employee->getUUID();

    if($uuid == '' && $uuid== NULL){
      $success = 3;
    } elseif ($this->m_employee->cekID($uuid) == 0) {
      $this->m_employee->saveDepartment2($id_comp, $id_dept, $isactive, $uuid);
      if($this->m_employee->saveConfirm2($uuid) == 0){
        $success = 0;
      } else {
        $success = 1;
      }
    } else {
      $success = 2;
    }
    
    $data['total']    = $success;
    $data['success']  = TRUE;
    echo json_encode($data);     
  }

  public function editEmployee()
  {
    $id              = ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
    $fname           = ($this->input->post('fname', TRUE) ? $this->input->post('fname', TRUE) : '');
    $lname           = ($this->input->post('lname', TRUE) ? $this->input->post('lname', TRUE) : '');
    $username        = ($this->input->post('username', TRUE) ? $this->input->post('username', TRUE) : '');
    $gender          = ($this->input->post('gender', TRUE) ? $this->input->post('gender', TRUE) : '');
    $religion        = ($this->input->post('religion', TRUE) ? $this->input->post('religion', TRUE) : '');
    $bod_place       = ($this->input->post('bod_place', TRUE) ? $this->input->post('bod_place', TRUE) : '');
    $bod             = ($this->input->post('bod', TRUE) ? $this->input->post('bod', TRUE) : '');
    $marital_status  = ($this->input->post('marital_status', TRUE) ? $this->input->post('marital_status', TRUE) : '');
    $noc             = ($this->input->post('noc', TRUE) ? $this->input->post('noc', TRUE) : '');
    $id_education    = ($this->input->post('id_education', TRUE) ? $this->input->post('id_education', TRUE) : '');
    $id_officehour   = ($this->input->post('id_officehour', TRUE) ? $this->input->post('id_officehour', TRUE) : '');
    $blood           = ($this->input->post('blood', TRUE) ? $this->input->post('blood', TRUE) : '');
    $photo           = ($this->input->post('photo', TRUE) ? $this->input->post('photo', TRUE) : '');
    $address         = ($this->input->post('address', TRUE) ? $this->input->post('address', TRUE) : '');
    $id_country      = ($this->input->post('id_country', TRUE) ? $this->input->post('id_country', TRUE) : '');
    $id_province     = ($this->input->post('id_province', TRUE) ? $this->input->post('id_province', TRUE) : '');
    $id_region       = ($this->input->post('id_region', TRUE) ? $this->input->post('id_region', TRUE) : '');
    $zip             = ($this->input->post('code', TRUE) ? $this->input->post('zip', TRUE) : '');
    $code            = ($this->input->post('code', TRUE) ? $this->input->post('code', TRUE) : '');
    $id_company      = ($this->input->post('id_company', TRUE) ? $this->input->post('id_company', TRUE) : '');
    $id_department   = ($this->input->post('id_department', TRUE) ? $this->input->post('id_department', TRUE) : '');
    $id_jobtitle     = ($this->input->post('id_jobtitle', TRUE) ? $this->input->post('id_jobtitle', TRUE) : '');
    $id_jobstatus    = ($this->input->post('id_jobstatus', TRUE) ? $this->input->post('id_jobstatus', TRUE) : '');
    $hire            = ($this->input->post('hire', TRUE) ? $this->input->post('hire', TRUE) : '');
    $expired         = ($this->input->post('expired', TRUE) ? $this->input->post('expired', TRUE) : '');
    $supervisor      = ($this->input->post('supervisor', TRUE) ? $this->input->post('supervisor', TRUE) : '');
    $phone           = ($this->input->post('phone', TRUE) ? $this->input->post('phone', TRUE) : '');
    $mobile1         = ($this->input->post('mobile1', TRUE) ? $this->input->post('mobile1', TRUE) : '');
    $mobile2         = ($this->input->post('mobile2', TRUE) ? $this->input->post('mobile2', TRUE) : '');
    $email1          = ($this->input->post('email1', TRUE) ? $this->input->post('email1', TRUE) : '');
    $email2          = ($this->input->post('email2', TRUE) ? $this->input->post('email2', TRUE) : '');
    $id_bank         = ($this->input->post('id_bank', TRUE) ? $this->input->post('id_bank', TRUE) : '');
    $bank_account    = ($this->input->post('bank_account', TRUE) ? $this->input->post('bank_account', TRUE) : '');
    $idcard_type     = ($this->input->post('idcard_type', TRUE) ? $this->input->post('idcard_type', TRUE) : '');
    $idcard_number   = ($this->input->post('idcard_number', TRUE) ? $this->input->post('idcard_number', TRUE) : '');
    $tax             = ($this->input->post('tax', TRUE) ? $this->input->post('tax', TRUE) : '');
    
    $isactive1       = ($this->input->post('isactive', TRUE) ? $this->input->post('isactive', TRUE) : '');
    if($isactive1 == TRUE) { $isactive = 'Y'; } else { $isactive = 'N'; }

    $isovertime      = ($this->input->post('isovertime', TRUE) ? $this->input->post('isovertime', TRUE) : '');
    if($isovertime == TRUE) {$isovertime = 'Y';} else {$isovertime = 'N';} 

    $isresign        = ($this->input->post('isresign', TRUE) ? $this->input->post('isresign', TRUE) : '');
      if($isresign == TRUE) {$isresign = 'Y';} else {$isresign = 'N';}

    if($code == '' && $code == NULL){ $success = 3;
    } else if($this->m_employee->cekEmployeeID($code, $id) == 0){ 
      $this->m_employee->updateEmployee(
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
      );
      $success = 1;
    } else { $success = 2; }
        $data['total'] = $success;
        $data['success'] = TRUE;
        echo json_encode($data); 
  }

  public function searchEmployee()
  {
    $name     = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    $result   = $this->m_employee->searchGridEmployee($name);
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'                => $value->id,
        'code'              => $value->code,        
        'fname'             => $value->fname,
        'lname'             => $value->lname,
        'name_company'      => $value->name_company,
        'name_department'   => $value->name_department,    
        );
    }
        $data['success'] = TRUE;
        echo json_encode($data);
  }

  public function viewEmployee()
  {
    $result = $this->m_employee->viewEmployee();
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'          => $value->id,        
        'name'        => $value->name,                           
        );
    }
        $data['success'] = TRUE;
        echo json_encode($data);
  }

  public function printEmployee()
  { 
    $result = $this->m_employee->printEmployee();
        $this->export($result->result());
        $objWriter  = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="report_'.__CLASS__.'_'.__FUNCTION__.date('_d_m_Y_H_i_s_').$_SERVER['SERVER_ADDR'].'.xls"');
        header('Cache-Control: max-age=0');
        $objWriter->save('php://output');

  }

    private function export($data){
    $this->excel->setActiveSheetIndex(0);
    $this->excel->getActiveSheet()->setTitle('REPORT '.strtoupper(__CLASS__));
    $this->excel->getDefaultStyle()->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
    $this->excel->getDefaultStyle()->getFont()->setName('Arial')->setSize(9);
      /**
       * Header Laporan
       **/
      $this->excel->getActiveSheet()->setCellValue('A1', 'DATA ROLE');
      $this->excel->getActiveSheet()->mergeCells('A1:N1');
      $this->excel->getActiveSheet()->setCellValue('A3', 'No');
      $this->excel->getActiveSheet()->setCellValue('B3', 'Nama');
      $this->excel->getActiveSheet()->setCellValue('C3', 'Keterangan');
      $this->excel->getActiveSheet()->setCellValue('D3', 'Is Active');
      $this->excel->getActiveSheet()->setCellValue('E3', 'Dibuat Oleh');
      $this->excel->getActiveSheet()->setCellValue('F3', 'Dibuat Tanggal');
      $this->excel->getActiveSheet()->setCellValue('G3', 'Diupdate Oleh');
      $this->excel->getActiveSheet()->setCellValue('H3', 'Diupdate Tanggal');
      $awal = 4;
      $start  = $awal;
      /**
       * End of Header Laporan
       **/
      foreach($data as $key => $val){     
        $this->excel->getActiveSheet()->setCellValue('A'.$start, $key + 1);
        $this->excel->getActiveSheet()->setCellValue('B'.$start, $val->name);
        $this->excel->getActiveSheet()->setCellValue('C'.$start, $val->description);
        $this->excel->getActiveSheet()->setCellValue('D'.$start, $val->active);
        $this->excel->getActiveSheet()->setCellValue('E'.$start, $val->dibuat);
        $this->excel->getActiveSheet()->setCellValue('F'.$start, $val->tgl_buat);
        $this->excel->getActiveSheet()->setCellValue('G'.$start, $val->diupdate);
        $this->excel->getActiveSheet()->setCellValue('H'.$start, $val->tgl_update);
        $start++;
      }
      $this->excel->getActiveSheet()->getStyle('A'.$awal.':H'.$start)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
    }
  public function saveEmployeeModul()
  {    
    $id_employee       = ($this->input->post('id_employee', TRUE) ? $this->input->post('id_employee', TRUE) : '');
    $id           = ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
    $isactive1    = ($this->input->post('isactive', TRUE) ? $this->input->post('isactive', TRUE) : '');
    if($isactive1 == 'true') { $isactive = 'Y'; } else { $isactive = 'N'; }
    $iscreate1    = ($this->input->post('iscreate', TRUE) ? $this->input->post('iscreate', TRUE) : '');
    if($iscreate1 == 'true') { $iscreate = 'Y'; } else { $iscreate = 'N'; }
    $isupdate1    = ($this->input->post('isupdate', TRUE) ? $this->input->post('isupdate', TRUE) : '');
    if($isupdate1 == 'true') { $isupdate = 'Y'; } else { $isupdate = 'N'; }
    $isdelete1    = ($this->input->post('isdelete', TRUE) ? $this->input->post('isdelete', TRUE) : '');
    if($isdelete1 == 'true') { $isdelete = 'Y'; } else { $isdelete = 'N'; }
    $isprocess1   = ($this->input->post('isprocess', TRUE) ? $this->input->post('isprocess', TRUE) : '');
    if($isprocess1 == 'true') { $isprocess = 'Y'; } else { $isprocess = 'N'; }
    $uuid         = $this->m_employee->getUUID();

    if($id_employee == '' || $id_employee == NULL){
      $success = 1; 
    } else if($id == '' || $id == NULL){ 
      $success = 2; 
    } else if($this->m_employee->cekIDModul($id, $id_employee) == 0){ 
      $this->m_employee->saveEmployeeModul($id, $id_employee, $isactive, $iscreate, $isupdate, $isdelete, $isprocess, $uuid);
      if($this->m_employee->saveConfirmModul($uuid) == 0){ $success = 4; 
      } else { $success = 0; }
    } else { $success = 3; }

      $result = $this->m_employee->getModul($id_employee);
      foreach ($result->result() as $key => $value) {
          $data['data'][] = array(        
            'id'          => $value->id,        
            'id_employee'      => $id_employee,        
            'name'        => $value->name,                          
            'menu'        => $value->menu,                          
            'isactive'    => $value->isactive,        
            'iscreate'    => $value->iscreate,          
            'isupdate'    => $value->isupdate,         
            'isdelete'    => $value->isdelete,          
            'isprocess'   => $value->isprocess
            );
        }

    $data['total'] = $success;
    $data['success'] = TRUE;
    echo json_encode($data); 
  }

  public function delEmployeeModul()
  {
    $id   = ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
    $id_employee   = ($this->input->post('id_employee', TRUE) ? $this->input->post('id_employee', TRUE) : '');

      $this->m_employee->deleteEmployeeModul($id);
      $result = $this->m_employee->getModul($id_employee);

      foreach ($result->result() as $key => $value) {
          $data['data'][] = array(        
            'id'          => $value->id,        
            'id_employee'      => $id_employee,        
            'name'        => $value->name,                          
            'menu'        => $value->menu,                          
            'isactive'    => $value->isactive,        
            'iscreate'    => $value->iscreate,          
            'isupdate'    => $value->isupdate,         
            'isdelete'    => $value->isdelete,          
            'isprocess'   => $value->isprocess
            );
        }
    $data['success'] = TRUE;
    echo json_encode($data);
  }
}
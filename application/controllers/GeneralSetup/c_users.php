<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class C_users extends CI_Controller
{
  public function __construct(){
          parent::__construct();
    $this->load->library('excel');
    $this->load->model('GeneralSetup/m_users');

  }

  public function getUsers()
  {
        $start      = ($this->input->post('start', TRUE) ? $this->input->post('start', TRUE) : 0);
        $limit      = ($this->input->post('limit', TRUE) ? $this->input->post('limit', TRUE) : 20);  
    $result   = $this->m_users->getGridUsers($start,$limit);
    $result1  = $this->m_users->countGridUsers();
    $count    = $result1->num_rows();

    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'            => $value->id,        
        'name'          => $value->name,                
        'value'         => $value->value,                
        'organisasi'    => $value->org,                
        'role'          => $value->role,                
        'id_role'       => $value->id_role,                
        'username'      => $value->username,             
        'firstname'     => $value->firstname,             
        'lastname'      => $value->lastname,             
        'description'   => $value->description,             
        'email'         => $value->email,             
        'phone'         => $value->phone,             
        'isactive'      => $value->isactive, 
        'mobile'        => $value->mobile    
        );
    }
        $data['total']   = $count;
        $data['success'] = true;
        echo json_encode($data);
  }

  public function usersOrg()
  {
    $id       = json_decode($this->input->post('post')); 
    $result   = $this->m_users->viewFormUsers($id);
    if($this->m_users->cekUsersOrg($id) == 0){
        $data['data'][] = array(        
          'id_users'      => $id,        
          'id_org'        => '',        
          'name'          => ''              
          );
    } else {
      foreach ($result->result() as $key => $value) {
        $data['data'][] = array(        
          'id_users'      => $value->id_users,        
          'id_org'        => $value->id_org,        
          'name'          => $value->name              
          );
      }    
  }
        // $data['total']   = $count;
        $data['success'] = true;
        echo json_encode($data);
  }
 
  public function delUsers()
  {
    $data       = json_decode($this->input->post('post'));
    foreach($data as $row){
      $usersorg  = $this->m_users->cekInUsersorg($row->id);

      if(($usersorg) == 0){ 
            $this->m_users->deleteUsers($row->id);
            $data['msg'] = 0;
      } else { $data['msg'] = 1; }
    }

        $start      = ($this->input->post('start', TRUE) ? $this->input->post('start', TRUE) : 0);
        $limit      = ($this->input->post('limit', TRUE) ? $this->input->post('limit', TRUE) : 20);  
    $result = $this->m_users->getGridUsers($start,$limit);
    $result1 = $this->m_users->countGridUsers();
    $count = $result1->num_rows();
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'            => $value->id,        
        'name'          => $value->name,                
        'value'         => $value->value,                
        'organisasi'    => $value->org,                
        'role'          => $value->role,                
        'id_role'       => $value->id_role,                
        'username'      => $value->username,             
        'firstname'     => $value->firstname,             
        'lastname'      => $value->lastname,             
        'description'   => $value->description,             
        'email'         => $value->email,             
        'phone'         => $value->phone,             
        'isactive'      => $value->isactive, 
        'mobile'        => $value->mobile     
        );
    }
        $data['total'] = $count;
        $data['success'] = TRUE;
        echo json_encode($data);
  }

  public function deluserOrg()
  {
    $id_users   = ($this->input->post('id_users', TRUE) ? $this->input->post('id_users', TRUE) : '');
    $id_org   = ($this->input->post('id_org', TRUE) ? $this->input->post('id_org', TRUE) : '');    

      $this->m_users->deleteUserOrg($id_org);
      $result = $this->m_users->viewFormUsers($id_users);
      foreach ($result->result() as $key => $value) {
          $data['data'][] = array(        
              'id_users'      => $value->id_users,        
              'id_org'        => $value->id_org,        
              'name'          => $value->name      
            );
        }
    $data['success'] = TRUE;
    echo json_encode($data);
  }

  public function saveUsers()
  {    
    $name         = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    $firstname    = ($this->input->post('firstname', TRUE) ? $this->input->post('firstname', TRUE) : '');
    $lastname     = ($this->input->post('lastname', TRUE) ? $this->input->post('lastname', TRUE) : '');
    $username     = ($this->input->post('username', TRUE) ? $this->input->post('username', TRUE) : '');
    $password1    = ($this->input->post('password', TRUE) ? $this->input->post('password', TRUE) : '');
    $password     = base64_encode(sha1($password1,TRUE));
    $email        = ($this->input->post('email', TRUE) ? $this->input->post('email', TRUE) : '');
    $phone        = ($this->input->post('phone', TRUE) ? $this->input->post('phone', TRUE) : '');
    $role         = ($this->input->post('role', TRUE) ? $this->input->post('role', TRUE) : '');
    // if($role == null || $role == '') { $role1 = null; } else { $role1   = $this->m_users->cekRole($role); }
    $org          = ($this->input->post('org', TRUE) ? $this->input->post('org', TRUE) : '');
    if($org == null || $org == '') { $Organisasi = null; } else { $Organisasi   = $this->m_users->cekOrganisasi($org); }
    $mobile       = ($this->input->post('mobile', TRUE) ? $this->input->post('mobile', TRUE) : '');
    $isactive1    = ($this->input->post('isactive', TRUE) ? $this->input->post('isactive', TRUE) : '');
    if($isactive1 == TRUE) { $isactive = 'Y'; } else { $isactive = 'N'; }
    $description  = ($this->input->post('description', TRUE) ? $this->input->post('description', TRUE) : '');
    $uuid         = $this->m_users->getUUID();
// var_dump($org);
// exit();
    if($username == '' && $username == NULL){
      $success = 3;
    } else if($this->m_users->cekUser($username) == 0){ 
      $this->m_users->saveUsers($name, $firstname, $lastname, $username, $password, $email, $phone, $mobile, $isactive, $description, $role, $uuid, $Organisasi);
      if($this->m_users->saveConfirm($uuid) == 0){ $success = 0; } else { $success = 1; }
    } else { $success = 2; }
        $data['total'] = $success;
        $data['success'] = TRUE;
        echo json_encode($data); 
  }

  public function saveOrg()
  {    
    $id_users     = ($this->input->post('id_users', TRUE) ? $this->input->post('id_users', TRUE) : '');
    $org          = ($this->input->post('value', TRUE) ? $this->input->post('value', TRUE) : '');
    if($org == null || $org == '') { $Organisasi = null; } else { $Organisasi   = $this->m_users->cekOrganisasi($org); }
    $uuid         = $this->m_users->getUUID();

    if($id_users == '' && $id_users == NULL){ $success = 2;
    } else if($Organisasi == null){ $success = 3;
    } else if($this->m_users->cekUserOrganisasi($Organisasi, $id_users) == 0){ 
      $this->m_users->saveUsersOrg($id_users, $Organisasi, $uuid);
      if($this->m_users->saveConfirmUserOrg($uuid) == 0){ $success = 0; } else { $success = 1; }
    } else { $success = 4; }
        $data['total'] = $success;
        $data['success'] = TRUE;
        echo json_encode($data); 
  }

  public function editUsers()
  {
    $id           = ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
    $name         = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    $firstname    = ($this->input->post('firstname', TRUE) ? $this->input->post('firstname', TRUE) : '');
    $lastname     = ($this->input->post('lastname', TRUE) ? $this->input->post('lastname', TRUE) : '');
    $username     = ($this->input->post('username', TRUE) ? $this->input->post('username', TRUE) : '');
    $email        = ($this->input->post('email', TRUE) ? $this->input->post('email', TRUE) : '');
    $phone        = ($this->input->post('phone', TRUE) ? $this->input->post('phone', TRUE) : '');
    $mobile       = ($this->input->post('mobile', TRUE) ? $this->input->post('mobile', TRUE) : '');
    $role         = ($this->input->post('role', TRUE) ? $this->input->post('role', TRUE) : '');
    // if($role == null || $role == '') { $role1 = null; } else { $role1   = $this->m_users->cekRole($role); }
    $org          = ($this->input->post('org', TRUE) ? $this->input->post('org', TRUE) : '');
    if($org == null || $org == '') { $Organisasi = null; } else { $Organisasi   = $this->m_users->cekOrganisasi($org); }
    if($this->input->post('isactive') == 'true') { $isactive = 'Y'; } else { $isactive = 'N'; }
    $description  = ($this->input->post('description', TRUE) ? $this->input->post('description', TRUE) : '');
// var_dump($org);
// exit();
    if($username == '' && $username == NULL){ $success = 3;
    } else if($this->m_users->cekUserID($username, $id) == 0){ 
      $this->m_users->updateUsers($name, $firstname, $lastname, $username, $email, $phone, $mobile, $isactive, $description, $role, $Organisasi, $id);
      $success = 1;
    } else { $success = 2; }
        $data['total'] = $success;
        $data['success'] = TRUE;
        echo json_encode($data); 
  }

  public function editPswd()
  {
    $oldpswd    = ($this->input->post('oldpswd', TRUE) ? $this->input->post('oldpswd', TRUE) : '');
    $newpswd    = ($this->input->post('newpswd', TRUE) ? $this->input->post('newpswd', TRUE) : '');
    $konfpswd   = ($this->input->post('konfpswd', TRUE) ? $this->input->post('konfpswd', TRUE) : '');
    $oldpswd1   = base64_encode(sha1($oldpswd, TRUE));
    $newpswd1   = base64_encode(sha1($newpswd, TRUE));
    $konfpswd1  = base64_encode(sha1($konfpswd, TRUE));
    if($this->m_users->cekPswd() != $oldpswd1){ $success = 1;
    } else if($newpswd != $konfpswd) { 
      $success = 2;
    } else {
      $this->m_users->updatePswd($newpswd1);
      $success = 0;
    }
        $data['total'] = $success;
        $data['success'] = TRUE;
        echo json_encode($data); 
  }

  public function searchUsers()
  {
    $username     = ($this->input->post('username', TRUE) ? $this->input->post('username', TRUE) : '');
    $result = $this->m_users->searchGridUsers($username);
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'            => $value->id,        
        'name'          => $value->name,                
        'value'         => $value->value,                
        'organisasi'    => $value->org,                
        'role'          => $value->role,                
        'id_role'       => $value->id_role,                
        'username'      => $value->username,             
        'firstname'     => $value->firstname,             
        'lastname'      => $value->lastname,             
        'description'   => $value->description,             
        'email'         => $value->email,             
        'phone'         => $value->phone,             
        'isactive'      => $value->isactive, 
        'mobile'        => $value->mobile          
        );
    }
        $data['success'] = TRUE;
        echo json_encode($data);
  }

  public function printUsers()
  { 
    $result = $this->m_users->printUsers();
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
      $this->excel->getActiveSheet()->setCellValue('A1', 'DATA USERS');
      $this->excel->getActiveSheet()->mergeCells('A1:N1');
      $this->excel->getActiveSheet()->setCellValue('A3', 'No');
      $this->excel->getActiveSheet()->setCellValue('B3', 'Nama');
      $this->excel->getActiveSheet()->setCellValue('C3', 'Nama Depan');
      $this->excel->getActiveSheet()->setCellValue('D3', 'Nama Belakang');
      $this->excel->getActiveSheet()->setCellValue('E3', 'Username');
      $this->excel->getActiveSheet()->setCellValue('F3', 'Role');
      $this->excel->getActiveSheet()->setCellValue('G3', 'Phone');
      $this->excel->getActiveSheet()->setCellValue('H3', 'NO Handphone');
      $this->excel->getActiveSheet()->setCellValue('I3', 'Email');
      $this->excel->getActiveSheet()->setCellValue('J3', 'Keterangan');
      $this->excel->getActiveSheet()->setCellValue('K3', 'Organisasi');
      $this->excel->getActiveSheet()->setCellValue('L3', 'Is Active');
      $this->excel->getActiveSheet()->setCellValue('M3', 'Dibuat Oleh');
      $this->excel->getActiveSheet()->setCellValue('N3', 'Dibuat Tanggal');
      $this->excel->getActiveSheet()->setCellValue('O3', 'Diupdate Oleh');
      $this->excel->getActiveSheet()->setCellValue('P3', 'Diupdate Tanggal');
      $awal = 4;
      $start  = $awal;
      /**
       * End of Header Laporan
       **/
      foreach($data as $key => $val){     
        $this->excel->getActiveSheet()->setCellValue('A'.$start, $key + 1);
        $this->excel->getActiveSheet()->setCellValue('B'.$start, $val->name);
        $this->excel->getActiveSheet()->setCellValue('C'.$start, $val->firstname);
        $this->excel->getActiveSheet()->setCellValue('D'.$start, $val->lastname);
        $this->excel->getActiveSheet()->setCellValue('E'.$start, $val->username);
        $this->excel->getActiveSheet()->setCellValue('F'.$start, $val->role);
        $this->excel->getActiveSheet()->setCellValue('G'.$start, $val->phone);
        $this->excel->getActiveSheet()->setCellValue('H'.$start, $val->mobile);
        $this->excel->getActiveSheet()->setCellValue('I'.$start, $val->email);
        $this->excel->getActiveSheet()->setCellValue('J'.$start, $val->description);
        $this->excel->getActiveSheet()->setCellValue('K'.$start, $val->org);
        $this->excel->getActiveSheet()->setCellValue('L'.$start, $val->active);
        $this->excel->getActiveSheet()->setCellValue('M'.$start, $val->dibuat);
        $this->excel->getActiveSheet()->setCellValue('N'.$start, $val->tgl_buat);
        $this->excel->getActiveSheet()->setCellValue('O'.$start, $val->diupdate);
        $this->excel->getActiveSheet()->setCellValue('O'.$start, $val->tgl_update);
        $start++;
      }
      $this->excel->getActiveSheet()->getStyle('A'.$awal.':O'.$start)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
    }
}
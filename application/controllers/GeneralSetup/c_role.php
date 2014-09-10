<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class C_role extends CI_Controller
{
  public function __construct(){
          parent::__construct();
    $this->load->library('excel');
    $this->load->model('GeneralSetup/m_role');

  }

  public function getRole()
  {
        $start      = ($this->input->post('start', TRUE) ? $this->input->post('start', TRUE) : 0);
        $limit      = ($this->input->post('limit', TRUE) ? $this->input->post('limit', TRUE) : 20);  
    $result = $this->m_role->getGridRole($start,$limit);
    $result1 = $this->m_role->countGridRole();
    $count = $result1->num_rows();
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'          => $value->id,        
        'name'        => $value->name,                            
        'isactive'    => $value->isactive,             
        'description' => $value->description                
        );
    }
        $data['total'] = $count;
        $data['success'] = true;
        echo json_encode($data);
  }

  public function getMenu(){
    $id       = json_decode($this->input->post('post'));
    $result = $this->m_role->getMenu($id);
    if($this->m_role->cekRoleMenu($id) == 0){
      $data['data'][] = array(        
        'id'          => '',        
        'idrole'      => $id,        
        'name'        => '',                         
        'menu'        => '',                          
        'isactive'    => '',        
        'iscreate'    => '',         
        'isupdate'    => '',        
        'isdelete'    => '',         
        'isprocess'   => ''         
        );
    } else {
      foreach ($result->result() as $key => $value) {
          $data['data'][] = array(        
            'id'          => $value->id,        
            'idrole'      => $id,        
            'name'        => $value->name,                          
            'menu'        => $value->menu,                          
            'isactive'    => $value->isactive,        
            'iscreate'    => $value->iscreate,          
            'isupdate'    => $value->isupdate,         
            'isdelete'    => $value->isdelete,          
            'isprocess'   => $value->isprocess          
            );
        }
    }
        $data['success'] = TRUE;
        echo json_encode($data);
  }


  public function viewMenu()
  {
    $result = $this->m_role->getViewGroup();
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'          => $value->id,        
        'name'        => $value->name                
        );
    }
        echo json_encode($data);
  }

  public function delRole()
  {
    $data       = json_decode($this->input->post('post'));
    foreach($data as $row){
      if($this->m_role->cekRoleMenu($row->id) == 0  && $this->m_role->cekRoleUser($row->id) == 0)
      {
        $this->m_role->deleteMenu($row->id);
        $data['msg'] = 0;
      }
      else{
        $data['msg'] = 1;
      }
    }
        $start      = ($this->input->post('start', TRUE) ? $this->input->post('start', TRUE) : 0);
        $limit      = ($this->input->post('limit', TRUE) ? $this->input->post('limit', TRUE) : 20);  
    $result = $this->m_role->getGridRole($start,$limit);
    $result1 = $this->m_role->countGridRole();
    $count = $result1->num_rows();
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'          => $value->id,        
        'name'        => $value->name,                            
        'isactive'    => $value->isactive,             
        'description' => $value->description                
        );
    }
        echo json_encode($data);
  }

  public function saveRole()
  {    
    $name         = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    $isactive1    = ($this->input->post('isactive', TRUE) ? $this->input->post('isactive', TRUE) : '');
    if($isactive1 == TRUE) { $isactive = 'Y'; } else { $isactive = 'N'; }
    $description  = ($this->input->post('description', TRUE) ? $this->input->post('description', TRUE) : '');
    $uuid         = $this->m_role->getUUID();

    if($name == '' && $name == NULL){
      $success = 3;
    } else if($this->m_role->cekRole($name) == 0){ 
      $this->m_role->saveRole($name, $isactive, $description, $uuid);
      if($this->m_role->saveConfirm($uuid) == 0){ $success = 0; } else { $success = 1; }
    } else { $success = 2; }
        $data['total'] = $success;
        $data['success'] = TRUE;
        echo json_encode($data); 
  }

  public function editRole()
  {
    $id           = ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
    $name         = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    if($this->input->post('isactive') == 'true') { $isactive = 'Y'; } else { $isactive = 'N'; }
    $description  = ($this->input->post('description', TRUE) ? $this->input->post('description', TRUE) : '');
// var_dump($id, $name);
    if($name == '' && $name == NULL){ $success = 3;
    } else if($this->m_role->cekRoleID($name, $id) == 0){ 
      $this->m_role->updateRole($name, $isactive, $description, $id);
      $success = 1;
    } else { $success = 2; }
        $data['total'] = $success;
        $data['success'] = TRUE;
        echo json_encode($data); 
  }

  public function searchRole()
  {
    $name     = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    $result = $this->m_role->searchGridRole($name);
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'          => $value->id,        
        'name'        => $value->name,                           
        'isactive'    => $value->isactive,             
        'description' => $value->description     
        );
    }
        $data['success'] = TRUE;
        echo json_encode($data);
  }

  public function viewRole()
  {
    $result = $this->m_role->viewRole();
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id_role'     => $value->id,        
        'name'        => $value->id.' - '.$value->name,                           
        );
    }
        $data['success'] = TRUE;
        echo json_encode($data);
  }

  public function printRole()
  { 
    $result = $this->m_role->printRole();
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
  public function saveRoleMenu()
  {    
    $idrole       = ($this->input->post('idrole', TRUE) ? $this->input->post('idrole', TRUE) : '');
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
    $uuid         = $this->m_role->getUUID();

    if($idrole == '' || $idrole == NULL){
      $success = 1; 
    } else if($id == '' || $id == NULL){ 
      $success = 2; 
    } else if($this->m_role->cekIDMenu($id, $idrole) == 0){ 
      $this->m_role->saveRoleMenu($id, $idrole, $isactive, $iscreate, $isupdate, $isdelete, $isprocess, $uuid);
      if($this->m_role->saveConfirmMenu($uuid) == 0){ $success = 4; 
      } else { $success = 0; }
    } else { $success = 3; }

      $result = $this->m_role->getMenu($idrole);
      foreach ($result->result() as $key => $value) {
          $data['data'][] = array(        
            'id'          => $value->id,        
            'idrole'      => $idrole,        
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

  public function delRoleMenu()
  {
    $id   = ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
    $idrole   = ($this->input->post('idrole', TRUE) ? $this->input->post('idrole', TRUE) : '');

      $this->m_role->deleteRoleMenu($id);
      $result = $this->m_role->getMenu($idrole);

      foreach ($result->result() as $key => $value) {
          $data['data'][] = array(        
            'id'          => $value->id,        
            'idrole'      => $idrole,        
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
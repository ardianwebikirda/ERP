<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class C_menu extends CI_Controller
{
  public function __construct(){
          parent::__construct();
    $this->load->library('excel');
    $this->load->model('GeneralSetup/m_menu');

  }

  public function getMenu()
  {
        $start      = ($this->input->post('start', TRUE) ? $this->input->post('start', TRUE) : 0);
        $limit      = ($this->input->post('limit', TRUE) ? $this->input->post('limit', TRUE) : 20);  
//         var_dump($start);
// var_dump('-');
// var_dump($limit);
// exit();
    $result = $this->m_menu->getGridMenu($start,$limit);
    $result1 = $this->m_menu->countGridMenu();
    $count = $result1->num_rows();
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'          => $value->id,        
        'name'        => $value->name,                
        'parent'      => $value->parent,             
        'id_menu'     => $value->parent,             
        'icon'        => $value->icon,             
        'isactive'    => $value->isactive,             
        'description' => $value->description                
        );
    }
        $data['total'] = $count;
        $data['success'] = true;
        echo json_encode($data);
  }

  public function viewMenu()
  {
    $result = $this->m_menu->getViewMenu();
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id_menu'     => $value->id,        
        'name'        => $value->id.' '.$value->name                
        );
    }
        echo json_encode($data);
  }

  public function viewAllMenu()
  {
    $result = $this->m_menu->getViewAllMenu();
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id_menu'     => $value->id,        
        'name'        => $value->id.' '.$value->name                
        );
    }
        echo json_encode($data);
  }

  public function delMenu()
  {
    $data       = json_decode($this->input->post('post'));
    foreach($data as $row){
      //cek parent
      if($this->m_menu->cekParent($row->id) == 0){
        if($this->m_menu->cekAnak($row->id) == 0){
          if($this->m_menu->cekRoleMenu($row->id) == 0){
            $this->m_menu->deleteMenu($row->id);
            $data['msg'] = 0;
          } else { $data['msg'] = 1; }
        } else { $data['msg'] = 2; }
      } else {
        if($this->m_menu->cekRoleMenu($row->id) == 0){
          $this->m_menu->deleteMenu($row->id);
          $data['msg'] = 0;
        } else { $data['msg'] = 1; }        
      }
    }
        $start      = ($this->input->post('start', TRUE) ? $this->input->post('start', TRUE) : 0);
        $limit      = ($this->input->post('limit', TRUE) ? $this->input->post('limit', TRUE) : 20);  
    $result = $this->m_menu->getGridMenu($start,$limit);
    $result1 = $this->m_menu->countGridMenu();
    $count = $result1->num_rows();
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'          => $value->id,        
        'name'        => $value->name,                
        'parent'      => $value->parent,             
        'icon'        => $value->icon,             
        'isactive'    => $value->isactive,             
        'description' => $value->description          
        );
    }
        $data['total'] = $count;
        $data['success'] = true;
        echo json_encode($data);
  }

  public function saveMenu()
  {    
    $id           = ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
    $name         = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    $parent1      = ($this->input->post('parent', TRUE) ? $this->input->post('parent', TRUE) : '');
    if($parent1 == NULL || $parent1 == '') { $parent = 0; } else { $parent = $parent1; }  
    $icon         = ($this->input->post('icon', TRUE) ? $this->input->post('icon', TRUE) : '');
    $isactive1    = ($this->input->post('isactive', TRUE) ? $this->input->post('isactive', TRUE) : '');
    if($isactive1 == TRUE) { $isactive = 'Y'; } else { $isactive = 'N'; }
    $description  = ($this->input->post('description', TRUE) ? $this->input->post('description', TRUE) : '');

    $menu_sama  = $this->m_menu->cekMenu($name);
    $id_sama    = $this->m_menu->saveConfirm($id);
    if($id == '' || $id == NULL){ $success = 1;
    } else if($name == '' || $name == NULL){ $success = 2;
    } else if(($menu_sama+$id_sama) == 0){ 
      $this->m_menu->saveMenu($id, $name, $parent, $icon, $isactive, $description);
      if($this->m_menu->saveConfirm($id) == 0){ $success = 3; } else { $success = 0; }
    } else { $success = 4; }
        $data['total'] = $success;
        $data['success'] = TRUE;
        echo json_encode($data); 
  }

  public function editMenu()
  {
    $id           = ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
    $name         = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    $parent1      = ($this->input->post('parent', TRUE) ? $this->input->post('parent', TRUE) : '');
    if($parent1 == NULL || $parent1 == '') { $parent = 0; } else { $parent = $parent1; }  
    $icon         = ($this->input->post('icon', TRUE) ? $this->input->post('icon', TRUE) : '');
    $isactive1    = ($this->input->post('isactive', TRUE) ? $this->input->post('isactive', TRUE) : '');
    if($isactive1 == 'true') { $isactive = 'Y'; } else { $isactive = 'N'; }
    $description  = ($this->input->post('description', TRUE) ? $this->input->post('description', TRUE) : '');
    // var_dump($parent);
    // exit();
    if($name == '' || $name == NULL){ $success = 1;
    } else if($this->m_menu->cekMenuID($name, $id) == 0){ 
      $this->m_menu->updateMenu($id, $name, $parent, $icon, $isactive, $description);
      $success = 0;
    } else { $success = 2; }
        $data['total'] = $success;
        $data['success'] = TRUE;
        echo json_encode($data); 
  }

  public function searchMenu()
  {
    $username     = ($this->input->post('username', TRUE) ? $this->input->post('username', TRUE) : '');
    $result = $this->m_menu->searchGridMenu($username);
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'          => $value->id,        
        'name'        => $value->name,                
        'parent'      => $value->parent,             
        'icon'        => $value->icon,             
        'isactive'    => $value->isactive,             
        'description' => $value->description     
        );
    }
        $data['success'] = TRUE;
        echo json_encode($data);
  }

  public function printMenu()
  { 
    $result = $this->m_menu->printMenu();
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
      $this->excel->getActiveSheet()->setCellValue('A1', 'DATA MENU APLIKASI');
      $this->excel->getActiveSheet()->mergeCells('A1:N1');
      $this->excel->getActiveSheet()->setCellValue('A3', 'No');
      $this->excel->getActiveSheet()->setCellValue('B3', 'ID');
      $this->excel->getActiveSheet()->setCellValue('C3', 'Nama');
      $this->excel->getActiveSheet()->setCellValue('D3', 'Parent');
      $this->excel->getActiveSheet()->setCellValue('E3', 'Icon');
      $this->excel->getActiveSheet()->setCellValue('F3', 'Keterangan');
      $this->excel->getActiveSheet()->setCellValue('G3', 'Is Active');
      $this->excel->getActiveSheet()->setCellValue('H3', 'Dibuat Oleh');
      $this->excel->getActiveSheet()->setCellValue('I3', 'Dibuat Tanggal');
      $this->excel->getActiveSheet()->setCellValue('J3', 'Diupdate Oleh');
      $this->excel->getActiveSheet()->setCellValue('K3', 'Diupdate Tanggal');
      $awal = 4;
      $start  = $awal;
      /**
       * End of Header Laporan
       **/
      foreach($data as $key => $val){     
        $this->excel->getActiveSheet()->setCellValue('A'.$start, $key + 1);
        $this->excel->getActiveSheet()->setCellValue('B'.$start, $val->id);
        $this->excel->getActiveSheet()->setCellValue('C'.$start, $val->name);
        $this->excel->getActiveSheet()->setCellValue('D'.$start, $val->parent);
        $this->excel->getActiveSheet()->setCellValue('E'.$start, $val->icon);
        $this->excel->getActiveSheet()->setCellValue('F'.$start, $val->description);
        $this->excel->getActiveSheet()->setCellValue('G'.$start, $val->active);
        $this->excel->getActiveSheet()->setCellValue('H'.$start, $val->dibuat);
        $this->excel->getActiveSheet()->setCellValue('I'.$start, $val->tgl_buat);
        $this->excel->getActiveSheet()->setCellValue('J'.$start, $val->diupdate);
        $this->excel->getActiveSheet()->setCellValue('K'.$start, $val->tgl_update);
        $start++;
      }
      $this->excel->getActiveSheet()->getStyle('A'.$awal.':K'.$start)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
    }

}
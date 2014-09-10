<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class C_organisasi extends CI_Controller
{
  public function __construct(){
          parent::__construct();
    $this->load->library('excel');
    $this->load->model('GeneralSetup/m_organisasi');

  }

  public function getOrganisasi()
  {
        $start      = ($this->input->post('start', TRUE) ? $this->input->post('start', TRUE) : 0);
        $limit      = ($this->input->post('limit', TRUE) ? $this->input->post('limit', TRUE) : 20);  
    $result = $this->m_organisasi->getGridOrganisasi($start,$limit);
    $result1 = $this->m_organisasi->countGridOrganisasi();
    $count = $result1->num_rows();
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'          => $value->id,        
        'value'       => $value->value,        
        'value_asli'  => substr($value->value,-(strlen($value->value)-strlen($value->parent))),        
        'name'        => $value->name,                
        'parent'      => $value->parent,             
        'isactive'    => $value->isactive,             
        'description' => $value->description                
        );
    }
        $data['total'] = $count;
        $data['success'] = true;
        echo json_encode($data);
  }

  public function viewOrganisasi()
  {
    $result = $this->m_organisasi->getViewOrganisasi();
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'value'        => $value->value,                
        'name'        => $value->value.' - '.$value->name                
        );
    }
        echo json_encode($data);
  }

  public function delOrganisasi()
  {
    $data       = json_decode($this->input->post('post'));
    foreach($data as $row){
      $anak      = $this->m_organisasi->cekAnak($this->m_organisasi->cekValueOld($row->id));
      $users     = $this->m_organisasi->cekInUsers($row->id);
      $usersorg  = $this->m_organisasi->cekInUsersorg($row->id);

      if(($anak+$users+$usersorg) == 0){
            $this->m_organisasi->deleteOrganisasi($row->id);
            $data['msg'] = 0;
      } else { $data['msg'] = 1; }
    }
        $start      = ($this->input->post('start', TRUE) ? $this->input->post('start', TRUE) : 0);
        $limit      = ($this->input->post('limit', TRUE) ? $this->input->post('limit', TRUE) : 20);  
    $result = $this->m_organisasi->getGridOrganisasi($start,$limit);
    $result1 = $this->m_organisasi->countGridOrganisasi();
    $count = $result1->num_rows();
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'          => $value->id,        
        'value'       => $value->value,        
        'value_asli'  => substr($value->value,-(strlen($value->value)-strlen($value->parent))),        
        'name'        => $value->name,                
        'parent'      => $value->parent,             
        'isactive'    => $value->isactive,             
        'description' => $value->description                
        );
    }
        $data['total'] = $count;
        $data['success'] = true;
        echo json_encode($data);
  }

  public function saveOrganisasi()
  {    
    $value        = ($this->input->post('value', TRUE) ? $this->input->post('value', TRUE) : '');
    $name         = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    $parent       = ($this->input->post('parent', TRUE) ? $this->input->post('parent', TRUE) : '');
    $value1       = $parent.$value;
    $isactive1    = ($this->input->post('isactive', TRUE) ? $this->input->post('isactive', TRUE) : '');
    if($isactive1 == TRUE) { $isactive = 'Y'; } else { $isactive = 'N'; }
    $description  = ($this->input->post('description', TRUE) ? $this->input->post('description', TRUE) : '');
    $uuid         = $this->m_organisasi->getUUID();

    if($value == '' || $value == NULL){ $success = 1;
    } else if($name == '' || $name == NULL){ $success = 2;
    } else if($parent == '' || $parent == NULL){ $success = 3;
    } else if($this->m_organisasi->cekOrganisasi($name) == 0 && $this->m_organisasi->saveConfirm($value1) == 0){ 
      $this->m_organisasi->saveOrganisasi($value1, $name, $parent, $isactive, $description, $uuid);
      if($this->m_organisasi->saveConfirm($value1) == 0){ $success = 4; } else { $success = 0; }
    } else { $success = 5; }
        $data['total'] = $success;
        $data['success'] = TRUE;
        echo json_encode($data); 
  }

  public function editOrganisasi()
  {
    $id           = ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
    $name         = ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    $value        = ($this->input->post('value', TRUE) ? $this->input->post('value', TRUE) : '');
    $parent       = ($this->input->post('parent', TRUE) ? $this->input->post('parent', TRUE) : '');
    $value1       = $parent.$value;
    $isactive1    = ($this->input->post('isactive', TRUE) ? $this->input->post('isactive', TRUE) : '');
    if($isactive1 == 'true') { $isactive = 'Y'; } else { $isactive = 'N'; }
    $description  = ($this->input->post('description', TRUE) ? $this->input->post('description', TRUE) : '');

    if($value == '' || $value == NULL){ $success = 1;
    } else if($name == '' || $name == NULL){ $success = 2;
    } else if($parent == '' || $parent == NULL){ $success = 3;   
    } else if($this->m_organisasi->cekDoubleID($value1, $id) > 0){ $success = 4; 
    } else if($this->m_organisasi->cekOrganisasiID($name, $id) == 0){ 
      $this->m_organisasi->updateOrganisasi($id, $value1, $name, $parent, $isactive, $description);
      $success = 0;
    } else { $success = 5; }
        $data['total'] = $success;
        $data['success'] = TRUE;
        echo json_encode($data); 
  }

  public function searchOrganisasi()
  {
    $username     = ($this->input->post('username', TRUE) ? $this->input->post('username', TRUE) : '');
    $result = $this->m_organisasi->searchGridorganisasi($username);
    foreach ($result->result() as $key => $value) {
      $data['data'][] = array(        
        'id'          => $value->id,        
        'value'       => $value->value,        
        'value_asli'  => substr($value->value,-(strlen($value->value)-strlen($value->parent))),        
        'name'        => $value->name,                
        'parent'      => $value->parent,             
        'isactive'    => $value->isactive,             
        'description' => $value->description     
        );
    }
        $data['success'] = TRUE;
        echo json_encode($data);
  }

  public function printOrganisasi()
  { 
    $result = $this->m_organisasi->printOrganisasi();
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
      $this->excel->getActiveSheet()->setCellValue('A1', 'DATA MODUL APLIKASI');
      $this->excel->getActiveSheet()->mergeCells('A1:N1');
      $this->excel->getActiveSheet()->setCellValue('A3', 'No');
      $this->excel->getActiveSheet()->setCellValue('B3', 'ID');
      $this->excel->getActiveSheet()->setCellValue('C3', 'Nama');
      $this->excel->getActiveSheet()->setCellValue('D3', 'Parent');
      $this->excel->getActiveSheet()->setCellValue('E3', 'Keterangan');
      $this->excel->getActiveSheet()->setCellValue('F3', 'Is Active');
      $this->excel->getActiveSheet()->setCellValue('G3', 'Dibuat Oleh');
      $this->excel->getActiveSheet()->setCellValue('G3', 'Dibuat Tanggal');
      $this->excel->getActiveSheet()->setCellValue('I3', 'Diupdate Oleh');
      $this->excel->getActiveSheet()->setCellValue('J3', 'Diupdate Tanggal');
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
        $this->excel->getActiveSheet()->setCellValue('E'.$start, $val->description);
        $this->excel->getActiveSheet()->setCellValue('F'.$start, $val->active);
        $this->excel->getActiveSheet()->setCellValue('G'.$start, $val->dibuat);
        $this->excel->getActiveSheet()->setCellValue('H'.$start, $val->tgl_buat);
        $this->excel->getActiveSheet()->setCellValue('I'.$start, $val->diupdate);
        $this->excel->getActiveSheet()->setCellValue('J'.$start, $val->tgl_update);
        $start++;
      }
      $this->excel->getActiveSheet()->getStyle('A'.$awal.':J'.$start)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
    }

}
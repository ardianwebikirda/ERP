<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/* 
 * 	Author		: Muhammad Surya Ihsanuddin
 * 	Email		: mutofiyah@gmail.com
 * 	FB			: http://facebook.com/AdenKejawen
 * 	Since		: Version 1.X
 * 	Copyright	: 2012@VinotiLivingGroup
 * 
 * 	This code is part of Vinoti Living Group report management tool
 *  
 * 	Dilarang merubah apapun tanpa sepengetahuan author
 */
require_once APPPATH.'third_party/tcpdf/tcpdf'.EXT;
class Pdf extends TCPDF{
    private $nama;
    private $judulLaporan;
    
    public function __construct(array $params = array()) {
        if (! isset($params['orientation'])) {
            $params['orientation'] = 'P';
        }
        if (! isset($params['unit'])) {
            $params['unit'] = 'mm';
        }
        if (! isset($params['format'])) {
            $params['format'] = 'A4';
        }
        if (! isset($params['unicode'])) {
            $params['unicode'] = TRUE;
        }
        if (! isset($params['encoding'])) {
            $params['encoding'] = 'UTF-8';
        }
        if (! isset($params['diskcache'])) {
            $params['diskcache'] = FALSE;
        }
        if (! isset($params['pdfa'])) {
            $params['pdfa'] = FALSE;
        }
        parent::__construct(
            $params['orientation'],
            $params['unit'],
            $params['format'],
            $params['unicode'],
            $params['encoding'],
            $params['diskcache'],
            $params['pdfa']
        );
    }
    
    public function setNama($nama){
        $this->nama     = $nama;
    }
    
    public function setJudulLaporan($judulLaporan){
        $this->judulLaporan    = $judulLaporan;
    }
    
    public function Header($name = 'vinoti'){
        
    }
    
    public function Footer(){
        $this->SetY(-15);
        $this->SetFont('Arial', '', 7);
        $this->Cell(0, 10, 'Pages '.$this->getAliasNumPage().'/'.$this->getAliasNbPages(), 0, FALSE, 'C', 0, '', 0, FALSE, 'T', 'M');
    }
}
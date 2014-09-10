<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/* 
 *  Author : Muhammad Surya Ihsanuddin
 *  Vinoti Living Group
 */
require_once APPPATH.'third_party/PHPExcel'.EXT;
class Excel extends PHPExcel{
    public function __construct() {
        parent::__construct();
    }

    public function getReader($type = 'CSV')
    {
    	return PHPExcel_IOFactory::createReader($type);
    }
}
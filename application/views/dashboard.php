<!DOCTYPE html>
<html>
<head>
<title>.:: Enterprise Resource Planning for Hospital ::.</title>
<link rel="shortcut icon" href="<?php echo base_url('assets/favicon.gif') ?>"> 
<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/extjs/resources/css/ext-all.css'); ?>">
<!-- <link rel="stylesheet" type="text/css" href="<?php //echo base_url('assets/css/screen.css'); ?>"> -->
<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/style.css'); ?>">
<script type="text/javascript" src="<?php echo base_url('assets/extjs/ext-all-debug.js'); ?>"></script>
<script type="text/javascript">
 	var BASE_URL    = '<?php echo base_url(); ?>';
   	var ROOTDIR     = 'assets/';
	var USERNAME    = "<?php echo $this->session->userdata('username'); ?>";
	var ID    		= "<?php echo $this->session->userdata('id'); ?>";
	<?php echo $previlege; ?>;
</script>
</head>
<body>
	<script type="text/javascript" src="<?php echo base_url('assets/app/app.js'); ?>"></script>
</body>
</html>
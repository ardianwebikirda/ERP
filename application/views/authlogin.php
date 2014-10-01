<!DOCTYPE html>
<html lang="en">
    <head>
		<meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
		<meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <title>.:: Enterprise Resource Planning for Hospital ::.</title>
        <meta name="description" content="Custom Login Form Styling with CSS3" />
        <meta name="keywords" content="css3, login, form, custom, input, submit, button, html5, placeholder" />
        <meta name="author" content="Codrops" />
        <link rel="shortcut icon" href="<?php echo base_url('assets/favicon.gif') ?>"> 
        <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/auth/css/login_style.css') ?> "/>
        <!--link rel="stylesheet" type="text/css" href="<?php //echo base_url('assets/lib/css/bootstrap.css') ?> "/>
        <link rel="stylesheet" type="text/css" href="<?php //echo base_url('assets/lib/css/bootstrap-theme.css') ?> "/-->
		<script type="text/javascript" src="<?php echo base_url('assets/js/modernizr.custom.63321.js') ?>"></script>
		<!--script type="text/javascript" src="<?php //echo base_url('assets/lib/js/bootstrap.js') ?>"></script-->
		<!--[if lte IE 7]><style>.main{display:none;} .support-note .note-ie{display:block;}</style><![endif]-->
    </head>
    <body>
        <div class="container">
		<header>
				<h1><strong>.:: VINOTI LIVING GROUP ::.</strong></h1>
				<h2><b>Human Resource Information System</b></h2>
		</header>
			<section class="main">
			   <?php echo validation_errors(); ?>
   				<?php echo form_open('main/validasi_credential', array('class' => 'form-1')); ?>
					<p class="field">
						<input type="text" name="username" placeholder="Username or Account">
						<i class="icon-user icon-large"></i>
					</p>
					<p class="field">
						<input type="password" name="password" placeholder="Password">
						<i class="icon-lock icon-large"></i>
					</p>
					<p class="submit">
						<button type="submit" name="submit"><i class="icon-arrow-right icon-large"></i></button>
					</p>
				</form>
			</section>
			<?php $gambar = array('src'=>'assets/auth/img/hrd@vinoti-living.co.id.gif', 'width'=>'200'); ?>
			<center><?php echo img($gambar); ?></center>
        </div>
    </body>
</html>
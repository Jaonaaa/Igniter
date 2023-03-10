<?php
defined('BASEPATH') or exit('No direct script access allowed');
$this->load->helper("url"); ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login</title>
  <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/Login.css" />
  <link rel="stylesheet" href="<?php echo base_url(); ?>assets/font/fontawesome-5/css/all.min.css" />
  <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/PopUp.css" />
</head>

<body>
  <div class="circle-bg"></div>
  <style>
    @font-face {
      font-family: Poppins;
      src: url("<?php echo base_url(); ?>assets/font/Poppins/Poppins-Light.ttf");
    }

    @font-face {
      font-family: Dancing;
      src: url("<?php echo base_url(); ?>assets/font/DancingScript-Regular.ttf");
    }


    .left-block {

      background-image: url(<?php echo base_url();
      ?>assets/img/admin/6.png);

    }
  </style>
  <div id="root">
    <div class="container">
      <div class="left-block">
        <div id="slogan">
          Experience the power of exchange <br> Trade smarter , live better
        </div>
      </div>
      <div class="right-block" id="right">
        <div id="first-glass"></div>
        <div id="second-glass"></div>
      </div>
    </div>
  </div>
</body>
<script>
  var base_url = "<?php echo base_url(); ?>";
  var wrongUsername = "<?php echo $this->session->userdata('wrongEmail') ?>";
</script>
<script src="<?php echo base_url(); ?>assets/js/PopUp.js"></script>
<script src="<?php echo base_url(); ?>assets/js/Circle.js"></script>
<script src="<?php echo base_url(); ?>assets/js/Utilities.js"></script>
<script src="<?php echo base_url(); ?>assets/js/Login.js"></script>
<?php if (isset($_GET['inscrit'])) { ?>
  <script>
    createSidePopUp("Successful registration", "good");
  </script>
<?php } ?>
<?php if (isset($_GET['error'])) { ?>
  <script>
    createSidePopUp("Wrong password or email", "error");
  </script>
<?php } ?>

</html>
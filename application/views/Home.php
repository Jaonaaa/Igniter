<?php 
$this->load->view('Header');
$email = $this->session->userdata('login'); 
?>

  <body>

  <div id="logo-page">
      <img src="<?php echo base_url();?>assets/img/logo/logo.png" alt="logo " />
    </div>
    <div id="root" style="font-size:3rem;justify-content:center;display:flex;align-items:center;height:30rem;">
     Tongasoa 
    </div>

<?php 
    $this->load->view('Footer');
?>  
  </body>

</html>

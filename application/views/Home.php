<?php 
$this->load->view('Header');
$email = $this->session->userdata('login'); 
?>

  <body>

  <div id="logo-page">
      <img src="<?php echo base_url();?>assets/img/logo/logo.png" alt="logo " />
    </div>
    <div id="navbar-top">
      <div class="navbar-token">Add Product</div>
        <div class="navbar-token token-on">Vetements</div>
        <div class="input-search">
          <input type="text" name="search-bar" placeholder="Placeholder .." id="search-bar">
          <button> <i class="fas fa-search" id="btn-search"></i> </button>
        </div>
      </div>
      <div id="category-tube">
        <div class="category-token">Livre</div>
        <div class="category-token">Livre</div>
        <div class="category-token">Livre</div>
      </div>
    <div id="root" >


        

      </div>
    </div>

  

    </div>



<?php 
    $this->load->view('Footer');
?>  
  </body>

</html>

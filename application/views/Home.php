<?php
$this->load->view('Header');
$user = $this->session->userdata('user');
$admin = false;
if ($this->session->has_userdata('admin')) {
  $admin = true;
}
?>

<body>
  <div id="user">
    <?php echo $user['nom']; ?>
  </div>
  <div id="logo-page">
    <img src="<?php echo base_url(); ?>assets/img/logo/logo.png" alt="logo " />
  </div>
  <div id="navbar-top">
    <?php if (!$admin) { ?>
      <div class="navbar-token" id="addProduct-token">Add Product</div>
      <div class="navbar-token " id="myProduct-token">My Product</div>
    <?php } ?>

    <div class="input-search">
      <input type="text" name="search-bar" placeholder="Placeholder .." id="search-bar">
      <button> <i class="fas fa-search" id="btn-search"></i> </button>
    </div>
  </div>
  <div id="category-tube">
  </div>

  <div id="root">


  </div>


  </div>
  </div>


  </div>
  <?php
  $this->load->view('Footer');
  ?>
</body>

</html>
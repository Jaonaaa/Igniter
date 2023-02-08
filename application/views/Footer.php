<?php
defined('BASEPATH') or exit('No direct script access allowed');
$admin = false;
if ($this->session->has_userdata('admin')) {
  $admin = true;
}
?>

<footer id="footer">
  <div class="logo-footer">
    <img src="<?php echo base_url(); ?>assets/img/logo/logo.png" alt="" />
  </div>
  <div class="text-row-footer">
    Thank you for visiting our website , here we are
  </div>
  <div class="users-container">
    <div class="user-card">
      <img src="<?php echo base_url(); ?>assets/img/illu.jpg" alt="" />
      <div class="about-user">
        <div class="name-user">Riana Etu001812</div>
        <div class="about-subtitle">Working as</div>
        <div class="about-content">Backend Developper</div>
        <div class="about-subtitle">He said</div>
        <div class="about-content">Hello World</div>
      </div>
    </div>
    <div class="user-card">
      <img src="<?php echo base_url(); ?>assets/img/admin/pika.jpg" alt="" />
      <div class="about-user">
        <div class="name-user">Paul Etu001915</div>
        <div class="about-subtitle">Working as</div>
        <div class="about-content">Frontend Developper</div>
        <div class="about-subtitle">He said</div>
        <div class="about-content">Hello World , Milay kely le site e ?</div>
      </div>
    </div>
    <div class="user-card">
      <img src="<?php echo base_url(); ?>assets/img/admin/Tahiry.jpeg" alt="" />
      <div class="about-user">
        <div class="name-user">Tahiry Etu001888</div>
        <div class="about-subtitle">Working as</div>
        <div class="about-content">Backend Developper</div>
        <div class="about-subtitle">He said</div>
        <div class="about-content">Kez kez daholo</div>
      </div>
    </div>
  </div>
</footer>
<script>
  var base_url = "<?php echo base_url(); ?>";
  var categories = [];
  var selectedObjectOther = null;
  var selectedObjectsUser = null;
</script>
<script src="<?php echo base_url(); ?>assets/js/Utilities.js"></script>
<script>
  getAllCategories();
</script>
<script src="<?php echo base_url(); ?>assets/js/Search.js"></script>
<script src="<?php echo base_url(); ?>assets/js/style.js"></script>
<script src="<?php echo base_url(); ?>assets/js/PopUp.js"></script>
<script src="<?php echo base_url(); ?>assets/js/Hider.js"></script>
<script src="<?php echo base_url(); ?>assets/js/Bag.js"></script>
<script src="<?php echo base_url(); ?>assets/js/MyProducts.js"></script>
<script src="<?php echo base_url(); ?>assets/js/Upload.js"></script>
<script src="<?php echo base_url(); ?>assets/js/AddProduct.js"></script>
<script src="<?php echo base_url(); ?>assets/js/Exchange.js"></script>
<script src="<?php echo base_url(); ?>assets/js/ListProduct.js"></script>
<?php if ($admin) { ?>
  <script src="<?php echo base_url(); ?>assets/js/Categories.js"></script>
  <script src="<?php echo base_url(); ?>assets/js/Navbar_admin.js"></script>


<?php } else { ?>
  <script>
    setUpNavBarTop() 
  </script>
  <script src="<?php echo base_url(); ?>assets/js/Navbar_Main.js"></script>

<?php } ?>
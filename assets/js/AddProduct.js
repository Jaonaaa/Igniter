function formAdd(datas) {
  let content = `
  <div class="add-product-box">
  <div class="col-add">
    <div class="block-add">
      <div class="label-block">Name of the product</div>
      <div class="input">
        <input type="text" placeholder="name who can describe your product ">
      </div>
    </div>
    <div class="block-add">
      <div class="label-block">Category of the product</div>
      <div class="select">
        <select name="category-select" id="category-select">
          <option value="" selected disabled hidden>Which Category</option>
          <option value="">Clothes</option>
          <option value="">Books</option>
        </select>
      </div>
    </div>
    <div class="block-add">
      <div class="label-block">Price of your product</div>
      <div class="input">
        <input type="text" placeholder="price that you think your product deserve">
      </div>
    </div>
  
  </div>
  <div class="col-add">
    <div class="block-add">
      <div class="label-block" style="text-align: center;">Add picture for your product</div>
      <label for="file-add" class="label-file-add">Add file <i class="fas fa-plus"></i> </label>
      <input type="file" name="file-add" class="file-to-add" id="file-add">
    </div>
    <div class="col-add">
      <div class="blocks-picture">
        <div class="picture-square">
          <img src="${base_url}assets/img/illu.jpg" alt="picture">
          
        </div>
       
      </div>
    </div>
  </div>
  <div class="block-add">
    <button>Add Product <i class="fas fa-check"></i> </button>
   </div>
  </div>
  `;
  return content;
}
function getFormAddProduct(datas) {
  let form = formAdd(datas);
  return form;
}

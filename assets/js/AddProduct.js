function formAdd(datas) {
  let content = `
  <div class="add-product-box">
  <div class="col-add">
  <div class="block-add">
  <div class="label-block">Name of the product</div>
  <div class="input">
    <input type="text" placeholder="Name of your product " id="name-input">
  </div>
</div>
    <div class="block-add">
      <div class="label-block">Description of the product</div>
      <div class="input">
        <input type="text" placeholder="describe your product " id="description-input">
      </div>
    </div>
    <div class="block-add">
      <div class="label-block">Category of the product</div>
      <div class="select">
        <select name="category-select" id="category-select" " id="category-input">
          <option value="" selected disabled hidden>Which Category</option>
          ${setCategory()}
        </select>
      </div>
    </div>
    <div class="block-add">
      <div class="label-block">Price of your product</div>
      <div class="input">
        <input type="text" placeholder="price that you think your product deserve" " id="price-input">
      </div>
    </div>
  
  </div>
  <div class="col-add">
    <div class="block-add">
      <div class="label-block" style="text-align: center;">Add picture for your product</div>
      <label for="file-add" class="label-file-add">Add file <i class="fas fa-plus"></i> </label>
      <input type="file" name="file-add" class="file-to-add" id="file-add">
    </div>
    <div class="col-add" id="blocks-picture">
      </div>
    </div>
  </div>
  <div class="block-add">
    <button id="adding-product">Add Product <i class="fas fa-check"></i> </button>
   </div>
  </div>
  `;
  return content;
}
function getFormAddProduct(datas) {
  let form = formAdd(datas);
  return form;
}

function getAddForm() {
  addSection(getFormAddProduct(), "Form ", "Add your product to exchange here");
  setUpUploadFile();
  setUpAddProduct();
}

function setCategory() {
  let options = "";
  categories.forEach((categorie) => {
    options += ` <option value="${categorie.id}">${categorie.nom}</option>`;
  });
  return options;
}

function addPictureUploaded(path) {
  let id = document.getElementById("blocks-picture");
  let block = `
  <div class="blocks-picture">
  <div class="picture-square">
    <img src="${base_url}${path}" alt="picture">
  </div>
  `;
  id.innerHTML += block;
}

function setUpAddProduct() {
  let nameInput = document.getElementById("name-input");
  let description = document.getElementById("description-input");
  let categorie = document.getElementById("category-select");
  let priceInput = document.getElementById("price-input");
  let btnAdd = document.getElementById("adding-product");
  btnAdd.addEventListener("click", () => {
    let textDescription = description.value + "".trim();
    let idCategory = categorie.value + "".trim();
    let name = nameInput.value + "".trim();
    let price = priceInput.value + "".trim();
    if (+price <= 0) {
      createSidePopUp("The Price is invalide", "error");
    } else {
      if (
        textDescription != "" &&
        idCategory != "" &&
        price != "" &&
        name != ""
      ) {
        addProduct(textDescription, idCategory, price, name);
      }
    }
  });
}

function addProduct(description, idCategory, price, name) {
  let xhr = getTheBoy();
  let formData = new FormData();
  formData.append("description", description);
  formData.append("idCategory", idCategory);
  formData.append("price", price);
  formData.append("name", name);
  //
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var retour = JSON.parse(xhr.responseText);
        console.log(retour);
        if (retour.status == "error") {
        } else {
          createSidePopUp("Product " + name + " added", "good");
        }
      } else {
        console.log(xhr.status);
      }
    }
  };
  xhr.addEventListener("error", function (event) {
    alert("Oups! Quelque chose s'est mal passé lors de la publication .");
  });
  xhr.open("POST", `${base_url}index.php/Home/addProduct`, true);
  xhr.send(formData);
}

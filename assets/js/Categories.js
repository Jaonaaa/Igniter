function createRowCategories() {
  let blocks = () => {
    let content = "";
    categories.forEach((data) => {
      content += `  <div class="block-category">
      ${data.nom}
    </div>`;
    });
    return content;
  };
  let content = ` 
  <div class="subtitle-row-categories">Categories that exist </div>
  <div class="row-category">
    ${blocks()}
  </div>

  </div>
  `;
  return content;
}

function createAddCategories() {
  let content = ` 
    <div class="subtitle-row-categories">Create new Category </div>
    <div class="row-category">
      <div class="block-category add" id="btn-add-category">
          Add new Category <i class="fas fa-plus"></i>
      </div>
    </div>
    `;
  return content;
}

function getCategories() {
  let blocks = createRowCategories();
  blocks += createAddCategories();
  return blocks;
}

function getCategoriesSection() {
  addSection(
    getCategories(""),
    "Categories",
    "Here you can create or arrange categories"
  );
  setUpAddCategories();
}

function setUpAddCategories() {
  let btn = document.getElementById("btn-add-category");
  btn.addEventListener("click", () => {
    let champ = document.getElementById("new-category");
    if (champ == null) {
      let row = document.querySelector(".row-category");
      row.innerHTML += ` <div class="block-category new"> 
        <input type="text" placeholder="Type here" id="new-category" />
      <button id="btn-add-category-accept"> <i class="fas fa-plus"></i> </button></div>`;
      //
      let input = document.getElementById("new-category");
      let btnAccept = document.getElementById("btn-add-category-accept");
      btnAccept.addEventListener("click", () => {
        let inputValue = input.value;
        input.setAttribute("disabled", "");
        input.style.border = "none";
        addNewCategory(inputValue);
        let blockss = document.querySelector(".new");
        blockss.classList.remove("new");
        input.style.backgroundColor = "transparent";
        input.style.color = "white";
        btnAccept.parentNode.removeChild(btnAccept);
      });
    }
  });
}

function addNewCategory(nom) {
  let xhr = getTheBoy();
  let formData = new FormData();
  formData.append("nameCategory", nom);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var retour = JSON.parse(xhr.responseText);
        if (retour.status == "error") {
        } else {
          createSidePopUp("Category " + nom + " added", "good");
        }
      } else {
        console.log(xhr.status);
      }
    }
  };
  xhr.addEventListener("error", function (event) {
    alert("Oups! Quelque chose s'est mal passé lors de la publication .");
  });
  xhr.open("POST", `${base_url}index.php/Home/addCategory`, true);
  xhr.send(formData);
}

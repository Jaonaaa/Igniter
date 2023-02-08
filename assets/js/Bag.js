function createProductBag(datas) {
  let content = `
  <div class="card-bag " idObject="${datas.idObjet}">
    <div class="picture-card-bag">
      <img src="${base_url}${datas.pathPic}" alt="">
    </div>
    <div class="about-card-bag">
        <div class="block-bag">
          <div class="label-bag-card">Price</div>
          <div class="content-bag-card"> ${datas.prixEstime} Ar</div>
        </div>
        <div class="block-bag">
          <div class="label-bag-card">Name </div>
          <div class="content-bag-card">${datas.nom}</div>
        </div>
    </div>
  </div>`;
  return content;
}

function showBagUser(datas) {
  let bagContainer = document.getElementById("container-bag-product");
  let products = () => {
    let content = "";
    datas.forEach((data) => {
      content += createProductBag(data);
    });
    return content;
  };
  if (bagContainer == null) {
    let container = document.createElement("div");
    container.setAttribute("id", "container-bag-product");
    container.innerHTML = `
  <div id="button-validation-exchange">
      Exchange
  </div>
  <div id="button-validation-close">
    <i class="fas fa-angle-double-down"></i>
</div>
  <div class="title-bag">Choose a product to exchange</div>
  <div id="row-bag">
  ${products()}
  </div>
  `;
    document.body.appendChild(container);
    container.style.height = 0;
    container.style.transform = "translateY(2.5rem) translateX(-50%)";
    setTimeout(() => {
      container.removeAttribute("style");
    }, 100);
  } else {
    let rowBag = document.getElementById("row-bag");
    rowBag.innerHTML = `${createProductBag(datas)}`;
  }
  setUpCloseBag();
}

function setUpCloseBag() {
  let btnClose = document.getElementById("button-validation-close");
  let bagContainer = document.getElementById("container-bag-product");
  let clicked = false;
  btnClose.addEventListener("click", () => {
    if (!clicked) {
      clicked = true;
      bagContainer.style.height = 0;
      bagContainer.style.transform = "translateY(2.5rem) translateX(-50%)";
      setTimeout(() => {
        bagContainer.parentNode.removeChild(bagContainer);
      }, 300);
    }
  });
}
function getMyProductBag() {
  let xhr = getTheBoy();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var retour = JSON.parse(xhr.responseText);
        console.log(retour);
        if (retour.status == "error") {
          createSidePopUp(retour.detail, "error");
        } else {
          showBagUser(retour);
          setUpBagProduct();
        }
      } else {
        console.log(xhr.status);
      }
    }
  };
  xhr.addEventListener("error", function (event) {
    alert("Oups! Quelque chose s'est mal passé lors de la publication .");
  });
  xhr.open("GET", `${base_url}Home/getMyProduct`, true);
  xhr.send(null);
}

function setUpBagProduct() {
  let cards = document.querySelectorAll(".card-bag");
  cards.forEach((card) => {
    let idObject = card.getAttribute("idobject");
    card.addEventListener("click", () => {
      if (card.classList.contains("selected")) {
        card.classList.remove("selected");
        selectedObjectsUser = null;
      } else {
        card.classList.add("selected");
        selectedObjectsUser = idObject;
        removeOther(card);
      }
    });
  });
  setUpSendExchangeRequest();
}

function removeOther(cardTarget) {
  let cards = document.querySelectorAll(".card-bag");
  cards.forEach((card) => {
    if (card != cardTarget) {
      card.classList.remove("selected");
    }
  });
}

function setUpSendExchangeRequest() {
  let btn = document.getElementById("button-validation-exchange");
  btn.addEventListener("click", () => {
    if (selectedObjectsUser == null) {
      createSidePopUp("Select an item please", "error");
    } else {
      sendExchange(selectedObjectsUser, selectedObjectOther);
    }
  });
}

function sendExchange(idObjectUser, idObjectWanted) {
  let xhr = getTheBoy();
  let formData = new FormData();
  formData.append("idObjectUser", idObjectUser);
  formData.append("idObjectWanted", idObjectWanted);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var retour = JSON.parse(xhr.responseText);
        console.log(retour);
        if (retour.status == "error") {
          createSidePopUp(retour.detail, "error");
        } else {
          createSidePopUp("Exchange request sent", "good");
        }
      } else {
        console.log(xhr.status);
      }
    }
  };
  xhr.addEventListener("error", function (event) {
    alert("Oups! Quelque chose s'est mal passé lors de la publication.");
  });
  xhr.open("POST", `${base_url}Home/sendExchange`, true);
  xhr.send(formData);
}

// geeting Feeds
getFeeds();
/**
 *
 * @param {Object} datas
 */
function createCardProduct(datas) {
  let card = `
    <div class="card-img">
        <div class="picture">
            <img src="${base_url}${datas.pathPic}" alt="">
    </div>
        <div class="card-about">
            <div class="title-card">${datas.nom}  <span class="author">  by ${datas.nomProprio}</span></div>
            <div class="subtitle-card">${datas.description}</div>
        <div class="content-card">
            <div class="block-in">
                <div class="upper-text">Price </div>
                <div class="under-text"> ${datas.prixEstime} Ar</div>
            </div>
        <div class="button-exchange" idProprio="${datas.idUtilisateur}" id-object-exchange="${datas.idObjet}">
            Ask Exchange
        </div>
        </div>
        </div>
        </div>`;

  return card;
}

/**
 *
 * @param {Array} datas
 */
function cardList(datas) {
  let cards = "";
  datas.forEach((data) => {
    cards += createCardProduct(data);
  });
  return cards;
}

function getFeeds() {
  let xhr = getTheBoy();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var retour = JSON.parse(xhr.responseText);
        console.log(retour);
        if (retour.status == "error") {
          createSidePopUp(retour.detail, "error");
        } else {
          addSection(
            cardList(retour),
            "News Feed",
            "There are some stuff that you would like ; )"
          );
          setUpExchangeListProduct();
          setUpCards();
        }
      } else {
        console.log(xhr.status);
      }
    }
  };
  xhr.addEventListener("error", function (event) {
    alert("Oups! Quelque chose s'est mal passé lors de la publication .");
  });
  xhr.open("GET", `${base_url}Home/getFeeds`, true);
  xhr.send(null);
}

/**
 *
 * @param {HTMLElement} picture
 * @param {Array} datas
 */
function addImages(picture, datas) {
  let cardImage = picture.parentNode;
  //
  let pathProvisioire = picture.firstElementChild.getAttribute("src");
  //
  if (cardImage.classList.contains("big")) {
    cardImage.classList.remove("big");
    picture.classList.remove("square");
    console.log(picture.children);

    datas.forEach((data, index) => {
      if (index == datas.length - 1) {
        picture.removeChild(picture.children[1]);
      } else {
        picture.removeChild(picture.children[index]);
      }
    });
  } else {
    cardImage.classList.add("big");
    picture.classList.add("square");
    datas.forEach((data) => {
      picture.innerHTML += `<img src="${pathProvisioire}" alt="">`;
    });
  }
}

function setUpCards() {
  let cards = document.querySelectorAll(".card-img");
  cards.forEach((card) => {
    let picture = card.firstElementChild;

    picture.addEventListener("click", () => {
      getOtherPicture(picture);
    });
  });
}

function getOtherPicture(picture) {
  let xhr = getTheBoy();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var retour = JSON.parse(xhr.responseText);
        // console.log(retour);
        if (retour.status == "error") {
          createSidePopUp(retour.detail, "error");
        } else {
          //addImages(picture, retour);
        }
      } else {
        console.log(xhr.status);
      }
    }
  };
  xhr.addEventListener("error", function (event) {
    alert("Oups! Quelque chose s'est mal passé lors de la publication .");
  });
  addImages(picture, ["", 3, 3]);
  // xhr.open(
  //   "GET",
  //   `http://igniter.epizy.com/HomeCI/getDataCustomer/${text}`,
  //   true
  // );
  // xhr.send(null);
}

function setUpExchangeListProduct() {
  let productBtn = document.querySelectorAll(".button-exchange");
  productBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedObjectOther = btn.getAttribute("id-object-exchange");
      getMyProductBag();
    });
  });
}

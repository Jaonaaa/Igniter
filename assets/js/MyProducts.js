/**
 *
 * @param {Object} datas
 */
function createCardMyProduct(datas) {
  let card = `
      <div class="card-img">
          <div class="picture">
              <img src="${base_url}${datas.pathPic}" alt="">
      </div>
          <div class="card-about">
          <div class="title-card">${datas.nom}  <span class="author">  by You </span></div>
          <div class="subtitle-card">${datas.description}</div>
          <div class="content-card">
              <div class="block-in">
                  <div class="upper-text">Price </div>
                  <div class="under-text"> ${datas.prixEstime} Ar</div>
              </div>
          <div class="button-modify">
              Modify
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
function myCards(datas) {
  let cards = "";
  datas.forEach((data) => {
    cards += createCardProduct(data);
  });

  return cards;
}

function getMyProducts() {
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
            myCards(retour),
            "Your Products",
            "Here you can see the product that you have set"
          );
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

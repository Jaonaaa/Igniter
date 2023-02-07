/**
 *
 * @param {Object} datas
 */
function createCardMyProduct(datas) {
  let card = `
      <div class="card-img">
          <div class="picture">
              <img src="${base_url}assets/img/illu.jpg" alt="">
      </div>
          <div class="card-about">
              <div class="title-card">Harry Potter </div>
              <div class="subtitle-card">This item  gfdsgfdfgf  dgs fdsgis cool</div>
          <div class="content-card">
              <div class="block-in">
                  <div class="upper-text">Price </div>
                  <div class="under-text"> 23.00 $</div>
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
  //   datas.forEach((data) => {
  //     cards += createCardProduct(data);
  //   });
  for (let index = 0; index < 4; index++) {
    cards += createCardMyProduct("data");
  }
  return cards;
}

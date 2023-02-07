function createProductBag(datas) {
  let content = `
  <div class="card-bag">
    <div class="picture-card-bag">
      <img src="${base_url}assets/img/illu.jpg" alt="">
    </div>
    <div class="about-card-bag">
        <div class="block-bag">
          <div class="label-bag-card">Price</div>
          <div class="content-bag-card">23.0 $</div>
        </div>
        <div class="block-bag">
          <div class="label-bag-card">Name</div>
          <div class="content-bag-card">Livre Harry Potter</div>
        </div>
    </div>
  </div>`;
  return content;
}

function showBagUser(datas) {
  let bagContainer = document.getElementById("container-bag-product");
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
  ${createProductBag(datas)}
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

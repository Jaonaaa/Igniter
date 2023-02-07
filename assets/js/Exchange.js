function createExchangeBlock(datas) {
  let content = `<div class="exchange-box">
  <div class="requester-row">
    <div class="name-requester">From Peter</div>
  </div>
  <div class="contract-exchange"> <div class="block-exchange">
    <div class="picture-exchange">
      <img src="${base_url}assets/img/illu.jpg" alt="">
    </div>
    <div class="about-product-exchange">
      <div class="title-exchange">Harry Potter </div>
      <div class="content-exchange">
        <div class="block-in">
          <div class="upper-text">Price </div>
          <div class="under-text"> 23.00 $</div>
        </div>
      </div>
    </div>
  </div>

  <div class="exchange-cross">
    <div class="arrow-right"></div>
    <div class="arrow-left"></div>
  </div>

  <div class="block-exchange">
    <div class="picture-exchange">
      <img src="${base_url}assets/img/illu.jpg" alt="">
    </div>
    <div class="about-product-exchange">
      <div class="title-exchange">Harry Potter </div>
      <div class="content-exchange">
        <div class="block-in">
          <div class="upper-text">Price </div>
          <div class="under-text"> 23.00 $</div>
        </div>
      </div>
    </div>
  </div>

</div>
<div class="buttons-exchange">
  <button class="stop btn-exchange">Decline</button>
  <button class="accept btn-exchange">Accept</button>
</div> 
</div>    `;
  return content;
}
function getExchange(datas) {
  let blocks = createExchangeBlock(datas);
  return blocks;
}

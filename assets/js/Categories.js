function createRowCategories(datas) {
  let content = ` 
  <div class="subtitle-row-categories">Categories that exist </div>
  <div class="row-category">
    <div class="block-category">
        Clothes
    </div>
  </div>

  </div>
  `;
  return content;
}

function createAddCategories() {
  let content = ` 
    <div class="subtitle-row-categories">Create new Category </div>
    <div class="row-category">
      <div class="block-category add">
          Add new Category <i class="fas fa-plus"></i>
      </div>
    </div>
    `;
  return content;
}

function getCategories(datas) {
  let blocks = createRowCategories(datas);
  blocks += createAddCategories();
  return blocks;
}

addSection(
  getCategories(""),
  "Categories",
  "Here you can create or arrange categories"
);

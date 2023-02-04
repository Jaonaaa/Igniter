function createHider() {
  let hider = document.createElement("div");
  hider.setAttribute("id", "hider");
  setUpHider(hider);
  document.body.appendChild(hider);
}
var styleHider = new CSSStyleSheet();
styleHider.replaceSync(`
#hider {
  background-color: #0000003b;
  z-index: 3;
  transition: all 0.2s ease-in-out;
  width: 100%;
  position: absolute;
  top: 0;
}
`);

function setUpHider(hider) {
  let heightMax = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );

  hider.style.height = heightMax + "px";
  resizeHider(hider);
  hider.addEventListener("click", () => {
    hider.style.opacity = 0;
    // removeNavBar();
    removeMiddlePopUp();
    setTimeout(() => {
      document.body.removeChild(hider);
    }, 200);
  });
}

function removeHider() {
  let hider = document.getElementById("hider");
  hider.style.opacity = 0;
  removeNavBar();
  removeMiddlePopUp();
  setTimeout(() => {
    document.body.removeChild(hider);
  }, 200);
}

function resizeHider(hider) {
  window.addEventListener("resize", () => {
    let heightMax = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    hider.style.height = heightMax + "px";
  });
  window.addEventListener("scroll", () => {
    let heightMax = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    hider.style.height = heightMax + "px";
  });
}

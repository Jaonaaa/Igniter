var navbar;

let datas = [
  { type: "logo", src: `${base_url}assets/img/logo/logo.png` },
  { type: "titleSection", name: "Main Menu" },
  {
    type: "singleLink",
    name: "Categories",
    link: "alterCategories",
    icon: "fas fa-book-open",
  },

  {
    type: "multiLink",
    name: "Zayyy",
    icon: "fas fa-fire",
    links: [
      { name: "Tahiry ", link: "", move: false },
      { name: "Riana ", link: "", move: false },
      { name: "Paul ", link: "", move: false },
    ],
  },

  // { type: "singleLink", name: "Hello World", icon: "fas fa-moon" },
  { type: "titleSection", name: "Parameter" },
  {
    type: "singleLink",
    name: "Deconnexion",
    link: "deco",
    icon: "fas fa-door-open",
  },
];
//set UP THE NAVBAR btn here =>
setUpNavbar();
function setUpNavbar() {
  let btn = document.getElementById("logo-page");
  btn.addEventListener("click", () => {
    createNavBar();
  });
}
//

function createNavBar() {
  navbar = document.createElement("div");
  navbar.setAttribute("id", "navbar");
  createHider();
  styleNavBar();
  buildNavbar(navbar, datas);
  document.body.prepend(navbar);
  setUpMultiLinks();
  setUpLinkedList();
}

function setUpLinkedList() {
  let links = document.querySelectorAll(".linked");
  links.forEach((link) => {
    let linksP = link.getAttribute("linkedTo");
    let moveState = link.getAttribute("moveIt");

    if (linksP != "undefined") {
      link.addEventListener("click", () => {
        if (moveState == "true") {
          window.location = linksP;
        } else {
          setFunction(linksP);
        }
      });
    }
  });
}

///adding specific function to The navbar
function setFunction(functionName) {
  if (functionName == "deco") {
    window.location = base_url + "index.php/Login/deconnexion";
  }
  if (functionName == "alterCategories") {
    getCategoriesSection();
  }
}
///

/**
 *
 * @param {Node} navbar
 * @param {Array} datas
 */
function buildNavbar(navbar, datas) {
  datas.forEach((data) => {
    if (data.type == "multiLink") {
      navbar.innerHTML += multiLink(data.name, data.icon, data.links);
    } else if (data.type == "singleLink") {
      navbar.innerHTML += singleLink(
        data.name,
        data.icon,
        data.link,
        data.move
      );
    } else if (data.type == "logo") {
      navbar.innerHTML += logo_NavBar(data.src);
    } else if (data.type == "titleSection") {
      navbar.innerHTML += titleSection(data.name);
    }
  });
}

function logo_NavBar(imgSource) {
  let logo = `
  <div class="logoNavbar">
    <img src="${imgSource}" alt="logo navbar" />
  </div>`;
  return logo;
}

function titleSection(title) {
  let content = ` <div class="titleSection_Navbar row">${title}</div>`;
  return content;
}

function multiLink(name, icon, links) {
  let linksBuild = () => {
    let content = "";
    links.forEach((link) => {
      content += ` <div class="under_link linked" linkedTo="${link.link}" moveIt="${link.move}">${link.name}</div>`;
    });
    return content;
  };
  let content =
    `
  <div class="multiLink">
      <div class="itemLink row">
        <div class="iconItemLink"><i class="${icon}"></i></div>
        <div class="nameItemLink">${name}</div>
        <div class="btnItemLink"><i class="fas fa-caret-down"></i></div>
      </div>
      <div class="boxUnder_link">
      ` +
    linksBuild() +
    `
      </div>
  </div>`;
  return content;
}

function singleLink(name, icon, link, move) {
  let content = `
    <div class="singleLink">
        <div class="itemLink row linked" linkedTo="${link}" moveIt="${move}">
          <div class="iconItemLink"><i class="${icon}"></i></div>
          <div class="nameItemLink">${name}</div>
        </div>
      </div>`;
  return content;
}

function styleNavBar() {
  navbar.style.height = window.innerHeight + "px";
  window.addEventListener("resize", () => {
    navbar.style.height = window.innerHeight + "px";
  });
  setTimeout(() => {
    navbar.style.transform = "translateX(0)";
  }, 100);
}

function removeNavBar() {
  if (document.getElementById("navbar") != undefined) {
    navbar.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(navbar);
    }, 200);
  }
}

function setUpMultiLinks() {
  let multiLinks = document.querySelectorAll(".multiLink");

  multiLinks.forEach((multiLink) => {
    let down = false;
    multiLink.firstElementChild.addEventListener("click", () => {
      if (down == false) {
        showLinks(multiLink.firstElementChild, multiLink.children[1]);
        down = true;
      } else {
        hideLinks(multiLink.firstElementChild, multiLink.children[1]);
        down = false;
      }
    });
  });
}

function showLinks(row, boxLinks) {
  row.children[2].style.transform = "rotate(-180deg)";
  let children = boxLinks.children;
  let interval = 100;
  for (let i = 0; i < boxLinks.childElementCount; i++) {
    setTimeout(() => {
      children[i].style.opacity = 1;
    }, interval);
    interval += 110;
  }

  row.style.borderLeft = "5px solid rgb(0 140 89)";
  row.style.color = "rgb(0 97 62)";
  //  row.style.boxShadow = "rgb(245 0 91 / 32%) 20px -7px 1rem 0px inset";
  let heightNecessary = boxLinks.childElementCount * 3.5;
  boxLinks.style.height = heightNecessary + "rem";
}

function hideLinks(row, boxLinks) {
  row.children[2].removeAttribute("style");
  row.removeAttribute("style");
  boxLinks.removeAttribute("style");
  let children = boxLinks.children;
  let interval = 100;
  for (let i = 0; i < boxLinks.childElementCount; i++) {
    setTimeout(() => {
      children[i].removeAttribute("style");
    }, interval);
    interval += 110;
  }
}

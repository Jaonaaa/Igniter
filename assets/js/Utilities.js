function holdInput() {
  let inputs = Array.from(document.querySelectorAll(".input"));
  inputs.forEach((input) => {
    input.firstElementChild.addEventListener("blur", () => {
      let textInput = input.firstElementChild.value + "";
      let placeholder = input.children[1];
      if (textInput.trim() == "") {
        placeholder.classList.remove("holdOn");
      } else {
        placeholder.classList.add("holdOn");
      }
      input.firstElementChild.classList.remove("focused");
    });
  });
}
function getTheBoy() {
  let xhr;
  try {
    xhr = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e2) {
      try {
        xhr = new XMLHttpRequest();
      } catch (e3) {
        xhr = false;
      }
    }
  }
  return xhr;
}
/**
 *
 * @param {HTMLELEMENT} content
 * @param {String} title
 * @param {String} about
 */
function createSection(content, title, subtitle) {
  let section = document.createElement("div");
  // let contentText = content.outerHTML;
  section.innerHTML = `
  <div class="title-section-content"> ${title} </div>
  <div class="subtitle-section-content"> ${subtitle}</div>
  <div class="container-section-content">
  ${content}
  </div>
  `;
  return section;
}
/**
 *
 * @param {String} content
 * @param {String} title
 * @param {String} about
 */
function addSection(content, title, about) {
  let root = document.getElementById("root");
  let section = createSection(content, title, about);
  section.classList.add("section-content");
  root.prepend(section);
  ///
  let heightSection = section.getBoundingClientRect().height;
  let widthSection = section.getBoundingClientRect().width;
  //
  let windowWidth = window.innerWidth;
  //
  section.style.height = 0;
  section.style.width = 0;
  section.style.overflow = "hidden";
  section.style.padding = 0;
  section.style.opacity = 0;
  //
  setTimeout(() => {
    section.style.height = heightSection + "px";
    section.style.width = "100%";
    if (windowWidth > 800) {
      section.style.padding = " 1rem 0.3rem 0.4rem 1.5rem";
    }
    section.style.opacity = 1;
  }, 100);
  setTimeout(() => {
    section.style.height = "auto";
  }, 600);
  window.addEventListener("resize", () => {
    section.removeAttribute("style");
  });
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  let sections = document.querySelectorAll(".section-content");
  if (sections.length > 1) {
    setTimeout(() => {
      sections[1].style.opacity = 0;
    }, 100);
    setTimeout(() => {
      sections[1].style.height = 0;
    }, 600);
    setTimeout(() => {
      sections[1].parentNode.removeChild(sections[1]);
    }, 1000);
  }
}

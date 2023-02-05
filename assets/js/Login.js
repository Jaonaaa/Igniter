var emailInput;
var pwdInput;
var btnForm;
var usernamesInput;
//////////////////////////
let loginForm = `
<div class="logo-title">
<img src="${base_url}assets/img/logo/logo.png" alt="logo">
</div>
<div class="logo-subtitle">Log into your account</div>
<form action="./index.php/Login/LoginUser" method="post" id="formulaire-sign-in">
  <div class="input">
    <input type="email" required name="email" id="emailInput" />
    <div class="placeholder">Email</div>
  </div>
  <div class="input">
    <input type="password" required name="password" id="pwdInput" />
    <div class="placeholder">Password</div>
  </div>
  <div class="button">
    <button>Login</button>
  </div>
</form>
<div class="supp-row">
  <div class="text-supp">Don't have a account ?</div>
  <div class="button small" id="btn-go-sign-up">
    <button >Sign up</button>
  </div>
</div>`;

let signUpForm = `
<div class="logo-title">
<img src="${base_url}assets/img/logo/logo.png" alt="logo">
</div>
<div class="logo-subtitle">Create your account</div>
<form action="${base_url}" method="post" id="formulaire-sign-up">
  <div class="input">
    <input type="text" required name="username" id="username" />
    <div class="placeholder">Username</div>
  </div>
  <div class="input">
    <input type="email" required name="email" id="email" />
    <div class="placeholder">Email</div>
  </div>
  <div class="input">
    <input type="password" required name="password" id="password" />
    <div class="placeholder">Password</div>
  </div>

  <div class="button">
    <button>Sign up</button>
  </div>
</form>
<div class="supp-row">
  <div class="text-supp">Already have an account ?</div>
  <div class="button small" id="btn-go-sign-in">
    <button>Sign in</button>
  </div>
</div>
`;
///
initialisation(loginForm);

////////////////////////////////////////////////////////////////
function resizeRoot() {
  let root = document.getElementById("root");
  root.style.minHeight = window.innerHeight + "px";
  window.addEventListener("resize", () => {
    root.style.minHeight = window.innerHeight + "px";
  });
}

////////////////////////////////////////////////////////////////

function getDataLogin() {
  emailInput = document.getElementById("emailInput").value;
  pwdInput = document.getElementById("pwdInput").value;
}

function setUpLoginForm() {
  if (document.getElementById("formulaire-sign-in") != null) {
    let form = document.getElementById("formulaire-sign-in");
    form.addEventListener("submit", (e) => {
      //  e.preventDefault();
      getDataLogin();
      // setting up what to do with form login
    });
  }
  let btn = document.getElementById("btn-go-sign-up");
  if (btn != null) {
    btn.addEventListener("click", () => {
      swicthContent(signUpForm);
      // createSidePopUp("TEste test", "good");
    });
  }
}

function setUpSignUpForm() {
  if (document.getElementById("formulaire-sign-up") != null) {
    let form = document.getElementById("formulaire-sign-up");
    form.addEventListener("submit", (e) => {
      // e.preventDefault();
      // setting up what to do with form Inscription
    });
  }
  let btn = document.getElementById("btn-go-sign-in");
  if (btn != null) {
    btn.addEventListener("click", () => {
      swicthContent(loginForm);
      // createSidePopUp("TEste test", "error");
    });
  }
}

function swipForm() {
  let rightBlock = document.getElementById("right");
  let firstGlass = document.getElementById("first-glass");
  let secondGlass = document.getElementById("second-glass");
  ///
  if (rightBlock.style.transform == "rotateY(180deg)") {
    rightBlock.removeAttribute("style");
    secondGlass.style.transform = "rotateY(0deg)";
  } else {
    rightBlock.style.transform = "rotateY(180deg)";
    secondGlass.style.transform = "rotateY(180deg)";
  }
  ///////////////
  firstGlass.style.opacity = 0;
  firstGlass.style.zIndex = 0;
  secondGlass.style.zIndex = 1;
  ///////////////
  setTimeout(() => {
    secondGlass.style.opacity = 1;
  }, 150);
  setTimeout(() => {
    secondGlass.setAttribute("id", "first-glass");
    firstGlass.setAttribute("id", "second-glass");
    firstGlass.innerHTML = "";
    setUpSignUpForm();
    setUpLoginForm();
    holdInput();
  }, 260);
}

function swicthContent(newContent) {
  let secondGlass = document.getElementById("second-glass");
  secondGlass.innerHTML = newContent;
  swipForm();
}

function initialisation(content) {
  let firstGlass = document.getElementById("first-glass");
  firstGlass.innerHTML = content;
  setUpLoginForm();
  holdInput();
}

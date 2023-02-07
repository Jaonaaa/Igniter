setUpSearch();
function setUpSearch() {
  let searchBar = document.getElementById("search-bar");
  let btn = document.getElementById("btn-search");
  btn.addEventListener("click", () => {
    let valueText = searchBar.value + "".trim();
    if (valueText != "") {
      alert(searchBar.value);
    }
  });
}

function getListCustomer(text) {
  let xhr = getTheBoy();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var retour = JSON.parse(xhr.responseText);
        // console.log(retour);
        if (retour.status == "error") {
          console.log("Erreur");
        } else {
          setList(retour);
          setUpGetDetailsCustomer();
        }
      } else {
        console.log(xhr.status);
      }
    }
  };
  xhr.addEventListener("error", function (event) {
    alert("Oups! Quelque chose s'est mal passé lors de la publication .");
  });
  xhr.open(
    "GET",
    `http://igniter.epizy.com/HomeCI/getDataCustomer/${text}`,
    true
  );
  xhr.send(null);
}

let imageBtn = document.getElementById("image-ajout");
imageBtn.addEventListener("input", () => {
  saveImage(imageBtn.files[0]);
});

function saveImage(file) {
  let xhr = getTheBoy();
  let formData = new FormData();
  formData.append("picturePath", file);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var retour = JSON.parse(xhr.responseText);
        console.log(retour);
        if (retour.status == "error") {
          createSidePopUp(retour.detail, "error");
          console.log("Erreur");
        } else {
          console.log(retour.img);
          imagePath = retour.img;
          createSidePopUp(retour.img, "image");
        }
      } else {
        console.log(xhr.status);
      }
    }
  };
  xhr.addEventListener("error", function (event) {
    alert("Oups! Quelque chose s'est mal passé lors de la publication .");
  });
  xhr.open("POST", `../backend/Treatement.php?upload`, true);
  xhr.send(formData);
}

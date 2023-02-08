var imagePath = "";
function setUpUploadFile() {
  let imageBtn = document.getElementById("file-add");
  imageBtn.addEventListener("input", () => {
    saveImage(imageBtn.files[0]);
  });
}

function saveImage(file) {
  let xhr = getTheBoy();
  let formData = new FormData();
  formData.append("fileToUpload", file);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var retour = JSON.parse(xhr.responseText);
        // console.log(retour);
        if (retour.status == "error") {
          createSidePopUp(retour.detail, "error");
        } else {
          imagePath = retour.img;
          addPictureUploaded(imagePath);
          createSidePopUp("Uploaded", "good");
        }
      } else {
        console.log(xhr.status);
      }
    }
  };
  xhr.addEventListener("error", function (event) {
    alert("Oups! Quelque chose s'est mal passé lors de la publication .");
  });
  xhr.open("POST", `${base_url}index.php/Home/uploadFile`, true);
  xhr.send(formData);
}

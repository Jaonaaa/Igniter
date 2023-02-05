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

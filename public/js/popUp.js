const btnHandleData = document.querySelector(".btnHandleProduct");
const formData = document.querySelector(".form-crud");
const barBackground = document.querySelector(".btnChangeColor");
const btnChangeBackground = document.querySelector(".btnChange");
let flagChangeBackgroundColor = false;
const backgroundColorBody = document.getElementById("backgroundColor");
const removePopUp = document.getElementById("remove");


barBackground.onclick = () => {
  console.log(flagChangeBackgroundColor);
  barBackground.classList.toggle("backColorAtive");
  btnChangeBackground.classList.toggle("btnChangeActive");
  if (flagChangeBackgroundColor) {
    flagChangeBackgroundColor = false;
    backgroundColorBody.style.backgroundColor = "#dfe9f5";
  } else {
    flagChangeBackgroundColor = true;
    backgroundColorBody.style.backgroundColor = "#333";
  }
}

btnHandleData.onclick = () => {
  formData.classList.add("formActive");
}

removePopUp.onclick = () => {
  formData.classList.remove("formActive");
}

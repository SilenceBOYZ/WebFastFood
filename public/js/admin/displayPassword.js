const iconHiddens = document.querySelectorAll(".passwordHidden");
const inputPasswordRegist = document.getElementById("Userpassword");
const inputPasswordRegistConfirm = document.getElementById("UserpasswordConfirm");


let checkfirstIcon = true;
let checkSecondIcon = true;
iconHiddens.forEach((icon) => {
  icon.onclick = () => {
    switch (icon.id) {
      case "acc-password-icon-regist":
        if (checkfirstIcon) {
          checkfirstIcon = false;
          iconHiddens[0].querySelector(".straightLine").style.display = "none";
          inputPasswordRegist.type = "Text";
        } else {
          checkfirstIcon = true;
          iconHiddens[0].querySelector(".straightLine").style.display = "block";
          inputPasswordRegist.type = "Password";
        }
        break;
      default:
        if (checkSecondIcon) {
          checkSecondIcon = false;
          iconHiddens[1].querySelector(".straightLine").style.display = "none";
          inputPasswordRegistConfirm.type = "Text";
        } else {
          checkSecondIcon = true;
          iconHiddens[1].querySelector(".straightLine").style.display = "block";
          inputPasswordRegistConfirm.type = "Password";
        }
        break;
    }
  }
})
const toggleBtn = document.querySelector(".toggle");
const navBarMobile = document.querySelector(".navbar-mobile");
const clearErrorInput = document.querySelectorAll(".login-site__form input")
const clearErrorMess = document.querySelectorAll(".login-site__form span.text-error-message")


toggleBtn.onclick = () => {
  toggleBtn.classList.toggle("toggle__active");
  navBarMobile.classList.toggle("active__mobile");
}


const loginAction = document.querySelectorAll(".login-action");
const loginSite = document.querySelector(".login-site");
let loginPage = loginSite.querySelectorAll(".login-site__wrapper");
let closeBtn = document.querySelectorAll(".login-site__button");
let btnChangeSite = document.querySelectorAll(".btn-changeSite");

loginAction.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault()
    if (btn.id === "login") {
      loginSite.style.opacity = "1";
      loginSite.style.visibility = "visible";
      loginPage[0].classList.add("activeSite");
      loginPage[1].classList.remove("activeSite");
      // loginSite[0].style.transform = "translate-x(100%)";
    } else {
      loginSite.style.opacity = "1";
      loginSite.style.visibility = "visible";
      loginPage[0].classList.remove("activeSite");
      loginPage[1].classList.add("activeSite");
    }
  });
});

closeBtn.forEach(btn => {
  btn.onclick = (e) => {
    loginSite.style.opacity = "0";
    loginSite.style.visibility = "hidden";
    clearErrorInput.forEach(input => {
      input.classList.remove("input-active");
    })
    clearErrorMess.forEach(message => {
      message.style.display = "none";
    })
  }
});

btnChangeSite.forEach(btnChangeSite => {
  btnChangeSite.addEventListener("click", (e) => {
    e.preventDefault();
    loginPage[0].classList.toggle("activeSite");
    loginPage[1].classList.toggle("activeSite");
  })
})


// Phần ẩn hiện password

const iconHiddens = document.querySelectorAll(".passwordHidden");
const inputPassword = document.getElementById("account-password");
const inputPasswordRegist = document.getElementById("account-password-register");
const inputPasswordRegistConfirm = document.getElementById("confirm-password-register");



let checkfirstIcon = true;
let checkfirstSecond = true;
let checkfirstThird = true;
iconHiddens.forEach((icon) => {
  icon.onclick = () => {
    switch (icon.id) {
      case "acc-password-icon":
        if (checkfirstIcon) {
          checkfirstIcon = false;
          iconHiddens[0].querySelector(".straightLine").style.display = "none";
          inputPassword.type = "Text";
        } else {
          checkfirstIcon = true;
          iconHiddens[0].querySelector(".straightLine").style.display = "block";
          inputPassword.type = "Password";
        }
        break;
      case "acc-password-icon-regist":
        if (checkfirstSecond) {
          checkfirstSecond = false;
          iconHiddens[1].querySelector(".straightLine").style.display = "none";
          inputPasswordRegist.type = "Text";
        } else {
          checkfirstSecond = true;
          iconHiddens[1].querySelector(".straightLine").style.display = "block";
          inputPasswordRegist.type = "Password";
        }
        break;
      default:
        if (checkfirstThird) {
          checkfirstThird = false;
          iconHiddens[2].querySelector(".straightLine").style.display = "none";
          inputPasswordRegistConfirm.type = "Text";
        } else {
          checkfirstThird = true;
          iconHiddens[2].querySelector(".straightLine").style.display = "block";
          inputPasswordRegistConfirm.type = "Password";
        }
        break;
    }
  }
})
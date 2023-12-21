const menus = document.querySelectorAll(".daily-menu__details");

menus.forEach(menu => {
  menu.addEventListener("mouseenter", (e) => {
    menus.forEach(item => {
      item.classList.remove("active_menuDetails");
    })
    menu.classList.add("active_menuDetails");
  });
});


const icon = document.querySelectorAll(".shop-menu__statusIcon");

console.log(icon);


// Làm phần tăng giảm item




const toggleBtn = document.querySelector(".toggle");
const navBarMobile = document.querySelector(".navbar-mobile");

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
  }
});

btnChangeSite.forEach(btnChangeSite => {
  btnChangeSite.addEventListener("click", (e) => {
    e.preventDefault();
    loginPage[0].classList.toggle("activeSite");
    loginPage[1].classList.toggle("activeSite");
  })
})

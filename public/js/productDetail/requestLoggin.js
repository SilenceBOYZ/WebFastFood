const buttons = document.querySelector(".item-Details__purchase").querySelectorAll("a");
 
buttons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    loginSite.style.opacity = "1";
    loginSite.style.visibility = "visible";
    loginPage[0].classList.add("activeSite");
    loginPage[1].classList.remove("activeSite");
  })
})

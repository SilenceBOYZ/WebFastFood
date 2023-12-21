const openLogSite = document.querySelectorAll(".open-sideLog");

openLogSite.forEach((openBtn) => {
  openBtn.addEventListener("click", () =>{
    console.log("login");
    if (openBtn.id == "btn-mobileLogin") {
      loginSite.style.opacity = "1";
      loginSite.style.visibility = "visible";
      loginPage[0].classList.add("activeSite");
      loginPage[1].classList.remove("activeSite");
    } else {
      loginSite.style.opacity = "1";
      loginSite.style.visibility = "visible";
      loginPage[0].classList.remove("activeSite");
      loginPage[1].classList.add("activeSite");
    }
  })
})

// if(openLogSite.id == "btn-mobileLogin")

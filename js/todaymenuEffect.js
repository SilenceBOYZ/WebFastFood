const menus = document.querySelectorAll(".daily-menu__details");

menus.forEach(menu => {
  menu.addEventListener("mouseenter", (e) => {
    menus.forEach(item => {
      item.classList.remove("active_menuDetails");
    })
    menu.classList.add("active_menuDetails");
  });
});
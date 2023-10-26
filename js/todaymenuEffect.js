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

let inputValue = document.querySelectorAll(".item-Details__input");
let btnItem = document.querySelectorAll(".item-Details__button");
let itemPrice = document.querySelector(".item-Details__price");


inputValue.forEach(input => {
  btnItem.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (btn.id === "left") {
        let ketqua = parseInt(input.value);
        if (ketqua <= 1) {
          input.value = 1;
        } else {
          ketqua -= 1;
          input.value = ketqua.toString();
        }

      } else {
        let ketqua = parseInt(input.value);
        ketqua += 1;
        input.value = ketqua.toString();
      }
    });
  })
})


const toggleBtn = document.querySelector(".toggle");
const navBarMobile = document.querySelector(".navbar-mobile");

toggleBtn.onclick = () => {
  toggleBtn.classList.toggle("toggle__active");
  navBarMobile.classList.toggle("active__mobile");
}

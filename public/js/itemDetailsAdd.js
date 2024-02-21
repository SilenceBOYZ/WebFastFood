let inputValue = document.querySelectorAll(".item-Details__input");
let btnItem = document.querySelectorAll(".item-Details__button");
let itemPrice = document.querySelector(".item-Details__price");


inputValue.forEach(input => {
  btnItem.forEach(btn => {
    btn.setAttribute("type", "button");
    btn.addEventListener("click", (e) => {
      if (btn.id === "left") {
        let ketqua = parseInt(input.value);
        if (ketqua <= 1) {
          input.value = 1;
          input.setAttribute("value", ketqua);
        } else {
          ketqua -= 1;
          input.value = ketqua.toString();
          input.setAttribute("value", ketqua);
        }

      } else {
        let ketqua = parseInt(input.value);
        ketqua += 1;
        input.value = ketqua.toString();
        input.setAttribute("value", ketqua);
      }
    });
  })
})
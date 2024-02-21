const additionalItem = document.querySelectorAll(".item-Details__itemAddition");

additionalItem.forEach((item) => {
  item.addEventListener("click", () => {
    let itemcheck = item.querySelector(".item-Details__itemCheck");
    if(itemcheck.checked) {
      itemcheck.checked = false;
    } else {
      itemcheck.checked = true;
    }
  })
})
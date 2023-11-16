
const items = document.querySelectorAll(".order-menu__itemAction");
let containSlide = document.querySelector(".order-menu__titleContain");
let previousXPosition = 0;
let positionToMove = -145;
let CountItem = 0;
function updateI() {
  if (CountItem === items.length) {
    previousXPosition = 0;
    CountItem = 0;
    containSlide.style.transform = `translate3d(${previousXPosition}px, 0px, 0px)`;
    return;
  }
  CountItem++;
  containSlide.style.transform = `translate3d(${previousXPosition += positionToMove}px, 0px, 0px)`
}

let Count = () => {
  setInterval(updateI, 5000);
}

Count();
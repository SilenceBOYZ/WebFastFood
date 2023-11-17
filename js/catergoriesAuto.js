
const items = document.querySelectorAll(".order-menu__itemAction");
let containSlide = document.querySelector(".order-menu__titleContain");
let btns = document.querySelectorAll(".order-menu__btnMoveSlide");
let previousXPosition = 0;
let positionToMove = -145;

let CountItem = 0;


function slideMoving() {
  if (CountItem > items.length - 5) {
    previousXPosition = 0;
    CountItem = 0;
    containSlide.style.transition = `none`;
    containSlide.style.transform = `translate3d(${previousXPosition}px, 0px, 0px)`;
    return;
  }
  containSlide.style.transition = "2s all";
  CountItem++;
  containSlide.style.transform = `translate3d(${previousXPosition += positionToMove}px, 0px, 0px)`
  positionToMove = -145;
}


btns.forEach((btn) => {
  btn.onclick = () => {
    if (btn.id === "movingLeft") {
      if(previousXPosition === 0) return;
      CountItem--;
      positionToMove = 145;
      slideMoving();
    } else if (btn.id === "movingRight") {
      slideMoving();
    }
  }
})


let timeToSlide = () => {
  setInterval(slideMoving, 5000);
}

timeToSlide();
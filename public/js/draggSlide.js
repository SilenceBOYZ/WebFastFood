const carousel = document.querySelector(".daily-menu__sildes");
const carouselButton = document.querySelectorAll(".daily-menu__button");
const firstDivWidth = carousel.querySelectorAll(".daily-menu__details")[0];
const slideLength = carousel.querySelectorAll(".daily-menu__details");
let count = 0;

const scrollDistance = firstDivWidth.clientWidth + 20;

carouselButton.forEach(icon =>{
  icon.onclick = () => {
    carousel.scrollLeft += icon.id == "daily-menu__button--left-icon" ? -scrollDistance : scrollDistance;
  }
})


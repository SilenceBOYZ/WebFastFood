const carousel = document.querySelector(".daily-menu__sildes");
const carouselButton = document.querySelectorAll(".daily-menu__button");
const firstDivWidth = carousel.querySelectorAll(".daily-menu__details")[0];
const lastDivWidth = carousel.querySelectorAll(".daily-menu__details:last-child");

console.log(lastDivWidth);
const scrollDistance = firstDivWidth.clientWidth + 20;

carouselButton.forEach(icon =>{
  icon.onclick = () => {
    console.log(carousel.scrollLeft);
    carousel.scrollLeft += icon.id == "daily-menu__button--left-icon" ? -scrollDistance : scrollDistance;
  }
})


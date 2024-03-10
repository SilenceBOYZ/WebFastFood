const items = document.querySelectorAll(".order-menu__itemAction");
let containSlide = document.querySelector(".order-menu__titleContain");
let btns = document.querySelectorAll(".order-menu__btnMoveSlide");
let container = document.querySelector(".order-menu__slideWrapper");

let previousXPosition = 0;
let positionToMove = -items[0].scrollWidth - 20;
const mobileWidth = 550;
let CountItem = 0;
let lengthToReset = 4;


function slideMoving() {
  if (CountItem > items.length - lengthToReset) {
    previousXPosition = 0;
    CountItem = 0;
    setTimeout(() => {
      // containSlide.style.transition = `none`;
      containSlide.style.transform = `translate3d(${previousXPosition}px, 0px, 0px)`;
    }, 1000);
    return;
  }
  containSlide.style.transition = "2s all";
  CountItem++;
  containSlide.style.transform = `translate3d(${(previousXPosition +=
    positionToMove)}px, 0px, 0px)`;
  positionToMove = -items[0].scrollWidth - 20;
}

let timeToSlide = () => {
  setInterval(slideMoving, 4000);
};

let examWindowWidth = () => {
  if (window.innerWidth <= mobileWidth) {
    // Kiểm tra xem kích thước có đang ở thiết bị điện thoai hay không
    btns.forEach((btn) => {
      btn.style.display = "none";
    });
    var isMouseDown = false;
    var startX, startScrollLeft;

    container.addEventListener("touchstart", function (e) {
      isMouseDown = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      startScrollLeft = container.scrollLeft;
    });

    container.addEventListener("touchmove", function (e) {
      if (!isMouseDown) return;
      var mouseX = e.touches[0].pageX - container.offsetLeft;
      var moveX = mouseX - startX;

      container.scrollLeft = startScrollLeft - moveX;
    });

    container.addEventListener("touchend", function () {
      isMouseDown = false;
    });

    container.addEventListener("touchcancel", function () {
      isMouseDown = false;
    });
  } else {
    btns.forEach((btn) => {
      btn.onclick = () => {
        if (btn.id === "movingLeft") {
          if (previousXPosition === 0) return;
          if (CountItem < 0) return;
          CountItem--;
          positionToMove = -items[0].scrollWidth - 20;
          slideMoving();
        } else if (btn.id === "movingRight") {
          slideMoving();
        }
      };
    });

    timeToSlide();
  }
}

examWindowWidth();
// LengthToReset là Item hiển trong slide (4 item)
// Sau đó ta sẽ dùng items.length chứa tất cả (Element) trừ đi cho LengthToReset để tính ra được số lần được chuyển Slide
// Nếu quá số lần chuyển slide thì sẽ quay lại slide ban đầu






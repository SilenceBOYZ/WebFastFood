let tabContent = document.querySelector(".tab-content");
let tabGraphic = document.querySelector(".tab-graphic");
let tabComment = document.querySelector(".tab-comment");
let tabPanel = document.querySelectorAll(".tab-panel__item");
tabPanel.forEach(tab => {
  tab.addEventListener("click", (e) => {
    tabPanel.forEach(tab => {
      tab.classList.remove("tab-panel__item--active")
    })
    console.log(tab.id);
    switch (tab.id) {
      case "tab-graphic":
        tabContent.style.display = "none";
        tabGraphic.style.display = "block";
        tabComment.style.display = "none";
        break;
      case "tab-comment":
        tabContent.style.display = "none";
        tabComment.style.display = "block";
        tabGraphic.style.display = "none";
        break;
      default:
        tabContent.style.display = "block";
        tabComment.style.display = "none";
        tabGraphic.style.display = "none";
        break;
    }
    tab.classList.add("tab-panel__item--active");
  })
})
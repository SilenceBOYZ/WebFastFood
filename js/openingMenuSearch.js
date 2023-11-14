const btnSearch = document.getElementById("btnFindMenuSearch");
const catergory = document.getElementById("catergories");
const removeCatergoryBtn = document.getElementById("catergories__removeBtn");

console.log(catergory);

btnSearch.onclick = () => {
  catergory.classList.toggle("movingSlide");
}

removeCatergoryBtn.onclick = () => {
  catergory.classList.toggle("movingSlide");
}
const slides = document.querySelectorAll(".card-order");

slides.forEach(slide => {
    slide.addEventListener("mouseenter", (e) =>{
        // Ta sẽ remove các class hiện tại có active khi có sự kiện mouseenter.
        // Sau đó thêm class active vào element đang có sự kiện
      slides.forEach(slider => {
        // Dùng forEach để remove hết tất cả các class chứa active
        slider.classList.remove("active_card"); 
        // Remove các class đang có class active
      });
        // Sau đó add class active vào element đang có sự kiện mouseenter.
      slide.classList.add("active_card");
    });
});






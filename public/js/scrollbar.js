const bannerHome = document.querySelector('.banner-homepage');
const bannerShop = document.querySelector('.shopStyle-banner');

const headerScroll = [
  bannerHome,
  bannerShop
];
  
  const obs = new IntersectionObserver(function(entries){
    const ent = entries[0];
    if(ent.isIntersecting === false){
      document.body.classList.add('sticky');
    }
  
    if(ent.isIntersecting){
      document.body.classList.remove('sticky');
    }
  }, {
    // In the viewport
    // root 
    root: null,
    threshold: 0,
    rootMargin: '0px'
  });
  
  for(let i = 0; i < headerScroll.length; i++){
    if(headerScroll[i] === null){
      continue;
    }
    obs.observe(headerScroll[i]);
  }


// 

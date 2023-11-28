const headerScroll = document.querySelector('.banner-homepage');

const obs = new IntersectionObserver(function(entries){
  const ent = entries[0];
  console.log(ent);
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

obs.observe(headerScroll);
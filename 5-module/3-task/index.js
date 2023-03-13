function initCarousel() {  
  const wrapper = document.querySelector('[data-carousel-holder]');
  const inner = wrapper.querySelector('.carousel__inner');
  const slidesAmount = wrapper.querySelectorAll('.carousel__slide').length;
  const arrowLeft = wrapper.querySelector('.carousel__arrow_left');
  const arrowRight = wrapper.querySelector('.carousel__arrow_right');
  let current = 0;

  update();

  wrapper.addEventListener('click', ({target}) => {
    if (target.closest('.carousel__arrow_right')) {
      next();
    }

    if (target.closest('.carousel__arrow_left')) {
      prev();
    }
  });  
  
  function next() {
    current++;
    update();
  }

  function prev() {
    current--;
    update();
  }

  function update() {
    inner.style.transform = `translateX(${-inner.offsetWidth * current}px)`;

    if (current >= slidesAmount - 1) {
      arrowRight.style.display = 'none';
    } else {
      arrowRight.style.display = '';
    }

    if (current <= 0) {
      arrowLeft.style.display = 'none';
    } else {
      arrowLeft.style.display = '';
    }
  }
}

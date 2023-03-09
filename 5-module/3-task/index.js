function initCarousel() {
  const inner = document.querySelector('.carousel__inner');
  const slidesCount = document.querySelectorAll('.carousel__slide').length;
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const arrowRight = document.querySelector('.carousel__arrow_right');
  let current = 0;
  let width;

  arrowLeft.style.display = 'none';

  arrowLeft.onclick = function() {
    arrowRight.style.display = '';
    translate(--current);
    if (current <= 0) this.style.display = 'none';
  }
  
  arrowRight.onclick = function() {
    arrowLeft.style.display = '';
    translate(++current);
    if (current >= slidesCount - 1) this.style.display = 'none';
  }

  function translate(current) {
    width = document.querySelector('.carousel__slide').offsetWidth;
    inner.style.transform = `translateX(${current * width * -1}px)`;
  }
}

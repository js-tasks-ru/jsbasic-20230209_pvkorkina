function initCarousel() {
  const width = document.querySelector('[data-carousel-holder]').offsetWidth;
  const slidesCount = document.querySelectorAll('.carousel__slide').length;
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const arrowRight = document.querySelector('.carousel__arrow_right');
  let position = 0;

  arrowLeft.style.display = 'none';

  arrowLeft.onclick = function() {
    arrowRight.style.display = '';
    position += width;
    translate(position);
    if (position >= 0) this.style.display = 'none';
  }
  
  arrowRight.onclick = function() {
    arrowLeft.style.display = '';
    position -= width;
    translate(position);
    if ( position <= -1 * width * (slidesCount - 1) ) this.style.display = 'none';
  }

  function translate(position) {
    document.querySelector('.carousel__inner').style
      .transform = `translateX(${position}px)`;
  }
}

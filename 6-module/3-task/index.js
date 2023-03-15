import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
      </div>
    `);

    for (let slide of this.slides) {
      let slideElem = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}"
            class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);

      this.elem.querySelector('.carousel__inner').append(slideElem);
    }

    this.elem.addEventListener('click', this.onClick);

    this.initCarousel();

    return this.elem;
  }

  onClick = ({target}) => {
    let button = target.closest('.carousel__button');

    if (button) {
      let customEv = new CustomEvent('product-add', {
        detail: button.closest('.carousel__slide').dataset.id,
        bubbles: true
      });
      this.elem.dispatchEvent(customEv);
    }
  }

  initCarousel() {
    const inner = this.elem.querySelector('.carousel__inner');
    const slidesAmount = this.slides.length;
    const arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    const arrowRight = this.elem.querySelector('.carousel__arrow_right');
    let current = 0;

    update();

    this.elem.addEventListener('click', ({target}) => {
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
}

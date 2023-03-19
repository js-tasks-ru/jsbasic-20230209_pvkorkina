import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps"></div>
      </div>
    `);

    for (let i = 0; i < this.steps; i++) {
      this.sub('steps').append(createElement('<span></span>'));
    }

    this.update();
    
  }

  addEventListeners() {
    this.elem.onclick = event => {

      if (event.target.matches('.slider__steps span')) {

        this.value = Array.from(this.sub('steps').children).indexOf(event.target);

      } else {

        let sliderBox = this.sub('steps').getBoundingClientRect();
        let sliderX = event.pageX - sliderBox.left;
        let stepSize = Math.round( sliderBox.width / (this.steps - 1) );
        this.value = Math.round(sliderX / stepSize);

      }

      let customEv = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      });

      this.elem.dispatchEvent(customEv);

      this.update();
    }
  }

  sub(ref) {
    return this.elem.querySelector(`.slider__${ref}`);
  }

  update() {

    this.sub('value').textContent = this.value;

    this.elem.querySelector('.slider__step-active')
      ?.classList.remove('slider__step-active');

    this.sub('steps').children[this.value]
      .classList.add('slider__step-active');

    let leftPercents = Math.round(100 / (this.steps - 1) * this.value);

    this.sub('thumb').style.left = `${leftPercents}%`;
    this.sub('progress').style.width = `${leftPercents}%`;

  }
}

import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segments = steps - 1;
    this.render();
    this.addEventListeners();
    this.updateSlider(value);
  }

  render() {
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          ${"<span></span>".repeat(this.steps)}
        </div>
      </div>
    `);
  }  

  addEventListeners() {
    this.sub('thumb').ondragstart = () => false;
    this.sub('thumb').onpointerdown = this.onPointerDown;
    this.elem.onclick = this.onClick;
  }

  onClick = event => {
    if ( event.target.closest('.slider__thumb') ) {
      return;
    }

    let leftRelative = this.calcLeftByEvent(event);
    let approximateValue = leftRelative * this.segments;
    let value = Math.round(approximateValue);
    this.updateSlider(value);
    this.dispatchChangeEvent();
  }

  onPointerDown = () => {
    this.elem.classList.add('slider_dragging');
    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  onPointerMove = event => {
    let leftRelative = this.calcLeftByEvent(event);
    let leftPercents = leftRelative * 100;
    let approximateValue = leftRelative * this.segments;
    let value = Math.round(approximateValue);
    this.updateSlider(value, leftPercents);
  }

  onPointerUp = () => {
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);
    this.elem.classList.remove('slider_dragging');

    this.setProgressStyles();
    this.dispatchChangeEvent();
  }

  dispatchChangeEvent() {
    let customEv = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(customEv);
  } 

  updateSlider(value, leftPercents=false) {
    this.setValue(value);
    this.setActiveStep();
    this.setProgressStyles(leftPercents);
  }

  setValue(value) {
    this.value = value;
    this.sub('value').textContent = this.value;
  }

  setActiveStep() {
    this.sub('step-active')?.classList.remove('slider__step-active');
    this.sub('steps').children[this.value]
      .classList.add('slider__step-active');
  }   

  setProgressStyles(leftPercents=false) {
    leftPercents = leftPercents || this.calcProgressLeft();
    this.sub('thumb').style.left = `${leftPercents}%`;
    this.sub('progress').style.width = `${leftPercents}%`;
  }

  calcProgressLeft() {
    return Math.round(100 / this.segments * this.value);
  }

  calcLeftByEvent(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    return leftRelative;
  }

  sub(ref) {
    return this.elem.querySelector(`.slider__${ref}`);
  }
}

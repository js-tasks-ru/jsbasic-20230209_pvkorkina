import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner"></nav>
        <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    let categories = this.categories.map(item => createElement(`
      <a href="#"
        class="ribbon__item ${item.id ? '' : 'ribbon__item_active'}"
        data-id="${item.id}">${item.name}
      </a>
    `));

    this.sub('inner').append(...categories);

    this.sub('arrow_right').classList.add('ribbon__arrow_visible');
  }

  addEventListeners() {
    this.elem.onclick = event => {
      let link = event.target.closest('[data-id]');
  
      if (link) {
        event.preventDefault();

        this.elem.querySelector('.ribbon__item_active')
          .classList.remove('ribbon__item_active');          
        link.classList.add('ribbon__item_active');

        let customEv = new CustomEvent('ribbon-select', {
          detail: link.dataset.id,
          bubbles: true
        });

        this.elem.dispatchEvent(customEv);
      }

      if (event.target.closest('.ribbon__arrow_right')) {
        this.scrollRight();
      }

      if (event.target.closest('.ribbon__arrow_left')) {
        this.scrollLeft();
      }
    }

    this.sub('inner').onscroll = () => {
      this.updateArrows();
    }
  }

  sub(ref) {
    return this.elem.querySelector(`.ribbon__${ref}`);
  }

  scrollRight() {
    this.sub('inner').scrollBy(350, 0);
  }

  scrollLeft() {
    this.sub('inner').scrollBy(-350, 0);
  }

  updateArrows() {
    let scrollLeft = this.sub('inner').scrollLeft;
    let scrollRight = this.sub('inner').scrollWidth -
      this.sub('inner').scrollLeft -
      this.sub('inner').clientWidth;

    if (scrollRight > 0) {
      this.sub('arrow_right').classList.add('ribbon__arrow_visible');
    } else {
      this.sub('arrow_right').classList.remove('ribbon__arrow_visible');
    }

    if (scrollLeft > 0) {
      this.sub('arrow_left').classList.add('ribbon__arrow_visible');
    } else {
      this.sub('arrow_left').classList.remove('ribbon__arrow_visible');
    }
  }
}

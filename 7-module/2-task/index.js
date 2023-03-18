import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title"></h3>
          </div>

          <div class="modal__body"></div>
        </div>

      </div>
    `);
  }

  setTitle(modalTitle) {
    this.sub('title').textContent = modalTitle;
  }

  setBody(modalBody) {
    this.sub('body').append(modalBody);
  }  

  open() {
    document.body.classList.add('is-modal-open');
    document.body.append(this.elem);

    this.elem.onclick = ({target}) => {
      if (target.closest('.modal__close') || !target.closest('.modal__inner')) {
        this.close();
      }
    }

    document.addEventListener('keydown', this.onKeyDown);
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
    document.removeEventListener('keydown', this.onKeyDown);
  }  

  onKeyDown = event => {
    if (event.code === 'Escape') {
      this.close();
    }
  }

  sub(ref) {
    return this.elem.querySelector(`.modal__${ref}`);
  }
}

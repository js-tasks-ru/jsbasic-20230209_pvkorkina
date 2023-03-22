import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    let cartItem = this.cartItems.find(item => {
      return item.product.id === product.id;
    });
    
    if (cartItem) {
      cartItem.count++;
    } else {
      this.cartItems.push({
        product: product,
        count: 1
      });
    }
    
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => {
      return item.product.id === productId;
    });

    cartItem.count += amount;

    if (cartItem.count === 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }
    
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce(
      (totalCount, item) => totalCount + item.count, 0
    );
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (totalPrice, item) => totalPrice + (item.product.price * item.count), 0
    );
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();    
    let div = createElement('<div></div>');

    for (let item of this.cartItems) {
      div.append(this.renderProduct(item.product, item.count));
    }

    let form = this.renderOrderForm();

    div.append(form);

    this.modal.setTitle('Your order');
    this.modal.setBody(div);
    this.modal.open();

    this.modal.elem.addEventListener('click', event => {
      let counterButton = event.target.closest('.cart-counter__button');

      if (counterButton) {
        let productId = counterButton.closest('.cart-product').dataset.productId;
        let amount = counterButton
          .matches('.cart-counter__button_plus') ? 1 : -1;
        this.updateProductCount(productId, amount);
      }
    });

    form.onsubmit = this.onSubmit;
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!document.body.classList.contains('is-modal-open')) {
      return;
    }

    if (this.isEmpty()) {
      this.modal.close();
    }    

    let productId = cartItem.product.id; 
    let modalBody = this.modal.sub('body');

    if (cartItem.count === 0) {

      modalBody.querySelector(`[data-product-id="${productId}"]`).remove();

    } else {

      let productCount = modalBody.querySelector(`
        [data-product-id="${productId}"] .cart-counter__count
      `);
      let productPrice = modalBody.querySelector(`
        [data-product-id="${productId}"] .cart-product__price
      `);

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${
        (cartItem.product.price * cartItem.count).toFixed(2)
      }`;

    }
    
    let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);    
    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
  }

  onSubmit = event => {
    event.preventDefault();

    document.querySelector('[type="submit"]').classList.add('is-loading');

    let fdBody = new FormData(event.target);
    fdBody.append( 'cartItems', JSON.stringify(this.cartItems) );
    
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: fdBody
    })
    .then(response => {

      if (response.ok) {
        this.cartItems = [];
        this.cartIcon.update(this);
        document.querySelector('.modal__title').innerHTML = 'Success!';      
        document.querySelector('.modal__body').innerHTML = `
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>
        `;
      }

    });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}


import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.renderCarousel();
    this.renderRibbon();
    this.renderStepSlider();
    this.renderCartIcon();
    this.renderCart();
    this.products = await this.fetchProducts();
    this.renderProductGrid();

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    this.addEventListeners();
  }

  addEventListeners() {
    document.body.addEventListener('product-add', ({detail}) => {
      let product = this.products.find(item => item.id === detail);
      this.cart.addProduct(product);
    });

    document.body.addEventListener('slider-change', ({detail}) => {
      this.productsGrid.updateFilter({
        maxSpiciness: detail
      });
    });

    document.body.addEventListener('ribbon-select', ({detail}) => {
      this.productsGrid.updateFilter({
        category: detail
      });
    });

    document.getElementById('nuts-checkbox').onchange = event => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked
      });
    }

    document.getElementById('vegeterian-checkbox').onchange = event => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      });
    }
  }

  renderCarousel() {
    this.carousel = new Carousel(slides);
    document.querySelector("[data-carousel-holder]").append(this.carousel.elem);
  }

  renderRibbon() {
    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector("[data-ribbon-holder]").append(this.ribbonMenu.elem);
  }

  renderStepSlider() {
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    document.querySelector("[data-slider-holder]").append(this.stepSlider.elem);
  }

  renderCartIcon() {
    this.cartIcon = new CartIcon();
    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(this.cartIcon.elem);
  }

  renderCart() {
    this.cart = new Cart(this.cartIcon);
  }

  renderProductGrid() {
    this.productsGrid = new ProductsGrid(this.products);
    document.querySelector("[data-products-grid-holder]").append(this.productsGrid.elem);
  }

  async fetchProducts() {
    let result = await fetch("products.json");
    return await result.json();
  }
}

import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);

    this.updateFilter();
  }

  updateFilter(filters = {}) {
    Object.assign(this.filters, filters);

    this.sub('inner').innerHTML = '';

    for (let product of this.products) {
      if (this.filters.noNuts && product.nuts) continue;
      if (this.filters.vegeterianOnly && !product.vegeterian) continue;
      if (this.filters.maxSpiciness < product.spiciness) continue;
      if (
        this.filters.category && this.filters.category !== product.category
      ) continue;
      
      this.sub('inner').append(new ProductCard(product).elem);
    }
  }

  sub(ref) {
    return this.elem.querySelector(`.products-grid__${ref}`);
  }
}

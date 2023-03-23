export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}


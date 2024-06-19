import { Cart } from '@commercetools/platform-sdk';

function containsProduct(cartOfItems: Cart, productId: string): boolean {
  return cartOfItems.lineItems.some((obj) => obj.productId === productId);
}

export default containsProduct;

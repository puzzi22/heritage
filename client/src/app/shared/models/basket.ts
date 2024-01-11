import * as cuid from 'cuid';

export interface BasketItem {
  id: number;
  productName: string;
  price: number;
  discountedPrice?: number | null;
  quantity: number;
  pictureUrl: string;
  composerNames: string[];
  typeNames: string[];
}

export interface Basket {
  id: string;
  items: BasketItem[];
  clientSecret?: string;
  paymentIntentId?: string;
  deliveryMethodId?: number;
  shippingPrice: number;
  totalDiscount: number;
  finalAmount: number;
}

export class Basket implements Basket {
  id = cuid();
  items: BasketItem[] = [];
  shippingPrice = 0;
  totalDiscount = 0;
  finalAmount = 0;

  // Method to calculate totals
  calculateTotals() {
    let subtotal = 0;
    let discount = 0;

    this.items.forEach((item) => {
      subtotal += item.price * item.quantity;
      if (typeof item.discountedPrice === 'number') {
        discount += (item.price - item.discountedPrice) * item.quantity;
      }
    });

    this.totalDiscount = discount;
    this.finalAmount = subtotal - discount + this.shippingPrice;
  }
}

export interface BasketTotals {
  shipping: number;
  subtotal: number;
  total: number;
}

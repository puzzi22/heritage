import * as cuid from 'cuid';

export interface BasketItem {
  id: number;
  productName: string;
  price: number; // Original price of the item
  discountedPrice?: number | null; // Discounted price of the item
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
  totalDiscount: number; // Total discount applied to the basket
  finalAmount: number; // Final total amount after discount
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
  // totalDiscount: number; // Include this property
}

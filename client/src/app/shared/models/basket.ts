import * as cuid from 'cuid';

export interface BasketItem {
  id: number;
  productName: string; // This should match your TypeScript model.
  price: number;
  quantity: number;
  pictureUrl: string; // Make sure this matches your model.
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
}

export class Basket implements Basket {
  id = cuid();
  items: BasketItem[] = [];
  shippingPrice = 0;
}

export interface BasketTotals {
  shipping: number;
  subtotal: number;
  total: number;
}

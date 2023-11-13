import * as cuid from 'cuid';

export interface BasketItem {
  id: number;
  productTitle: string; // This should match your TypeScript model.
  price: number;
  quantity: number;
  pictureUrl1: string; // Make sure this matches your model.
  composerNames: string[];
  typeNames: string[];
}

export interface Basket {
  id: string;
  items: BasketItem[];
}

export class Basket implements Basket {
  id = cuid();
  items: BasketItem[] = [];
}

export interface BasketTotals {
  shipping: number;
  subtotal: number;
  total: number;
}

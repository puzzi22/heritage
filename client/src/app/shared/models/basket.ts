import * as cuid from "cuid"

  export interface BasketItem {
    id: number
    title: string
    price: number
    quantity: number
    pictureUrl1: string
    productComposers: number[]
    productTypes: number[]
  }

  export interface Basket {
    id: string
    items: BasketItem[]
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
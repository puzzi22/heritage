import { Address } from './user';

export interface OrderToCreate {
  basketId: string;
  deliveryMethodId: number;
  shipToAddress: Address;
}

export interface OrderItem {
  productId: number;
  productTitle: string;
  pictureUrl1: string;
  price: number;
  discountedPrice?: number;
  quantity: number;
}
export interface Order {
  id: number;
  buyerEmail: string;
  orderDate: Date;
  shipToAddress: Address;
  deliveryMethod: string;
  shippingPrice: number;
  orderItems: OrderItem[];
  subtotal: number;
  total: number;
  status: string;
}

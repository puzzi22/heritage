import { Component } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss'],
})
export class OrderTotalsComponent {
  constructor(public basketService: BasketService) {}

  hasDiscountedItems(): boolean {
    const basket = this.basketService.getCurrentBasketValue();
  
    if (basket && basket.items) {
      return basket.items.some(
        (item) =>
          item.discountedPrice !== undefined &&
          item.discountedPrice !== null &&
          item.discountedPrice < item.price
      );
    }
  
    return false;
  }
}

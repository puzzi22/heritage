import { Component } from '@angular/core';
import { BasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  constructor(public basketService: BasketService,
    private viewportScroller: ViewportScroller
    ) {}
  incrementQuantity(item: BasketItem) {
    this.basketService.addItemToBasket(item);
  }

  removeItem(event: { id: number; quantity: number }) {
    this.basketService.removeItemFromBasket(event.id, event.quantity);
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}

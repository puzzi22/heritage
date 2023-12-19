import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Composer } from 'src/app/shared/models/composer';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product?: Product;
  composers: Composer[] = [];
  composerNames: string[] = []; // Array to store composer names

  constructor(
    private basketService: BasketService,
    private shopService: ShopService
  ) {}

  ngOnInit() {
    this.shopService.getComposers().subscribe({
      next: (response) => {
        this.composers = response;
        this.setComposerNames();
      },
      error: (error) => console.error(error),
    });
  }

  setComposerNames() {
    if (this.product) {
      this.composerNames = this.product.productComposerIds
        .map((id) => {
          const composer = this.composers.find((c) => c.id === id);
          // return composer ? `${composer.firstName} ${composer.lastName}` : '';
          return composer ? `${composer.lastName}` : '';
        })
        .filter((name) => name);
    }
  }

  addItemToBasket() {
    if (this.product) {
      // Ensure the basket is initialized before adding the item
      this.basketService.initializeOrGetBasket();
      this.basketService.addItemToBasket(this.product);
    }
  }
}

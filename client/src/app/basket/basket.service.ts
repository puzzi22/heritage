import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  forkJoin,
  map,
  switchMap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductComposerDto } from '../interfaces/ProductComposerDto';
import { ProductTypeDto } from '../interfaces/ProductTypeDto';
import { Basket, BasketItem, BasketTotals } from '../shared/models/basket';
import { DeliveryMethod } from '../shared/models/deliveryMethod';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<BasketTotals | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();

  // Add new properties for composers and types
  private composers: ProductComposerDto[] = [];
  private productTypes: ProductTypeDto[] = [];

  constructor(private http: HttpClient, private translate: TranslateService) {}

  createPaymentIntent() {
    return this.http
      .post<Basket>(
        this.baseUrl + 'payments/' + this.getCurrentBasketValue()?.id,
        {}
      )
      .pipe(
        map((basket) => {
          this.basketSource.next(basket);
        })
      );
  }

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    const basket = this.getCurrentBasketValue();
    if (basket) {
      basket.shippingPrice = deliveryMethod.price;
      basket.deliveryMethodId = deliveryMethod.id;
      this.setBasket(basket);
    }
  }

  applyDiscountCode(discountCode: string): Observable<Basket> {
    // console.log('Applying discount code:', discountCode);
    // console.log('applyDiscountCode called with:', discountCode); // Log when the method is called

    const basketId = this.getCurrentBasketValue()?.id;
    if (!basketId) {
      // console.error('Basket ID is null or undefined.');
      return throwError(() => new Error('Basket ID is null or undefined.'));
    }

    // console.log('Sending request to apply discount code. Basket ID:', basketId); // Log the basket ID being used

    return this.http
      .post<Basket>(this.baseUrl + 'basket/apply-discount', {
        Code: discountCode,
        basketId,
      })
      .pipe(
        map((basket: Basket) => {
          // console.log('Discount code applied. Updated basket:', basket);
          // console.log('Discount code applied. Updated basket received:', basket); // Log the received updated basket
          this.basketSource.next(basket);
          this.calculateTotals();
          return basket;
        }),
        catchError((error) => {
          // console.error('Error applying discount code:', error);

          let errorKey = 'defaultErrorMessageKey'; // Default error key
          if (error.error && error.error.messageKey) {
            errorKey = error.error.messageKey;
          }

          return this.translate
            .get(errorKey)
            .pipe(
              switchMap((translatedErrorMessage) =>
                throwError(() => new Error(translatedErrorMessage))
              )
            );
        })
      );
  }

  getProductComposers() {
    return this.http.get<ProductComposerDto[]>(
      this.baseUrl + 'products/composers'
    );
  }

  getProductTypes() {
    return this.http.get<ProductTypeDto[]>(this.baseUrl + 'products/types');
  }

  getBasket(id: string) {
    return this.http.get<Basket>(this.baseUrl + 'basket?id=' + id).subscribe({
      next: (basket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      },
    });
  }

  setBasket(basket: Basket) {
    // console.log('Setting basket:', basket);

    return this.http.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: (basket) => {
        // console.log('Basket updated:', basket);

        this.basketSource.next(basket);
        this.calculateTotals();
      },
    });
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  initializeOrGetBasket(): Basket {
    let basket = this.getCurrentBasketValue();
    if (!basket) {
      basket = this.createBasket();
      this.basketSource.next(basket);
    }
    return basket;
  }

  addItemToBasket(item: Product | BasketItem, quantity = 1) {
    const basket = this.getCurrentBasketValue();
    if (!basket) {
      // console.error('No basket found when trying to add item.');
      return;
    }

    if (this.isProduct(item)) {
      this.mapProductItemToBasketItem(item).subscribe(
        (itemToAdd: BasketItem) => {
          basket.items = this.addOrUpdateItem(
            basket.items,
            itemToAdd,
            quantity
          );
          this.setBasket(basket);
        }
      );
    } else {
      basket.items = this.addOrUpdateItem(basket.items, item, quantity);
      this.setBasket(basket);
    }
  }

  removeItemFromBasket(id: number, quantity = 1) {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;
    const item = basket.items.find((x) => x.id === id);
    if (item) {
      item.quantity -= quantity;
      if (item.quantity === 0) {
        basket.items = basket.items.filter((x) => x.id !== id);
      }
      if (basket.items.length > 0) this.setBasket(basket);
      else this.deleteBasket(basket);
    }
  }
  deleteBasket(basket: Basket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe({
      next: () => {
        this.deleteLocalBasket();
      },
    });
  }

  deleteLocalBasket() {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  private addOrUpdateItem(
    items: BasketItem[],
    itemToAdd: BasketItem,
    quantity: number
  ): BasketItem[] {
    const item = items.find((x) => x.id === itemToAdd.id);
    if (item) item.quantity += quantity;
    else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }

  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  getFullName(composer: ProductComposerDto): string {
    return `${composer.firstName} ${composer.lastName}`;
  }

  private mapProductItemToBasketItem(item: Product): Observable<BasketItem> {
    // Fetch composers and types
    const composers$ = this.getProductComposers();
    const types$ = this.getProductTypes();

    return forkJoin({ composers: composers$, types: types$ }).pipe(
      map((data) => {
        const { composers, types } = data;

        // Map the product composer IDs and type IDs to their full names
        const composerNames = item.productComposerIds
          .map((id) => {
            const composer = composers.find((c) => c.id === id);
            return composer ? this.getFullName(composer) : null;
          })
          .filter((name) => name !== null) as string[];

        const typeNames = item.productTypeIds
          .map((id) => types.find((t) => t.id === id)?.name)
          .filter((name): name is string => !!name); // Ensures that undefined values are filtered out and that the result is an array of strings.

        // Return a new BasketItem with all necessary transformations
        return {
          id: item.id,
          productName: item.title,
          price: item.price,
          discountedPrice: item.price, // Initially set to the same as the price
          quantity: 0,
          pictureUrl: item.pictureUrl1,
          composerNames,
          typeNames,
        };
      })
    );
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;

    // console.log('Calculating totals for basket:', basket);
    const subtotal = basket.items.reduce(
      (a, b) => (b.discountedPrice ?? b.price) * b.quantity + a,
      0
    );
    const total = subtotal + basket.shippingPrice;

    // console.log(`Subtotal: ${subtotal}, Total: ${total}`);
    this.basketTotalSource.next({
      shipping: basket.shippingPrice,
      total,
      subtotal,
    });
  }

  private isProduct(item: Product | BasketItem): item is Product {
    return (item as Product).productComposerIds !== undefined;
  }
}

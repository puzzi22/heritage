import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Composer } from '../shared/models/composer';
import { Product } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { Type } from '../shared/models/type';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  products: Product[] = [];
  composers: Composer[] = [];
  types: Type[] = [];
  shopParams: ShopParams;
  sortOptions = [
    { name: 'sortOptions.alphabetical', value: 'name' },
    { name: 'sortOptions.priceLowToHigh', value: 'priceAsc' },
    { name: 'sortOptions.priceHighToLow', value: 'priceDesc' },
  ];
  totalCount = 0;
  private langChangeSubscription: Subscription;
  private searchUpdated = new Subject<string>();

  constructor(
    private shopService: ShopService,
    private viewportScroller: ViewportScroller,
    private translateService: TranslateService
  ) {
    this.shopParams = shopService.getShopParams();
    this.langChangeSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.getProducts();
    this.setAllLabels();
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(
      () => {
        this.setAllLabels();
      }
    );

    // this.getComposers();
    // this.getTypes();

    this.searchUpdated
      .pipe(
        debounceTime(500) // 300 ms debounce time
      )
      .subscribe((value) => {
        this.onSearchChange(value);
      });
  }

  getProducts() {
    this.shopService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalCount = response.count;
      },
      error: (error) => console.log(error),
    });
  }

  setAllLabels() {
    const allLabel = this.translateService.instant('common.all');
    this.getComposers(allLabel);
    this.getTypes(allLabel);
  }

  getComposers(allLabel: string) {
    this.shopService.getComposers().subscribe({
      next: (response) => {
        this.composers = [
          { id: 0, lastName: allLabel, firstName: '', dates: '' },
          ...response,
        ];
      },
      error: (error) => console.log(error),
    });
  }

  getTypes(allLabel: string) {
    this.shopService.getTypes().subscribe({
      next: (response) => {
        this.types = [{ id: 0, name: allLabel }, ...response];
      },
      error: (error) => console.log(error),
    });
  }

  onComposerSelected(composerId: number) {
    const params = this.shopService.getShopParams();
    params.composerId = composerId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
    this.scrollToTop(); // Scrolls to the top after applying the filter
  }

  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
    this.scrollToTop();
  }

  onSortSelected(event: any) {
    const params = this.shopService.getShopParams();
    params.sort = event.target.value;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
    this.scrollToTop();
  }

  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.shopParams = params;
      this.getProducts();
      this.scrollToTop();
    }
  }

  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm?.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onSearchChange(searchValue: string): void {
    const params = this.shopService.getShopParams();
    params.search = searchValue;
    params.pageNumber = 1; // Reset to the first page
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onKeyUp(searchValue: string) {
    this.searchUpdated.next(searchValue);
  }

  onReset() {
    // Reset the filters using a new instance of ShopParams
    const params = new ShopParams();
    this.shopService.setShopParams(params);
    this.shopParams = params;

    // Reset any UI elements if necessary
    if (this.searchTerm) {
      this.searchTerm.nativeElement.value = '';
    }

    // Fetch the products again with the reset filters
    this.getProducts();
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}

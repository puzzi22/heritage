import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { Composer } from 'src/app/shared/models/composer';
import { Product } from 'src/app/shared/models/product';
import { Type } from 'src/app/shared/models/type';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  quantity = 1;
  quantityInBasket = 0;
  imageUrls: string[] = [];
  selectedImage: string = '';
  selectedImageIndex: number = 0;

  isImageZoomed = false;
  zoomedImage = '';

  composers: Composer[] = [];
  composerNames: string[] = []; // Array to store composer names
  types: Type[] = [];
  typeNames: string[] = []; // Array to store type names

  @ViewChild('mainCarousel') mainCarousel: any; // or OwlCarouselOComponent if appropriate

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {
    this.bcService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
    this.shopService.getComposers().subscribe({
      next: (response) => {
        this.composers = response;
        this.setComposerNames();
      },
      error: (error) => console.error(error),
    });
    this.shopService.getTypes().subscribe({
      next: (response) => {
        this.types = response;
        this.setTypeNames();
      },
      error: (error) => console.error(error),
    });
  }

  setComposerNames() {
    if (this.product) {
      this.composerNames = this.product.productComposerIds
        .map((id) => {
          const composer = this.composers.find((c) => c.id === id);
          return composer ? `${composer.firstName} ${composer.lastName}` : '';
          // return composer ? `${composer.lastName}` : '';
        })
        .filter((name) => name);
    }
  }

  setTypeNames() {
    if (this.product) {
      this.typeNames = this.product.productTypeIds
        .map((id) => {
          const type = this.types.find((c) => c.id === id);
          // return type ? `${t.firstName} ${composer.lastName}` : '';
          return type ? `${type.name}` : '';
        })
        .filter((name) => name);
    }
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id)
      this.shopService.getProduct(+id).subscribe({
        next: (product) => {
          this.product = product;
          this.imageUrls = [
            product.pictureUrl1,
            product.pictureUrl2,
            product.pictureUrl3,
            product.pictureUrl4,
            product.pictureUrl5,
          ].filter((url) => url); // Filter inside the callback
          if (this.imageUrls.length > 0) {
            this.selectedImage = this.imageUrls[0]; // Set the first image as selected by default
          }
          if (this.imageUrls.length > 0) {
            this.selectedImageIndex = 0;
          }
          this.bcService.set('@productDetails', product.title);
          this.basketService.basketSource$.pipe(take(1)).subscribe({
            next: (basket) => {
              const item = basket?.items.find((x) => x.id === +id);
              if (item) {
                this.quantity = item.quantity;
                this.quantityInBasket = item.quantity;
              }
            },
          });
        },
        error: (error) => console.log(error),
      });
  }

  changeImage(index: number) {
    this.selectedImageIndex = index;
    this.selectedImage = this.imageUrls[index];
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  openModal(imageSrc: string) {
    this.zoomedImage = imageSrc;
    this.isImageZoomed = true;
    // this.cdr.detectChanges(); // Manually trigger change detection
  }

  closeModal() {
    this.isImageZoomed = false;
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 0) this.quantity--;
  }

  updateBasket() {
    if (this.product) {
      if (this.quantity > this.quantityInBasket) {
        const itemsToAdd = this.quantity - this.quantityInBasket;
        this.quantityInBasket += itemsToAdd;
        this.basketService.addItemToBasket(this.product, itemsToAdd);
      } else {
        const itemsToRemove = this.quantityInBasket - this.quantity;
        this.quantityInBasket -= itemsToRemove;
        this.basketService.removeItemFromBasket(this.product.id, itemsToRemove);
      }
    }
  }

  get buttonText() {
    const key =
      this.quantityInBasket === 0
        ? 'product.addToBasket'
        : 'product.updateBasket';
    return this.translate.instant(key);
  }
}

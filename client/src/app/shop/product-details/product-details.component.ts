import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { Product } from 'src/app/shared/models/product';
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

  @ViewChild('mainCarousel') mainCarousel: any; // or OwlCarouselOComponent if appropriate

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService,
    private cdr: ChangeDetectorRef
  ) {
    this.bcService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
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
    return this.quantityInBasket === 0 ? 'Add to basket' : 'Update basket';
  }
}

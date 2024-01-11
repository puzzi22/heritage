import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss'],
})
export class CheckoutReviewComponent {
  @Input() appStepper?: CdkStepper;
  discountCode: string = '';
  isDiscountApplied: boolean = false;

  constructor(
    private basketService: BasketService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  applyDiscountCode() {
    if (this.discountCode) {
      this.basketService.applyDiscountCode(this.discountCode).subscribe({
        next: (response) => {
          this.basketService.setBasket(response);
          this.translate
              .get('checkoutReview.success')
              .subscribe((translatedText) => {
                  this.toastr.success(translatedText);
              });
          this.isDiscountApplied = true;
      },
        error: (error) => {
          let errorKey = 'error.defaultErrorKey';
          if (error.error && error.error.messageKey) {
            errorKey = error.error.messageKey;
          }

          this.translate.get(errorKey).subscribe((translatedErrorMessage) => {
            let errorMessage = translatedErrorMessage;

            if (errorKey === translatedErrorMessage) {
              errorMessage = 'error.defaultErrorKey';
            }

            console.error(errorMessage);
            this.toastr.error(errorMessage);
          });
        },
      });
    } else {
      this.translate.get('checkoutReview.error').subscribe((translatedText) => {
        this.toastr.error(translatedText);
      });
    }
  }

  createPaymentIntent() {
    this.basketService.createPaymentIntent().subscribe({
      next: () => {
        this.appStepper?.next();
      },
      error: (error) => this.toastr.error(error.message),
    });
  }
}

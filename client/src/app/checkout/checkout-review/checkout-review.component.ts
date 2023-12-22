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

  constructor(
    private basketService: BasketService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  applyDiscountCode() {
    if (this.discountCode) {
      this.basketService.applyDiscountCode(this.discountCode).subscribe({
        next: (response) => {
          // Handle response, e.g., update the basket total
          this.translate
            .get('checkoutReview.discountApplied')
            .subscribe((translatedText) => {
              this.toastr.success(translatedText);
            });
          // Update the basket display or trigger a re-fetch
        },
        error: (error) => {
          this.translate
            .get('checkoutReview.error')
            .subscribe((translatedText) => {
              this.toastr.error(translatedText);
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

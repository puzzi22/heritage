import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { DeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss'],
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;
  deliveryMethods: DeliveryMethod[] = [];

  constructor(
    private checkoutService: CheckoutService,
    private basketService: BasketService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: (dm) => {
        this.deliveryMethods = dm;
        this.translateMethods();
      },
    });
  }

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    this.basketService.setShippingPrice(deliveryMethod);
  }

  translateMethods() {
    // Update this method to utilize your language service
    // This will ensure that the descriptions are translated based on the current language
    const lang = this.languageService.getLanguage();
    // ... logic to translate methods based on the `lang`
  }
}

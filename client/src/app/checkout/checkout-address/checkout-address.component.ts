import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss'],
})
export class CheckoutAddressComponent {
  @Input() checkoutForm?: FormGroup;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private translate: TranslateService // Inject TranslateService
  ) {}

  saveUserAddress() {
    this.accountService
      .updateUserAddress(this.checkoutForm?.get('addressForm')?.value)
      .subscribe({
        next: () => {
          // Use TranslateService to get the translated message
          this.translate
            .get('shippingAddress.saveSuccess')
            .subscribe((translatedMessage: string) => {
              this.toastr.success(translatedMessage);
            });
          this.checkoutForm
            ?.get('addressForm')
            ?.reset(this.checkoutForm?.get('addressForm')?.value);
        },
      });
  }
}

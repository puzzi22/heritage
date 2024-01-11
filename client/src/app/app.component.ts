import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Héritage';
  constructor(
    private basketService: BasketService,
    private accountService: AccountService,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    const userLang = this.languageService.getLanguage();
    this.translate.setDefaultLang('fr');
    this.translate.use(userLang);
  }

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) this.basketService.getBasket(basketId);
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe();
  }
}

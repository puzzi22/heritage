import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/basket';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  currentLang: string; // Default language

  constructor(
    public basketService: BasketService,
    public accountService: AccountService,
    private translate: TranslateService, // Inject TranslateService
    private languageService: LanguageService
  ) {
    this.currentLang = this.languageService.getLanguage();
    this.translate.use(this.currentLang); // Apply the language
  }

  getCount(items: BasketItem[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  changeLanguage(lang: string): void {
    this.currentLang = lang;
    this.languageService.setLanguage(lang); // This will also update the language in local storage
  }
}

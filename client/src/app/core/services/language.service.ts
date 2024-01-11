import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLang: string = 'fr';

  constructor(private translate: TranslateService) {
    // Load the initial language from storage or browser settings
    this.currentLang = this.getLanguage();
    this.translate.use(this.currentLang);
  }

  setLanguage(lang: string): void {
    this.currentLang = lang;
    localStorage.setItem('language', lang); // Save language preference in local storage
    this.translate.use(lang);
  }

  getLanguage(): string {
    return localStorage.getItem('language') || this.currentLang;
  }
}

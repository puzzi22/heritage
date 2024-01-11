import { Component, OnDestroy } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  Event as RouterEvent,
} from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
})
export class SectionHeaderComponent implements OnDestroy {
  isHomePage: boolean = false;
  private routerEventsSubscription: Subscription;
  private langChangeSubscription: Subscription;

  constructor(
    public bcService: BreadcrumbService,
    private translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // Subscribe to navigation events
    this.routerEventsSubscription = this.router.events
      .pipe(
        filter(
          (event: RouterEvent): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.isHomePage = event.urlAfterRedirects === '/';
      });

    // Subscribe to language change
    this.langChangeSubscription = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.updateBreadcrumbTranslations();
      }
    );

    // Initialize breadcrumbs
    this.updateBreadcrumbTranslations();
  }

  private updateBreadcrumbTranslations() {
    this.bcService.breadcrumbs$.subscribe((breadcrumbs) => {
      breadcrumbs.forEach((breadcrumb) => {
        if (
          breadcrumb.alias === 'orderDetailed' ||
          breadcrumb.alias === 'productDetails'
        ) {
          // Skip translation for these breadcrumbs
          return;
        } else if (typeof breadcrumb.alias === 'string') {
          this.translate.get(breadcrumb.alias).subscribe((translatedLabel) => {
            breadcrumb.label = translatedLabel;
          });
        } else if (typeof breadcrumb.label === 'string') {
          this.translate.get(breadcrumb.label).subscribe((translatedLabel) => {
            breadcrumb.label = translatedLabel;
          });
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription?.unsubscribe();
    this.langChangeSubscription?.unsubscribe();
  }
}

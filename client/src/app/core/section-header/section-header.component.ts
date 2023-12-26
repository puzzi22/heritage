import { Component, OnDestroy } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  Event as RouterEvent,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
        // Update isHomePage based on the current URL
        this.isHomePage = event.urlAfterRedirects === '/';
      });

    // Subscribe to breadcrumbs
    this.bcService.breadcrumbs$.subscribe((breadcrumbs) => {
      breadcrumbs.forEach((breadcrumb) => {
        if (breadcrumb.alias === 'orderDetailed') {
          // Do not translate, already set dynamically in OrderDetailedComponent
          return;
        } else if (breadcrumb.alias === 'productDetails') {
          // Skip translation for product details
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
    // Unsubscribe to avoid memory leaks
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }
}

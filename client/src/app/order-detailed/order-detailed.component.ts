import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Order } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders/orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss'],
})
export class OrderDetailedComponent implements OnInit {
  order?: Order;
  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private bcService: BreadcrumbService,
    private changeDetectorRef: ChangeDetectorRef, // Inject ChangeDetectorRef
    private translate: TranslateService // Inject TranslateService
  ) {
    // this.bcService.set('@orderDetailed', '');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.orderService.getOrderDetailed(+id).subscribe({
        next: (order) => {
          this.order = order;
          // Translate the breadcrumb label with dynamic values
          this.translate
            .get('orderDetails', { id: order.id, status: order.status })
            .subscribe((translatedLabel) => {
              this.bcService.set('@orderDetailed', translatedLabel);
              this.changeDetectorRef.detectChanges(); // Trigger change detection if needed
            });
        },
        error: (err) => {
          console.error('Error fetching order:', err);
          // Handle error, maybe redirect or show a message
        },
      });
    } else {
      // Handle case where id is not available, maybe redirect or show an error
    }
  }
}

import { Component, OnInit } from '@angular/core';
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
    private translate: TranslateService
  ) {
    this.bcService.set('@OrderDetailed', ' ');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.orderService.getOrderDetailed(+id).subscribe({
        next: (order) => {
          this.order = order;
          // Translate the label with dynamic content
          const translatedLabel = this.translate.instant('orderDetails', {
            id: order.id,
            status: order.status,
          });
          // Set the breadcrumb label
          this.bcService.set('@OrderDetailed', translatedLabel);
        },
        // ... error handling
      });
    }
  }
}

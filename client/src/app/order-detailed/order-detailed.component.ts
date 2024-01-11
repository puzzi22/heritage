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
    private changeDetectorRef: ChangeDetectorRef,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.orderService.getOrderDetailed(+id).subscribe({
        next: (order) => {
          this.order = order;
          this.translate
            .get('status.' + order.status)
            .subscribe((translatedStatus) => {
              const breadcrumbLabel = this.translate.instant('orderDetails', {
                id: order.id,
                status: translatedStatus,
              });
              this.bcService.set('@orderDetailed', breadcrumbLabel);
              this.changeDetectorRef.detectChanges();
            });
        },
      });
    } else {
    }
  }
}

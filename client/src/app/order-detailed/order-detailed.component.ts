import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private changeDetectorRef: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {
    console.log('Here we are');
    this.bcService.set('@OrderDetailed', '');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    id &&
      this.orderService.getOrderDetailed(+id).subscribe({
        next: (order) => {
          this.order = order;
          console.log(order);
          this.bcService.set(
            '@OrderDetailed',
            `Order #${order.id} - ${order.status}`
          );
          console.log(
            `Breadcrumb set to: Order #${order.id} - ${order.status}`
          );
          // Manually trigger change detection
          this.changeDetectorRef.detectChanges();
        },
      });
  }
}

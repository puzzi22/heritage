import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
@NgModule({
  declarations: [OrdersComponent],
  imports: [CommonModule, OrdersRoutingModule, TranslateModule],
})
export class OrdersModule {}

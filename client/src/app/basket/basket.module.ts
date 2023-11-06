import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './basket.component';

@NgModule({
  declarations: [BasketComponent],
  imports: [CommonModule, BasketRoutingModule, SharedModule, RouterModule],
})
export class BasketModule {}

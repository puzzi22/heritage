import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './basket.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [BasketComponent],
  imports: [CommonModule, BasketRoutingModule, SharedModule, RouterModule, TranslateModule],
})
export class BasketModule {}

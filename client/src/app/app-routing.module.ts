import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { breadcrumb: { alias: 'breadcrumb.home' } },
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    data: { breadcrumb: { alias: 'breadcrumb.about-us' } },
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { breadcrumb: { alias: 'breadcrumb.contact' } },
  },
  {
    path: 'test-error',
    component: TestErrorComponent,
    data: { breadcrumb: 'breadcrumb.test-error' },
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: { breadcrumb: 'breadcrumb.not-found' },
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
    data: { breadcrumb: 'breadcrumb.server-error' },
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then((m) => m.ShopModule),
    data: { breadcrumb: 'breadcrumb.shop' },
  },
  {
    path: 'basket',
    loadChildren: () =>
      import('./basket/basket.module').then((m) => m.BasketModule),
    data: { breadcrumb: 'breadcrumb.basket' },
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./checkout/checkout.module').then((m) => m.CheckoutModule),
    data: { breadcrumb: 'breadcrumb.checkout' },
  },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
    data: { breadcrumb: 'breadcrumb.orders' },
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
    data: { breadcrumb: 'breadcrumb.account' },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top', // Add this line
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, finalize } from 'rxjs';
import { BusyService } from '../services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private busyService: BusyService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      request.url.includes('emailExists') ||
      request.method === 'POST' && request.url.includes('orders') ||
      request.method === 'DELETE'
    ) {
      return next.handle(request);
    }

    this.busyService.busy();
    return next.handle(request).pipe(
      delay(1000),
      finalize(() => this.busyService.idle())
    );
  }
}

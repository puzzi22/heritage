import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, finalize, identity } from 'rxjs';
import { environment } from 'src/environments/environment';
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
      (request.method === 'POST' && request.url.includes('orders')) ||
      request.method === 'DELETE'
    ) {
      return next.handle(request);
    }

    this.busyService.busy();
    return next.handle(request).pipe(
      environment.production ? identity : delay(1000),
      finalize(() => this.busyService.idle())
    );
  }
}

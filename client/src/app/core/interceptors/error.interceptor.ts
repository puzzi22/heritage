import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let translatedErrorMessage = ''; // Initialize variable

        if (error) {
          const errorKey = `error.${error.error.message}`; // Assuming error.error.message contains the key
          translatedErrorMessage = this.translate.instant(errorKey);

          if (error.status === 400) {
            if (error.error.errors) {
              throw error.error;
            } else {
              this.toastr.error(
                translatedErrorMessage,
                error.status.toString()
              );
            }
          }
          if (error.status === 401) {
            this.toastr.error(translatedErrorMessage, error.status.toString());
          }
          if (error.status === 404) {
            this.router.navigateByUrl('/not-found');
          }
          if (error.status === 500) {
            const navigationExtras: NavigationExtras = {
              state: { error: error.error },
            };
            this.router.navigateByUrl('/server-error', navigationExtras);
          }
        }
        return throwError(() => new Error(translatedErrorMessage));
      })
    );
  }
}

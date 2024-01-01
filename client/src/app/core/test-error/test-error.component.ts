import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss'],
})
export class TestErrorComponent {
  baseUrl = environment.apiUrl;
  validationErrors: string[] = [];

  constructor(private http: HttpClient, private translate: TranslateService) {}

  get404Error() {
    this.http.get(this.baseUrl + 'products/142').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  get400ValidationError() {
    this.http.get(this.baseUrl + 'products/hundredfortytwo').subscribe({
      next: (response) => console.log(response),
      error: (error) => {
        console.log(error);
        this.validationErrors = this.translateValidationErrors(error.errors);
      },
    });
  }
  
  translateValidationErrors(errors: string[]): string[] {
    return errors.map(error => {
      if (error === "The value 'hundredfortytwo' is not valid.") {
        return this.translate.instant('error.invalidValue'); // 'error.invalidValue' should be the key in your translation files
      }
      return error;
    });
  }
}

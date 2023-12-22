// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { map } from 'rxjs/operators'; // Ensure correct import

// @Injectable({
//   providedIn: 'root',
// })
// export class ContactService {
//   private api = 'https://formspree.io/f/xpzvajbr';

//   constructor(private http: HttpClient) {}

//   PostMessage(input: any) {
//     return this.http.post(this.api, input, { responseType: 'text' }).pipe(
//       map(
//         (response) => {
//           // Process and return the response
//           return response;
//         },
//         (error: any) => {
//           // Process and return the error
//           return error;
//         }
//       )
//     );
//   }


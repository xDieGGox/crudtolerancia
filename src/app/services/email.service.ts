import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrls = [
    'http://34.44.71.125:3000/send',
    'http://34.16.215.68:3000/send' // URL alternativa
  ];
  private currentUrlIndex = 0;

  //private apiUrl = 'http://34.44.71.125:3000/send';

  constructor(private http: HttpClient) { }

  //sendEmail(email: { to: string; subject: string; text: string }) {
    //return this.http.post(this.apiUrl, email);
  //}

  sendEmail(email: { to: string; subject: string; text: string }) {
    return this.http.post(this.apiUrls[this.currentUrlIndex], email).pipe(
      retry(2), // Intentar 2 veces antes de cambiar la URL
      catchError(error => {
        // Si ocurre un error, cambiar a la URL alternativa y reintentar
        this.currentUrlIndex = (this.currentUrlIndex + 1) % this.apiUrls.length;
        return this.http.post(this.apiUrls[this.currentUrlIndex], email);
      })
    );
  }

}

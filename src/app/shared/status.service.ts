import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { response } from 'express';

@Injectable({providedIn: 'root'})
export class StatusService {

  constructor(private http: HttpClient) { }

  // Get the status
  getStatus(): Promise<void | any> {
    return firstValueFrom(this.http.get('/api/status'))
               .then(response => response)
               .catch(this.error);
  }

  callServer() {
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');

    this.http.post('/api/ping', JSON.stringify({requestName:"registerAccount", username:"Maria", password:"9324yg7q9whgt2108qhgf0921ui308uj2rfj0iqw"}), {
      headers: headers
    })
    .subscribe(data => {
      console.log(data);
    });
  }

  // Error handling
  private error (error: any) {
    let message = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }
}

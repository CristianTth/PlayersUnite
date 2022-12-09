import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({providedIn: 'root'})
export class StatusService {

  constructor(private http: HttpClient) { }

  // Get the status
  getStatus(): Promise<void | any> {
    return firstValueFrom(this.http.get('/api/status'))
               .then(response => response)
               .catch(this.error);
  }

  callServer(username: string, email: string, password: string, confirmPassword: string) {
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');

    this.http.post('/api/ping', JSON.stringify({request:"registerAccount", username: username, email: email, password: password, confirmPassword:confirmPassword}), {
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ServerService {

  constructor(private http: HttpClient) { }

  // Get the status
  getStatus(): Promise<void | any> {
    return firstValueFrom(this.http.get('/api/status'))
               .then(response => response)
               .catch(this.error);
  }

  registerRequest(username: string, email: string, password: string, confirmPassword: string) {
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');

    return firstValueFrom(this.http.post('/api/register',
                                         JSON.stringify({username: username, email: email, password: password, confirmPassword:confirmPassword}),
                                                        {headers: headers}))
    .then(response => response)
    .catch(this.error);
  }

  loginRequest(nameOrEmail: string, password: string) {
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');

    return firstValueFrom(this.http.post('/api/login',
                                         JSON.stringify({nameOrEmail: nameOrEmail, password: password}),
                                                        {headers: headers}))
    .then(response => response)
    .catch(this.error);
  }

  // Error handling
  private error (error: any) {
    let message = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }
}

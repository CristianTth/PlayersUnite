import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ServerService } from '../shared/server.service';
import { ChildToParentService } from '../shared/child-to-parent.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  show: boolean = false;
  nameOrEmail: string;
  password: string;
  generalErrorMessage: string;

  constructor(private serverService: ServerService, private childToParentService: ChildToParentService, private router: Router) {}

  ngOnInit(): void {
  }

  async onSubmit()
  {
    let response: any;
    let username: string = "";
    let email: string = "";
    await this.serverService.loginRequest(this.nameOrEmail, this.password)
    .then((result: any) => {
      response = result.response;
      username = result.username;
      email = result.email;
    });
    if(response == "success")
    {
      this.childToParentService.deliver$.next(username);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      this.router.navigate(['/home']);
    }
    else
      this.generalErrorMessage = "Credentials are incorrect!";
  }

  onShowPassword() {
    this.show = !this.show;
  }

}

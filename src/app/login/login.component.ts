import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ServerService } from '../shared/server.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() myEvent = new EventEmitter<string>();
  show: boolean = false;
  nameOrEmail: string;
  password: string;
  generalErrorMessage: string;

  constructor(private serverService: ServerService) {}

  ngOnInit(): void {
  }

  async onSubmit(nameOrEmail: string, password: string)
  {
    let response: any;
    await this.serverService.loginRequest(nameOrEmail, password)
    .then((result: any) => {
      response = result.response;
    });
    if(response == "success")
    {}
    else
      this.generalErrorMessage = "Credentials are incorrect!";
  }

  onShowPassword() {
    this.show = !this.show;
  }

}

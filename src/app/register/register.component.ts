import { Component, OnInit } from '@angular/core';
import { ServerService } from '../shared/server.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  passwordRegEx: RegExp = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/;
  emailRegEx: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  username = "";
  email = "";
  password = "";
  confirmPassword = "";
  show: boolean = false;
  usernameMessage: string;
  emailMessage: string;
  passwordMessage: string;
  confirmPasswordMessage: string;
  isSubmitVisible: boolean = false;
  checkedPassword: boolean = false;
  checkedEmail: boolean = false;
  checkedUsername: boolean = false;
  generalErrorMessage: string;

  constructor(private serverService: ServerService, private router: Router) {}

  ngOnInit(): void {
    this.isSubmitVisible = false;
  }

  validateUsername()
  {
    this.checkedUsername = true;
    if (this.username.length < 4) {
      this.usernameMessage="Username is too short!";
      this.checkedUsername = false;
    } else this.usernameMessage="";

    if(this.checkedEmail && this.checkedPassword && this.checkedUsername)
      this.isSubmitVisible = true;
    else
      this.isSubmitVisible = false;
  }

  validateEmail()
  {
    this.checkedEmail = true;
    if (!this.emailRegEx.test(this.email)) {
      this.emailMessage="Email format incorect!";
      this.checkedEmail = false;
    } else this.emailMessage="";

    if(this.checkedEmail && this.checkedPassword && this.checkedUsername)
      this.isSubmitVisible = true;
    else
      this.isSubmitVisible = false;
  }

  validatePasswords()
  {
    this.checkedPassword = true;
    if (!this.passwordRegEx.test(this.password)) {
      this.passwordMessage="Password must contain at least one uppercase, lowercase and a number!";
      this.checkedPassword = false;
    } else this.passwordMessage="";

    if (this.password != this.confirmPassword) {
      this.confirmPasswordMessage="Passwords do not match!";
      this.checkedPassword = false;
    } else this.confirmPasswordMessage="";

    if(this.checkedEmail && this.checkedPassword && this.checkedUsername)
      this.isSubmitVisible = true;
    else
      this.isSubmitVisible = false;
  }

  async onSubmit(){
    let response: any;
    await this.serverService.registerRequest(this.username, this.email, this.password, this.confirmPassword)
    .then((result: any) => {
      response = result.response;
    });
    if(response == "success")
      this.router.navigate(['/login']);
    else
      this.generalErrorMessage = "Something went wrong, please try again";
  }

  onShowPassword() {
    this.show = !this.show;
  }

}

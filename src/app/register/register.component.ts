import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}

  validateUsername()
  {
    if (this.username.length < 4) {
      this.usernameMessage="Username is too short!";
    } else this.usernameMessage="";
  }

  validateEmail()
  {
    if (!this.emailRegEx.test(this.email)) {
      this.emailMessage="Email format incorect!";
    } else this.emailMessage="";
  }

  validatePasswords()
  {
    if (!this.passwordRegEx.test(this.password)) {
      this.passwordMessage="Password must contain at least one uppercase, lowercase and a number!";
    } else this.passwordMessage="";

    if (this.password != this.confirmPassword) {
      this.confirmPasswordMessage="Passwords do not match!";
    } else this.confirmPasswordMessage="";
  }

  onShowPassword() {
    this.show = !this.show;
  }

}

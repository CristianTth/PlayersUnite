import { Component, OnInit } from '@angular/core';
import { StatusService } from '../shared/status.service';

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

  constructor(private statusService: StatusService) {}

  ngOnInit(): void {
    this.isSubmitVisible = false;
  }

  validateUsername()
  {
    this.checkedUsername = true;
    if (this.username.length < 4) {
      this.usernameMessage="Username is too short!";
      this.checkedUsername = true;
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

  onSubmit(username: string, email: string, password: string, confirmPassword: string){
    console.log("sent");
    this.statusService.callServer(username, email, password, confirmPassword);
  }

  onShowPassword() {
    this.show = !this.show;
  }

}

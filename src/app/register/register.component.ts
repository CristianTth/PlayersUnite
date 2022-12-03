import { Component, OnInit } from '@angular/core';

interface IFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

class RegisterFormController {
  formData: IFormData;
  dataFine : boolean = false;
  static fields: FormField[] = [
    "username",
    "email",
    "password",
    "confirmPassword"
  ];

  constructor() {
    for (const field of RegisterFormController.fields) {
      this.bindElement(field);
    }
  }

  bindElement(field: FormField) {
    document.getElementById(field)!.addEventListener("input", (event: any) => {
      this.formData = {...this.formData, [field]: event.target.value};
      console.log(this.formData);
      this.onDataChanged(field);
  });
  }

  onDataChanged = (field: FormField) => {
    const passwordRegEx : RegExp = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/;
    const emailRegEx : RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    this.dataFine = true;
    if (field === "username") {
      if (this.formData.username.length < 4) {
        this.dataFine = false;
        this.setValidation(field, "Username is too short!");
      } else this.setValidation(field, "&nbsp;");
    }
    if (field === "email") {
      if (!emailRegEx.test(this.formData.email)) {
        this.dataFine = false;
        this.setValidation(field, "Email format not correct!");
      } else this.setValidation(field, "&nbsp;");
    }
    if (field === "password") {
      if (!passwordRegEx.test(this.formData.password)) {
        this.dataFine = false;
        this.setValidation(field, "Password must contain at least one uppercase, lowercase and a number!");
      } else this.setValidation(field, "&nbsp;");
    }
    if (field === "confirmPassword" || field === "password") {
      if (this.formData.confirmPassword!=this.formData.password) {
        this.dataFine = false;
        this.setValidation("confirmPassword", "Passwords do not match!");
      } else this.setValidation("confirmPassword", "&nbsp;");
    }
  }

  setValidation = (field: FormField, message: string) => {
    document.getElementById(`${field}-validation`)!.innerHTML = message;
  }
}

type FormField = keyof IFormData;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  show: boolean = false;
  constructor() { }

  ngOnInit(): void {
    new RegisterFormController();
  }

  showPassword() {
    this.show = !this.show;
  }

}



import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StatusService } from '../shared/status.service';


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

  constructor(private statusService: StatusService) {}

  ngOnInit(): void {
  }

  onSubmit(nameOrEmail: string, password: string)
  {

  }

  onShowPassword() {
    this.show = !this.show;
  }

}

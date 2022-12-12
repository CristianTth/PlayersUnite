import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from './shared/server.service';
import { Subscription } from 'rxjs';
import { ChildToParentService } from "./shared/child-to-parent.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  loggedInStatus = localStorage.getItem('loggedIn') || false;
  loggedUsername = "";
  fullLogoPath = "/assets/images/full-logo.png"
  defaultProfile = "/assets/images/default-profile.png"
  title = 'PlayersUnite';
  status = 'DOWN';
  accountDropdown = false;
  onDatePickedSub: Subscription;
  constructor(private router:Router, private serverService: ServerService, private childToParentService: ChildToParentService){
    this.onDatePickedSub = this.childToParentService.deliver$.subscribe(($event: string) => {
      this.setLoggedIn(true);
      this.loggedUsername = $event;
    });
  }

  ngOnInit() {
    this.serverService.getStatus()
        .then((result: any) => {
          this.status = result.response;
        });
    this.loggedInStatus = localStorage.getItem('loggedIn')? true: false;
    if(this.loggedInStatus)
        this.loggedUsername = String(localStorage.getItem('username'));
    console.log("Logged in = "+this.loggedInStatus);
  }

  ngOnDestroy(): void {
    if (this.onDatePickedSub) {
      this.onDatePickedSub.unsubscribe();
    }
  }

  logOut()
  {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    this.loggedInStatus = false;
  }

  setLoggedIn($event: string | boolean)
  {
    this.loggedInStatus = $event;
    localStorage.setItem('loggedIn', String($event));
    this.loggedUsername = String(localStorage.getItem('username'));
  }

  showDropDown(){
    this.accountDropdown = true;
  }

  hideDropDown(){
    this.accountDropdown = false;
  }
}

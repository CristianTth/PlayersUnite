import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fullLogoPath = "/assets/images/full-logo.png"
  title = 'PlayersUnite';

  constructor(private router:Router){}
  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
}

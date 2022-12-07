import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { StatusService } from './shared/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fullLogoPath = "/assets/images/full-logo.png"
  title = 'PlayersUnite';
  status = 'DOWN';

  constructor(private router:Router, private statusService: StatusService){}

  ngOnInit() {
    this.statusService.getStatus()
        .then((result: any) => {
          this.status = result.status;
        });
    this.statusService.callServer();
  }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
    console.log(this.status);
  }
}

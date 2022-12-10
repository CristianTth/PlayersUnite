import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from './shared/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fullLogoPath = "/assets/images/full-logo.png"
  title = 'PlayersUnite';
  status = 'DOWN';

  constructor(private router:Router, private serverService: ServerService){}

  ngOnInit() {
    this.serverService.getStatus()
        .then((result: any) => {
          this.status = result.response;
        });
  }
}

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServerService } from '../shared/server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lobbies: any = [];
  status: any;
  loggedInStatus: boolean;
  loggedUsername: string;

  constructor(private serverService: ServerService, private router: Router){}

  ngOnInit() {
    this.getLobbies();
    this.serverService.getStatus()
    .then((result: any) => {
      this.status = result.response;
    });
    this.loggedInStatus = localStorage.getItem('loggedIn')? true: false;
    if(this.loggedInStatus)
        this.loggedUsername = String(localStorage.getItem('username'));
    console.log("Logged in = " + this.loggedInStatus);
  }

  async getLobbies()
  {
    await this.serverService.lobbiesRequest()
    .then((result: any) => {
      this.lobbies = result.lobbies.reverse();
    });
  }

  createLobby()
  {
    if(this.loggedInStatus)
      this.router.navigate(["/newlobby"]);
    else
      this.router.navigate(["/login"]);
  }

  async addPlayer(lobbyID: string | null)
  {
    if(this.loggedInStatus)
    {
      let response: any = "success";
      await this.serverService.addPlayer(this.loggedUsername, lobbyID)
      .then((result: any) => {
        response = result.response;
      });

      let navigationExtras: NavigationExtras = {
        queryParams: { "lobbyID": lobbyID},
      };

      if(response == "success")
        this.router.navigate(['/lobby'], navigationExtras);
    }
    else
      this.router.navigate(['/login']);
  }
}

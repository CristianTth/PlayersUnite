import { Component, OnInit } from '@angular/core';
import { ServerService } from '../shared/server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lobbies: any = [];

  constructor(private serverService: ServerService){}

  ngOnInit() {
    this.getLobbies();
  }

  async getLobbies()
  {
    await this.serverService.lobbiesRequest()
    .then((result: any) => {
      this.lobbies = result.lobbies.reverse();
    });
  }

}

import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { ServerService } from '../shared/server.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {
  lobbyID:string|null;
  lobby: any;
  heroes$: Observable<LobbyComponent>;

  constructor(
    private route: ActivatedRoute,
    private serverService: ServerService  ) {}

  ngOnInit(){
    this.route.queryParams
      .subscribe(params => {
        this.lobbyID = params['lobbyID'];
        this.getLobby(this.lobbyID);
      }
    );
  }

  async getLobby(lobbyID: string|null)
  {
    await this.serverService.lobbyGetRequest(lobbyID)
    .then((result: any) => {
      console.log(result.lobby);
      this.lobby = result.lobby;
    });
  }
}

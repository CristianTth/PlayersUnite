import { Component } from '@angular/core';
import { ServerService } from '../shared/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newlobby',
  templateUrl: './newlobby.component.html',
  styleUrls: ['./newlobby.component.scss']
})
export class NewLobbyComponent {
  constructor(private router: Router,private serverService: ServerService){}

  game: string;
  size: number;
  description: string;
  gameMessage: string = "";
  sizeMessage: string = "";
  descriptionMessage: string = "";
  isSubmitVisible: boolean = false;
  checkGame:boolean = false;
  checkSize:boolean = false;
  checkDescription:boolean = false;
  generalErrorMessage:string = "";

  validateGame(){
    this.checkGame = true;
    if(this.game.length < 2){
      this.gameMessage="You must input a game name";
      this.checkGame = false;
    } else
      this.gameMessage="";
    if(this.checkGame && this.checkSize && this.checkDescription)
      this.isSubmitVisible = true;
    else
      this.isSubmitVisible = false;
  }

  validateSize(){
    this.checkSize = true;
    if(this.size <= 1){
      this.sizeMessage="Max party size is too small";
      this.checkSize = false;
    } else
      this.sizeMessage="";
    if(this.checkGame && this.checkSize && this.checkDescription)
      this.isSubmitVisible = true;
    else
      this.isSubmitVisible = false;
  }

  validateDescription(){
    this.checkDescription = true;
    if(this.description.length < 7){
      this.descriptionMessage="Description is too short";
      this.checkDescription = false;
    } else
      this.descriptionMessage="";
    if(this.checkGame && this.checkSize && this.checkDescription)
      this.isSubmitVisible = true;
    else
      this.isSubmitVisible = false;
  }

  async onSubmit(){
    let response: any;
    await this.serverService.lobbyRequest(this.game, String(localStorage.getItem('username')), this.size, this.description)
    .then((result: any) => {
      response = result.response;
    });
    if(response == "success")
      this.router.navigate(['/home']);
    else
      this.generalErrorMessage = "Something went wrong, please try again";
  }
}

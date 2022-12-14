import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../app/register/register.component'
import { LoginComponent } from '../app/login/login.component'
import { HomeComponent } from '../app/home/home.component'
import { AboutComponent } from '../app/about/about.component'
import { FAQComponent } from '../app/faq/faq.component'
import { ContactComponent } from '../app/contact/contact.component'
import { ProfileComponent } from '../app/profile/profile.component'
import { LobbyComponent } from './lobby/lobby.component';
import { NewLobbyComponent } from './newlobby/newlobby.component';

const routes: Routes = [
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent},
  {path:'about', component: AboutComponent},
  {path:'faq', component: FAQComponent},
  {path:'contact', component: ContactComponent},
  {path:'profile', component: ProfileComponent},
  {path:'lobby', component: LobbyComponent},
  {path:'newlobby', component: NewLobbyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

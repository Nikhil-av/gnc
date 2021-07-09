import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatscreenComponent } from './chatscreen/chatscreen.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserslistComponent } from './userslist/userslist.component';

const routes: Routes = [  {path:'home',component:HomeComponent},
{path:'register',component:RegisterComponent},
{path:'login',component:LoginComponent},
{path:'',component:LoginComponent},
{path:'userlist/:username',component:UserslistComponent},
{path:':user',component:ChatscreenComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})], 
  exports: [RouterModule]
})
export class AppRoutingModule { }

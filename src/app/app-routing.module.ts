import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { FormDetailsComponent } from './form-details/form-details.component';
// import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

{path: 'login', component: LoginComponent},
{path: 'home', component: HomeComponent},
{path: 'detail', component: FormDetailsComponent},

{path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

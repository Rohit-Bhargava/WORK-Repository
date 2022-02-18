import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsComponent } from './forms/forms.component';

import { ListsComponent } from './lists/lists.component';
import { VerfiyComponent } from './verfiy/verfiy.component';

const routes: Routes = [
  
  // {path:'', redirectTo:'/form', pathMatch:'full'},
  {path: 'verfiy', component: VerfiyComponent},  
   {path: 'form', component:FormsComponent},
    {path: 'edit/:employeeId', component:FormsComponent},
  {path: 'list', component: ListsComponent},
  {path: '**', redirectTo:'verfiy', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

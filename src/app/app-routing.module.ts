import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmplloyFormComponent } from './Form/emplloy-form/emplloy-form.component';
import { FormsComponent } from './Form/forms/forms.component';
import { EmplloyListComponent } from './List/emplloy-list/emplloy-list.component';
import { ListsComponent } from './List/lists/lists.component';
import { VerfiyComponent } from './verfiy/verfiy.component';

const routes: Routes = [
  
  // {path:'', redirectTo:'/form', pathMatch:'full'},
  {path: 'verfiy', component: VerfiyComponent},  
    {path: 'form', component:FormsComponent, children: [
    {path:'emplloy', component: EmplloyFormComponent}
  ]},
  {path: 'list', component: ListsComponent, children: [
    {path:'emplloy-list', component: EmplloyListComponent}
  ]},
  {path: '**', redirectTo:'verfiy', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

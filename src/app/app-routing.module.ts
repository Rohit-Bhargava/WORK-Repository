import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';

const routes: Routes = [
  {path: '', redirectTo: 'add', pathMatch: 'full'},
  {path: 'add', component: AddPatientComponent},
  {path: 'details', component: PatientDetailsComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

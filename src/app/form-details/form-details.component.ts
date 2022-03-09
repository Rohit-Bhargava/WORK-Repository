import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Patient } from '../shared/Patient';
import { PatientService } from '../shared/patient.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.css']
})
export class FormDetailsComponent implements OnInit {
  patients: any = [] ;
  
  dataSource: MatTableDataSource<Patient>;
  
  displayedColumns:string[] = ['fever', 'gender', 'dot']
   
  public userDetails: any;

  constructor(private router: Router, private authService: SocialAuthService, private patientService: PatientService ) { 
    this.patientService.getPatients().subscribe(data => {
      this.patients = data;
      this.dataSource = new MatTableDataSource<Patient>(this.patients);
  });
  }

  ngOnInit(){
    const storage = localStorage.getItem('google_auth');

   if(storage){
    this.userDetails = JSON.parse(storage);
   }
  }

  // deletePatient(index: number, e){
  //   if(window.confirm('Are you sure')) {
  //     const data = this.dataSource.data;
  //     // data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
  //     this.dataSource.data = data;
  //     this.patientService.DeletePatient(e._id).subscribe()
  //   }
  // }

}

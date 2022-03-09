import { Patient } from '../shared/patient';
import { PatientService } from '../shared/patient.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})

export class PatientDetailsComponent implements OnInit {
  PatientData: any = [];
  
  dataSource: MatTableDataSource<Patient>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns:string[] = ['_id', 'fever', 'gender', 'dot', 'action']

  constructor(private patientService: PatientService) {
    this.patientService.GetPatients().subscribe(data => {
      this.PatientData = data;
      this.dataSource = new MatTableDataSource<Patient>(this.PatientData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deletePatient(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.patientService.DeletePatient(e._id).subscribe()
    }
  }

}

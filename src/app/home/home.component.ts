// import { DatePipe } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../shared/patient.service';
import { Patient } from '../shared/Patient';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  FeverArray: any =['Yes', 'No'];
  

  form: FormGroup;

  patient: Patient | any;
  
  public userDetails: any;
  

  constructor(private router: Router, private fb: FormBuilder, private patientService: PatientService, private ngZone: NgZone) { }

  
  ngOnInit() {
    this.form = this.fb.group({
      dot: ['', [Validators.required]
      ],
      fever: ['Yes' && 'No'],
      gender: ['Female' && 'Male' && 'Transhgender'],
  })
}

  formatDate(e: any){
    const convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.form.get('dot').setValue(convertDate, {
      onlyself:true
    })
  }

  showMsg(){
    console.log('hi')
    this.patientService.showPatient().subscribe()
  }

  submitForm(){ 
    console.log('ha ha ha');
    this.patientService.addPatient(this.form.value)
  }
}

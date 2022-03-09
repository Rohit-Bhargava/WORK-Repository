import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import {PatientService} from '../shared/patient.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ThemePalette } from '@angular/material/core';

export interface Task {
    name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

    visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  // @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetStudentForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  studentForm: FormGroup;
  // subjectArray: Subject[] = [];

  FeverArray: any = ['Yes', 'No'];

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private patientService: PatientService
  ) { }

  /* Reactive book form */
  submitBookForm() {
    this.studentForm = this.fb.group({
      // student_name: ['', [Validators.required]],
      // student_email: ['', [Validators.required]],
      fever: ['', [Validators.required]],
      // subjects: [this.subjectArray],
      dot: ['', [Validators.required]],
      gender: ['Male']
    })
  }


  /* Add dynamic languages */
  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;
  //   // Add language
  //   if ((value || '').trim() && this.subjectArray.length < 5) {
  //     this.subjectArray.push({ name: value.trim() })
  //   }
    // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }
  // }

  /* Remove dynamic languages */
  // remove(subject: Subject): void {
  //   const index = this.subjectArray.indexOf(subject);
  //   if (index >= 0) {
  //     this.subjectArray.splice(index, 1);
  //   }
  // }  

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.studentForm.get('dot').setValue(convertDate, {
      onlyself: true
    })
  }  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.studentForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitStudentForm() {
    console.log('hiiii');
    if (this.studentForm.valid) {
      this.patientService.AddPatient(this.studentForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/details'))
      });
    }
  }
}

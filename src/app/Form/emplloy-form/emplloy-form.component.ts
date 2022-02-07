import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from "@angular/forms";
// import * as EventEmitter from 'events';
import { EmplloyService } from 'src/app/shared/emplloy.service';
// import { EventEmitter } from 'stream';
@Component({
  selector: 'app-emplloy-form',
  templateUrl: './emplloy-form.component.html',
  styleUrls: ['./emplloy-form.component.css']
})
export class EmplloyFormComponent implements OnInit {
  
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  imagePreview: any;
  form: FormGroup[]=[]; 
  constructor(private service: EmplloyService) { }

  ngOnInit(): void {
  }

  onSave(){
  
    }

    onReset(){

    }

}
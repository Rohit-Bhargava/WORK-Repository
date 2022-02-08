import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Employee } from 'src/app/emplloy';

import { EmplloyService } from 'src/app/shared/emplloy.service';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'] //'../styles.css']
})
export class FormsComponent implements OnInit {
  enteredName = "";
  enteredDepartment = "";
  enteredEmail = "";
  employee: Employee;
  isLoading = false;
  imagePreview: string;
  form: FormGroup;
  private mode = "create";
  private employeeId: any;

  constructor(public service: EmplloyService, public route: ActivatedRoute) { }

  ngOnInit(){
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      department: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has("employeeId")){
        this.mode = "edit";
        this.employeeId = paramMap.get(employeeId);
        this.isLoading = true;
        this.service.getEmployees(this.employeeId).subscribe(employeeData=>{
          this.employee = {
            id: employeeData._id,
            name: employeeData.name,
            department: employeeData.department,
            email: employeeData.email,
            imagePath: employeeData.imagePath
          };
          this.form.setValue({
            name: this.employee.name,
            department: this.employee.department,
            email: this.employee.email,
            image: this.employee.imagePath
          });
        });
      } else {
        this.mode = "create";
        this.employeeId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event?.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image")?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSave(){
    if(this.form.invalid){
      return;
    }
    this.isLoading =true;
    if (this.mode === "create"){
      this.service.addEmployee(
        this.form.value.name,
        this.form.value.department,
        this.form.value.email,
        this.form.value.image
      );
    } else {
      this.service.updateEmployee(
        this.employeeId,
        this.form.value.name,
        this.form.value.department,
        this.form.value.email,
        this.form.value.image
      );
    }
    this.form.reset();
    }
}

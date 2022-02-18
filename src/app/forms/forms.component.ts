import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs';
import { Employee } from 'src/app/emplloy';
// import { Subscription } from 'rxjs';
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
  employee: Employee | any;
  isLoading = false;
  imagePreview: any;
  
  private mode = "create";
  private employeeId: any;
  form: FormGroup | any;

  constructor(public service: EmplloyService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('',{
        validators: [Validators.required, Validators.minLength(3)]
      }),
      department: new FormControl('',{
        validators: [Validators.required, Validators.minLength(2)]
      }),
      email: new FormControl('',{
        validators: [Validators.required, Validators.email]
      }),
      image: new FormControl('',{
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has("employeeId")){
        this.mode = "edit";
        this.employeeId = paramMap.get("employeeId");
        this.isLoading = true;
        this.service.getEmployee().subscribe(employeeData=>{
          this.isLoading = false;
          this.employee = {
            id: employeeData._id,
            name: employeeData.name,
            department: employeeData.department,
            email: employeeData.email,
            imagePath: employeeData.imagePath,
          };
          this.form.patchValue({
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

  onImagePicked(event: any){
    const file = event.target.files[0];
    this.form.patchValue({ image: file });
    this.form.get("image")?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
    

  onSave(){
    if (this.form.invalid){
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

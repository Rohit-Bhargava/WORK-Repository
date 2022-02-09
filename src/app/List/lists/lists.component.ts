import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/emplloy';
import { EmplloyService } from 'src/app/shared/emplloy.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  isLoading = false;

  employees: Employee[] = [];
  private employeeSub: Subscription | any;

  constructor(public service: EmplloyService){}

 

  ngOnInit() {
    this.isLoading = true;
    this.service.getEmployees();
    this.employeeSub = this.service.getEmployeeUpdateListener()
    .subscribe((employees : Employee[])=>{
      this.isLoading = false;
      this.employees= employees;
    });
  }

  onDelete(employeeId: string){
    this.service.deleteEmployee(employeeId);
  }

  ngOnDestroy(){
    this.employeeSub.unsubscribe();
  }

}

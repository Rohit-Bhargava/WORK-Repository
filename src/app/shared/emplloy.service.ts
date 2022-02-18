import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Injectable, Input, Output } from '@angular/core';
import { Router } from '@angular/router';


import { map, Observable, observable, Subject } from 'rxjs';
// import { Transform } from 'stream';
import { Employee } from '../emplloy';



@Injectable({
  providedIn: 'root'
})
export class EmplloyService {
 

 private employees: Employee[]=[];
 private employeesUpdated = new Subject<Employee[]>();

 constructor(private http: HttpClient, private router: Router) { }

  getEmployees() {
    this.http
    .get<{message: string; employees: any}>("http://localhost:3000/api/employees")
    .pipe(
      map(employeeData => {
        return employeeData.employees.map((employees: { name: any; department: any; email: any; _id: any; imagePath: any; })=>{
          return {
            name: employees.name,
            department: employees.department,
            email: employees.email,
            id: employees._id,
            imagePath: employees.imagePath
          };
        });
      })
    )
    .subscribe(transformEmployees =>{
      this.employees = transformEmployees;
      this.employeesUpdated.next([...this.employees]);
    });
  }

  getEmployeeUpdateListener(){
    return this.employeesUpdated.asObservable();
  }

  getEmployee(){
    return this.http.get<{_id: string, name: string, department: string, email: string, imagePath: String}>(
      "http://localhost:3000/api/employees"
    );
  }

  addEmployee(name: string, department: string, email: string, image: File){
    const employeeData = new FormData();
    employeeData.append("name", name);
    employeeData.append("department", department);
    employeeData.append("email", email);
    employeeData.append("image", image, name);
    this.http.post<{message: string; employee: Employee}>(
      "http://localhost:3000/api/employees",
      employeeData
    )
    .subscribe(responseData => {
      const employee: Employee = {
        id: responseData.employee.id,
        name: name,
        department: department,
        email: email,
        imagePath: responseData.employee.imagePath
      };
      this.employees.push(employee);
      this.employeesUpdated.next([...this.employees]);
      this.router.navigate(["/"]);
    });
  }

  updateEmployee(id: string, name: string, email: string, department: string, image: File){
    let employeeData: Employee | FormData;
    if (typeof image === "object"){
      employeeData =new FormData();
      employeeData.append("id", id);
      employeeData.append("name", name);
      employeeData.append("department", department);
      employeeData.append("email", email);
      employeeData.append("image", image, name);
    } else {
      employeeData ={
        id: id,
        name: name,
        department: department,
        email: email,
        imagePath: image
      };
    }
    this.http.put("http://localhost:3000/api/employees/" + id, employeeData)
    .subscribe(response => {
      
        const updatedEmployees = [...this.employees];
        const oldEmployeeIndex = updatedEmployees.findIndex(e => e.id === id);
        const employee: Employee = {
          id: id,
          name: name,
          department: department,
          email: email,
          imagePath: ""
        };
        updatedEmployees[oldEmployeeIndex] = employee;
        this.employees = updatedEmployees;
        this.employeesUpdated.next([...this.employees]);
        this.router.navigate(["/"]);
    } );
  }

  deleteEmployee(employeeId: string){
    this.http.delete("http://localhost:3000/api/employees/" + employeeId)
    .subscribe(()=>{
      const updatedEmployees = this.employees.filter(employee => employee.id !== employeeId );
      this.employees = updatedEmployees;
      this.employeesUpdated.next([...this.employees]);
    });
  }
}
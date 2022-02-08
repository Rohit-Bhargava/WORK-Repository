import { HttpClient } from '@angular/common/http';
import { Injectable, Input, Output } from '@angular/core';
import { Router } from '@angular/router';


import { map, Observable, observable, Subject } from 'rxjs';
import { Transform } from 'stream';
import { Employee } from '../emplloy';



@Injectable({
  providedIn: 'root'
})
export class EmplloyService {
 private employee: Employee[]=[];
 private employeeUpdated = new Subject<Employee[]>();

 constructor(private http: HttpClient, private router: Router) { }

  getEmployees(){
    this.http
    .get<{message: string; employee: any}>("http://localhost:3000/api/employees")
    .pipe(
      map(employeeData => {
        return employeeData.employee.map(employee=>{
          return {
            name: employee.name,
            department: employee.department,
            email: employee.email,
            id: employee._id,
            imagePath: employee.imagePath
          };
        });
      })
    )
    .subscribe(transformedEmployee =>{
      this.employee = transformedEmployee;
      this.employeeUpdated.next([...this.employee]);
    });
  }

  getEmployeeUpdateListener(){
    return this.employeeUpdated.asObservable();
  }

  getPost(){
    return this.http.get<{_id: string, name: string, department: string, email: string, imagePath: String}>(
      "http://localhost:3000/api/employees" + id
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
      this.employee.push(employee);
      this.employeeUpdated.next([...this.employee]);
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
      
        const updatedEmployee = [...this.employee];
        const oldEmployeeIndex = updatedEmployee.findIndex(e => e.id === id);
        const employee: Employee ={
          id: id,
          name: name,
          department: department,
          email: email,
          imagePath: ""
        };
        updatedEmployee[oldEmployeeIndex] = employee;
        this.employee = updatedEmployee;
        this.employeeUpdated.next([...this.employee]);
        this.router.navigate(["/"]);
    } );
  }

  deleteEmployee(employeeId: string){
    this.http.delete("http://localhost:3000/api/employees" + employeeId)
    .subscribe(()=>{
      const updatedEmployee = this.employee.filter(employee => employee.id !== employeeId );
      this.employee = updatedEmployee;
      this.employeeUpdated.next([...this.employee]);
    });
  }
}
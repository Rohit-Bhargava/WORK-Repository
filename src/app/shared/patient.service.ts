import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Injectable, Input, Output } from '@angular/core';
import { response } from 'express';

import { Router } from '@angular/router';

import { catchError, map, Observable, Subject, throwError } from 'rxjs';

import { Patient } from './Patient';

@Injectable({
  providedIn: 'root'
})

export class PatientService{

    patient: Patient[]=[];
    // private patientUpdated = new Subject<Patient[]>();

    endpoint: string = 'http://localhost:3000/api';
     
    headers = new HttpHeaders().set('Content-Type', 'application/json')

    constructor(private http: HttpClient, private router: Router) { }

    //add Patient

    addPatient(data: Patient) {
      let API_URL = `${this.endpoint}/add-patient`;
      this.http.post(API_URL, data).subscribe(data=>{
        this.router.navigate(['/detail']);
      })
     
    }

    getPatients(){
      console.log('jjjjj');
      return this.http.get(`${this.endpoint}`);
    }

    getPatient(id){
      let API_URL = `${this.endpoint}/read/${id}`;
      return this.http.get(API_URL, { headers: this.headers })
        .pipe(
          map((res: Response) => {
            return res || {}
          }),
          catchError(this.errorMgmt)
        )
    }

    showPatient(){
      let API_URL = `${this.endpoint}/show-patient`;
      return this.http.get(API_URL);
      
    }


    errorMgmt(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
        
    
}


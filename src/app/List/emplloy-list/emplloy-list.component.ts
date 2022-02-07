import { Component, Input, OnInit, Output } from '@angular/core';
import { Emplloy } from 'src/app/emplloy';
// import { Directive } from '@angular/core';
@Component({
  selector: 'app-emplloy-list',
  templateUrl: './emplloy-list.component.html',
  styleUrls: ['./emplloy-list.component.css']
})
export class EmplloyListComponent implements OnInit {

  emplloy:Emplloy[]

  constructor(){
    this.emplloy=[
      {
        name: "abcd",
   email: "abcd@text.com",
   department: "Devloment",
   imagePath: ""

      },
      {
        name: "efgh",
   email: "efgh@text.com",
   department: "QA",
   imagePath: ""

      }
    ]
  }
  
  ngOnInit(){}

}

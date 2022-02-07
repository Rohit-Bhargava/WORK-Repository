import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/emplloy';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  isLoading = false;

  employees: Employee[] = [];

  constructor(){}

 

  ngOnInit() {
    this.isLoading = true
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public userDetails: any

  constructor(private router: Router) { }
  ngOnInit(): void {
    const storage = localStorage.getItem('google_auth');

    if(storage){
     this.userDetails = JSON.parse(storage);
    }
  }


  signOut(): void {
    localStorage.removeItem('google_auth');
    this.router.navigateByUrl('/login').then();
  }
  
}

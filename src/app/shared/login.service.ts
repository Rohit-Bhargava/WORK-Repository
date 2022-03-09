import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {
  public userDetails: any

  constructor(private router: Router, private socialAuth: SocialAuthService) { }

  ngOnInit(): void {
    const storage = localStorage.getItem('google_auth');

    if (storage) {
      this.userDetails = JSON.parse(storage);
    } else {
      this.signOut();
    }
  }

  signOut() {
    localStorage.removeItem('google_auth');
    this.router.navigateByUrl('/login').then();
  }

  refreshToken(){
    this.socialAuth.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
  }


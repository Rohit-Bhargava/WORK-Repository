import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleLoginProvider, SocialLoginModule, SocialAuthService, SocialAuthServiceConfig } from "angularx-social-login";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
// import { NgbModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormDetailsComponent } from './form-details/form-details.component';
import { HeaderComponent } from './header/header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientService } from './shared/patient.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FormDetailsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    
    // NgbModule,
    SocialLoginModule,
    BrowserAnimationsModule
  ],
  providers: [
    PatientService,
   {
     provide: 'SocialAuthServiceConfig',
     useValue: {
       autoLogin: false,
       providers: [
         {
           id: GoogleLoginProvider.PROVIDER_ID,
           provider: new GoogleLoginProvider(
              '999454686635-c6p3onr9ta6i94cskvgkird72q9buuqv.apps.googleusercontent.com'
           )
         }
       ]
     } as SocialAuthServiceConfig
   },
   
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
})
export class AppModule { }

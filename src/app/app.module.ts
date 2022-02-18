import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormsComponent } from './forms/forms.component';
import { ListsComponent } from './lists/lists.component';
import { EmplloyService } from './shared/emplloy.service';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { VerfiyComponent } from './verfiy/verfiy.component';

@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    ListsComponent,
    VerfiyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    
    OAuthModule.forRoot(),
  ],
  providers: [EmplloyService],
  bootstrap: [AppComponent]
})
export class AppModule { }

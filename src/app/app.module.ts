import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmplloyFormComponent } from './Form/emplloy-form/emplloy-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormsComponent } from './Form/forms/forms.component';
import { EmplloyListComponent } from './List/emplloy-list/emplloy-list.component';
import { ListsComponent } from './List/lists/lists.component';
import { EmplloyService } from './shared/emplloy.service';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { VerfiyComponent } from './verfiy/verfiy.component';

@NgModule({
  declarations: [
    AppComponent,
    EmplloyFormComponent,
    FormsComponent,
    EmplloyListComponent,
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

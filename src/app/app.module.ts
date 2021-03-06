import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { StudentComponent } from '../students/student/student.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentFamilyComponent } from '../students/student-family/student-family.component';
import { PreviousEnrollmentComponent } from '../students/previous-enrollment/previous-enrollment.component';
import { AdmissionComponent } from '../students/admission/admission.component';
import { DocumentComponent } from '../students/document/document.component';
import { AddressComponent } from '../students/address/address.component';
import { StudentInfoComponent } from '../students/student-info/student-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentComponent,
    StudentFamilyComponent,
    PreviousEnrollmentComponent,
    AdmissionComponent,
    DocumentComponent,
    AddressComponent,
    StudentInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

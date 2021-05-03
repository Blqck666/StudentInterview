import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { UsersComponent } from './modules/users/users.component';
import { SignUpComponent } from './modules/users/sign-up/sign-up.component';
import { SignInComponent } from './modules/users/sign-in/sign-in.component';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { AuthGuard } from '../app/Auth/auth.guard';
import { AuthInterceptor } from '../app/Auth/auth.interceptor';
import { UserComponent } from './modules/user/user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatSortModule } from '@angular/material/sort';
import { AlertComponent } from './modules/alert/alert.component';
import { AddComponent } from './modules/subject/dialog/add/add.component';
import { DeleteComponent } from './modules/subject/dialog/delete/delete.component';
import { EditComponent } from './modules/subject/dialog/edit/edit.component';
import { SubjectComponent } from './modules/subject/subject.component';
import { ClassListComponent } from './modules/class-list/class-list.component';
import { GradeComponent } from './modules/grade/grade.component';

import { AddClassComponent } from './modules/class-list/dialog/add-class/add-class.component';
import { EditClassComponent } from './modules/class-list/dialog/edit-class/edit-class.component';
import { DeleteClassComponent } from './modules/class-list/dialog/delete-class/delete-class.component';
import { ViewgradComponent } from './modules/viewgrad/viewgrad.component';
import { GuardStudentGuard } from './Auth/guard-student.guard';
import { StudentInterceptor } from './Auth/student.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    SignUpComponent,
    SignInComponent,
    UserComponent,
    AlertComponent,
    AddComponent,
    DeleteComponent,
    EditComponent,
    SubjectComponent,
    ClassListComponent,
    GradeComponent,
    AddClassComponent,
    EditClassComponent,
    DeleteClassComponent,
    ViewgradComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    HttpClientModule,
    FlexLayoutModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,MatSortModule
  ],  entryComponents: [
    AddComponent,
    EditComponent,
    DeleteComponent,
    AddClassComponent,
    EditClassComponent,
    DeleteClassComponent
  ],
  providers:
  [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  AuthGuard,GuardStudentGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

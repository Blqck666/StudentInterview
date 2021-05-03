import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams ,HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Student } from '../StudentServices/student.model';
import { Subject } from '../SubjectServices/subject.model';
import {Classname} from '../ClassNameServices/classname.model';

import {BehaviorSubject} from 'rxjs';
import { Studentscore } from '../StudentScoreServices/studentscore.model';
import { Notifications } from '../NotificationsServices/notifications.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  is
  constructor(private http: HttpClient)
  {
  }
  getAllNotificationByStudentId(id){
    return this.http.get(environment.apiStudentBaseUrl+'getAllNotificationByStudentId/'+id,this.noAuthHeader);
  }


  getAllGradeByStudentId(id){
    return this.http.get(environment.apiStudentBaseUrl+'getAllGradeByStudentIdAndYear/'+id,this.noAuthHeader);
  }

  loginStudent(authCredentials) {
    return this.http.post(environment.apiStudentBaseUrl + 'authenticate', authCredentials,this.noAuthHeader);
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setStudentInfo(student: string) {
    localStorage.setItem('studentId', student);
  }

  getStudentInfo() {
    return localStorage.getItem('studentId');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
    {
      if(userPayload.userType == "student")
        return userPayload.exp > Date.now() / 1000;
    }
    else
      return false;
  }

}

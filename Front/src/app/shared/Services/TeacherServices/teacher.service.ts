import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams ,HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Teacher } from './teacher.model';
import { Student } from '../StudentServices/student.model';
import { Subject } from '../SubjectServices/subject.model';
import {Classname} from '../ClassNameServices/classname.model';

import {BehaviorSubject} from 'rxjs';
import { Studentscore } from '../StudentScoreServices/studentscore.model';
import { Notifications } from '../NotificationsServices/notifications.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  selectedTeacher: Teacher = {
    _id:'',
    name: '',
    email: '',
    password: ''
  };

  teachers : Teacher[];

  studentgrad : number;
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient)
  {
  }

  dataChangeSubject: BehaviorSubject<Subject[]> = new BehaviorSubject<Subject[]>([]);
  dataChangeClass: BehaviorSubject<Classname[]> = new BehaviorSubject<Classname[]>([]);
  dataChangeGrad: BehaviorSubject<Studentscore> = new BehaviorSubject<Studentscore>(null);


  // Temporarily stores data from dialogs
  dialogData: any;


  get dataSubject(): Subject[] {
    return this.dataChangeSubject.value;
  }
  get dataClass(): Classname[] {
    return this.dataChangeClass.value;
  }
  get dataGrade(): Studentscore {
    return this.dataChangeGrad.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllSubjectByTeacherId(teacherid : string): void {
    this.http.get<Subject[]>(environment.apiTeacherBaseUrl+'getAllSubjectByTeacherID/'+teacherid).subscribe(data => {
      console.log(data);
      this.dataChangeSubject.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });

  }
  getAllClassName(): void {
    this.http.get<Classname[]>(environment.apiTeacherBaseUrl+'getAllClassname').subscribe(data => {
      console.log(data);
      this.dataChangeClass.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  getAllSubject(): void {
    this.http.get<Subject[]>(environment.apiTeacherBaseUrl+'getAllSubject').subscribe(data => {
      console.log(data);
      this.dataChangeSubject.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }


  getAllStudentGradeBySubjectAndClass(subjectid : string,studentid : string,classid:string){
    return this.http.get<Studentscore>(environment.apiTeacherBaseUrl+'getAllStudentGradeBySubjectAndClass/'+subjectid+'/'+studentid+'/'+classid);
  }

  postSubject(subject: Subject): void {
    this.http.post(environment.apiTeacherBaseUrl+'addSubject', subject).subscribe(data => {
      this.dialogData = data;

      },
      (err: HttpErrorResponse) => {
    });
   }

   postScore(StudentScore: Studentscore): void {
    this.http.post(environment.apiTeacherBaseUrl+'addStudentScore', StudentScore).subscribe(data => {
      this.dialogData = StudentScore;

      },
      (err: HttpErrorResponse) => {
    });
   }

   updateScore(id:string,score: Studentscore): void {
    this.http.put(environment.apiTeacherBaseUrl+'updateScore/' + id, score,this.noAuthHeader).subscribe(data => {
        //this.dialogData = student;
        //this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

   postNotification(notification: Notifications): void {
    this.http.post(environment.apiTeacherBaseUrl+'addNotification', notification).subscribe(data => {
      this.dialogData = notification;

      },
      (err: HttpErrorResponse) => {
    });
   }


  postClass(classname: Classname): void {
    this.http.post(environment.apiTeacherBaseUrl+'addClassname', classname).subscribe(data => {
      this.dialogData = data;

      },
      (err: HttpErrorResponse) => {
    });
   }



  getAllStudentByClassIdAndYear(id){
    return this.http.get(environment.apiTeacherBaseUrl+'getAllStudentByClassIdAndYear/'+id,this.noAuthHeader);
  }

  getAllTeachers(){
    return this.http.get(environment.apiTeacherBaseUrl+'getallteachers',this.noAuthHeader);
  }

  postStudent(student: Student){
    console.log(student);
    return this.http.post(environment.apiTeacherBaseUrl+'addStudent',student,this.noAuthHeader);
  }

  updateStudent(student: Student): void {
    this.http.put(environment.apiTeacherBaseUrl+'updateuser/' + student._id, student,this.noAuthHeader).subscribe(data => {
        //this.dialogData = student;
        //this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  deleteStudent(id: number): void {
    this.http.delete(environment.apiTeacherBaseUrl+'deleteuser/' + id).subscribe(data => {
      console.log(data['']);
        //this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  updateClassName(classname: Classname): void {
    this.http.put(environment.apiTeacherBaseUrl+'updateClassname/' + classname._id, classname,this.noAuthHeader).subscribe(data => {
        this.dialogData = data;
        //this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  deleteClassName(id: number): void {
    this.http.delete(environment.apiTeacherBaseUrl+'deleteClassname/' + id).subscribe(data => {
      console.log(data['']);
        //this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }


  updateSubject(subject: Subject): void {
    this.http.put(environment.apiTeacherBaseUrl+'updateSubject/' + subject._id, subject,this.noAuthHeader).subscribe(data => {
        this.dialogData = data;
        //this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  deleteSubject(id: number): void {
    this.http.delete(environment.apiTeacherBaseUrl+'deleteSubject/' + id).subscribe(data => {
      console.log(data['']);
        //this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  postTeacher(teacher: Teacher){
    console.log(teacher);
    return this.http.post(environment.apiTeacherBaseUrl+'register',teacher,this.noAuthHeader);
  }

  updateTeacher(teacher: Teacher){
    console.log(teacher);
    return this.http.patch(environment.apiTeacherBaseUrl + teacher._id,teacher,this.noAuthHeader);
  }

  loginTeacher(authCredentials) {
    return this.http.post(environment.apiTeacherBaseUrl + 'authenticate', authCredentials,this.noAuthHeader);
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setTeacherInfo(teacher: string) {
    localStorage.setItem('teacherId', teacher);
  }

  getTeacherInfo() {
    return localStorage.getItem('teacherId');
  }

  getToken() {
    return localStorage.getItem('token');
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
      if(userPayload.userType == "teacher")
      {
        console.log("qsfi");
        return userPayload.exp > Date.now() / 1000;
      }
    }

    else
      return false;
  }


}

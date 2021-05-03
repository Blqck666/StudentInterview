import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { StudentService } from 'src/app/shared/Services/StudentServices/student.service';
import { Teacher } from 'src/app/shared/Services/TeacherServices/teacher.model';

import { TeacherService } from '../../../shared/Services/TeacherServices/teacher.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private teacherService: TeacherService,private StudentService: StudentService,private router : Router) { }
  model ={
    email :'',
    password:''
  };

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  selectType;

  ngOnInit(): void {
    if(this.teacherService.isLoggedIn())
    {this.router.navigateByUrl('/posts');console.log("teacjer log")}
    else if(this.StudentService.isLoggedIn())
    {this.router.navigateByUrl('/notifications');console.log("student log")}

  }

  onSubmit(form : NgForm){
    if(this.selectType == 1)
    {
      this.StudentService.loginStudent(form.value).subscribe(
        res => {

          this.StudentService.setToken(res['token']);
          this.StudentService.setStudentInfo(res['studentId']);
          this.router.navigateByUrl('/viewgrade');
        },
        err => {
          this.serverErrorMessages = err.error.message;
        }
      );
    }else{
    this.teacherService.loginTeacher(form.value).subscribe(
      res => {
        this.teacherService.setToken(res['token']);
        this.teacherService.setTeacherInfo(res['teacherId']);
        this.router.navigateByUrl('/grade');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
  }
}

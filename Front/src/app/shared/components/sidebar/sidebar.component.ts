import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Services/StudentServices/student.service';
import { TeacherService } from '../../Services/TeacherServices/teacher.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public isTeacherAuthenticated : boolean = false;
  public isStudentAuthenticated : boolean = false;
  constructor(public teacherService : TeacherService,public studentservice: StudentService) { }

  ngOnInit() {
    this.isTeacherAuthenticated = this.teacherService.isLoggedIn();
    this.isStudentAuthenticated = this.studentservice.isLoggedIn();
    console.log(this.isTeacherAuthenticated);
    console.log(this.isStudentAuthenticated);
  }

}

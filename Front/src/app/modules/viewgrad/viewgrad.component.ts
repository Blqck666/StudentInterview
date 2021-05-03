import { Component, OnInit } from '@angular/core';
import { Notifications } from 'src/app/shared/Services/NotificationsServices/notifications.model';
import { Studentscore } from 'src/app/shared/Services/StudentScoreServices/studentscore.model';
import { Student } from 'src/app/shared/Services/StudentServices/student.model';
import { StudentService } from 'src/app/shared/Services/StudentServices/student.service';
import { TeacherService } from 'src/app/shared/Services/TeacherServices/teacher.service';

@Component({
  selector: 'app-viewgrad',
  templateUrl: './viewgrad.component.html',
  styleUrls: ['./viewgrad.component.scss']
})
export class ViewgradComponent implements OnInit {
  public selectedClass : string;
  public selectedSubject : string;
  public studentList : any;
  public ELEMENT_DATA: any[] = [];
  displayedColumns: string[] = ['Subject', 'Class','Grade','coefficient'];
  dataSource;
  studentId :string;

  constructor(private studentService: StudentService) { }

  ngOnInit() {

    this.studentId = this.studentService.getStudentInfo();
    this.GetAllGradeByStudentId(this.studentId);
  }


  GetAllGradeByStudentId(id: string) {
    this.studentService.getAllGradeByStudentId(id).subscribe((res) => {
      this.studentList = res;
      this.dataSource = this.studentList;
      console.log(this.studentList);
    });
  }
}

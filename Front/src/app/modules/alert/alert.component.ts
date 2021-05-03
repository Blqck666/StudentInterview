import { Component, OnInit } from '@angular/core';
import { Notifications } from 'src/app/shared/Services/NotificationsServices/notifications.model';
import { StudentService } from 'src/app/shared/Services/StudentServices/student.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  public selectedClass : string;
  public selectedSubject : string;
  public studentList : any;
  public ELEMENT_DATA: any[] = [];
  displayedColumns: string[] = ['title', 'SubjectID'];
  dataSource;
  studentId :string;

  constructor(private studentService: StudentService) { }

  ngOnInit() {

    this.studentId = this.studentService.getStudentInfo();
    this.GetAllNotificationByStudentId(this.studentId);
  }


  GetAllNotificationByStudentId(id: string) {
    this.studentService.getAllNotificationByStudentId(id).subscribe((res) => {
      this.studentList = res;
      console.log(res);
      this.dataSource = this.studentList;
      console.log(this.studentList);
    });
  }
}

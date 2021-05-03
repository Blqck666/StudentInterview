import { Component, OnInit } from '@angular/core';
import { Notifications } from 'src/app/shared/Services/NotificationsServices/notifications.model';
import { Studentscore } from 'src/app/shared/Services/StudentScoreServices/studentscore.model';
import { Student } from 'src/app/shared/Services/StudentServices/student.model';
import { TeacherService } from 'src/app/shared/Services/TeacherServices/teacher.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {

  public ClassID : string;
  public selectedSubject : string;
  public studentList : any;
  public ELEMENT_DATA: any[] = [];
  displayedColumns: string[] = ['firstname', 'lastname', 'ScolarYear','Subject','Grade','action'];
  dataSource;
  teacherid :string;
  studentid: string;
  studentgrad : Studentscore;
  dataSplited : string[];
  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.refreshClassNameList();
    this.refreshSubjectList();
  }

  addNew(i: number, _id: string, StudentID: string, IdSubject: string, Grade: number) {
    //this.studentid = StudentID;
    let student = new Studentscore(this.ClassID,this.selectedSubject,Grade,this.studentid);

    if(Grade < 10)
    {
      let notification = new Notifications(this.studentid,"VERY LOW GRAD",this.selectedSubject);
      this.teacherService.postNotification(notification);
    }
    if(this.studentgrad == null)
    {
      this.teacherService.postScore(student);
    }
    else
    {
      this.teacherService.updateScore(this.studentgrad._id,student);
    }


  }
  onDeviceChange(ob) {
    this.ClassID = ob.value;
    this.refreshStudentList(this.ClassID);
  }

  onSubjectChange(ob,row):void {
    this.dataSplited =  ob.value.split('**');
    this.selectedSubject = this.dataSplited[0];
    this.studentid = this.dataSplited[1];
    this.teacherService.getAllStudentGradeBySubjectAndClass(this.selectedSubject,this.studentid,this.ClassID).subscribe((res) =>{
      this.studentgrad = res as Studentscore;
      row.Grade = this.studentgrad.Grade;
    });

  }


  refreshSubjectList() {
    this.teacherid = this.teacherService.getTeacherInfo();
    this.teacherService.getAllSubjectByTeacherId(this.teacherid);
  }


  refreshStudentList(id: string) {
    this.teacherService.getAllStudentByClassIdAndYear(id).subscribe((res) => {
      this.studentList = res;
      this.dataSource = this.studentList;
    });
  }

  refreshClassNameList() {
    console.log(this.teacherService.getAllClassName());
  }
}

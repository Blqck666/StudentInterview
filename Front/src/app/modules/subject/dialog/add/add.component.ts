import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {TeacherService} from '../../../../shared/Services/TeacherServices/teacher.service';
import {FormControl, Validators} from '@angular/forms';
import {Subject} from '../../../../shared/Services/SubjectServices/subject.model';
import { Teacher } from 'src/app/shared/Services/TeacherServices/teacher.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Subject,
    public teacherService: TeacherService) { }

formControl = new FormControl('', [
Validators.required
// Validators.email,
]);
public selectedDevice : string;


ngOnInit() {
  this.refreshTeacherNameList();
}
refreshTeacherNameList() {
  this.teacherService.getAllTeachers().subscribe((res) =>{
    this.teacherService.teachers = res as Teacher[];
  });
}
getErrorMessage() {
return this.formControl.hasError('required') ? 'Required field' :
this.formControl.hasError('email') ? 'Not a valid email' :
'';
}

submit() {
// emppty stuff
}

onNoClick(): void {
this.dialogRef.close();
}


public confirmAdd(): void {

this.teacherService.postSubject(this.data);
}

}

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {TeacherService} from '../../../../shared/Services/TeacherServices/teacher.service';
import { NgForm } from "@angular/forms";
import { Teacher } from 'src/app/shared/Services/TeacherServices/teacher.model';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public teacherService: TeacherService) { }

formControl = new FormControl('', [
Validators.required
// Validators.email,
]);
selectedFoods = this.data.Registrations;
ngOnInit() {
  this.refreshTeacherNameList();

}

getErrorMessage() {
return this.formControl.hasError('required') ? 'Required field' :
'';
}

refreshTeacherNameList() {
  this.teacherService.getAllTeachers().subscribe((res) =>{
    this.teacherService.teachers = res as Teacher[];
  });
}

submit(form: NgForm) {
}

onNoClick(): void {
this.dialogRef.close();
}

stopEdit(): void {
  console.log("AZE"+ this.data._id);
this.teacherService.updateSubject(this.data);
}
}

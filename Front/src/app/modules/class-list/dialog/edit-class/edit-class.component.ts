import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {TeacherService} from '../../../../shared/Services/TeacherServices/teacher.service';
import { NgForm } from "@angular/forms";

import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss']
})
export class EditClassComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<EditClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public teacherService: TeacherService) { }

formControl = new FormControl('', [
Validators.required
// Validators.email,
]);
ngOnInit() {
console.log("edit",this.data);
}

getErrorMessage() {
return this.formControl.hasError('required') ? 'Required field' :
this.formControl.hasError('email') ? 'Not a valid email' :
'';
}

submit(form: NgForm) {
}

onNoClick(): void {
this.dialogRef.close();
}

stopEdit(): void {
this.teacherService.updateClassName(this.data);
}
}

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {TeacherService} from '../../../../shared/Services/TeacherServices/teacher.service';
import {FormControl, Validators} from '@angular/forms';
import {Classname} from '../../../../shared/Services/ClassNameServices/classname.model';


@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent {
  constructor(public dialogRef: MatDialogRef<AddClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Classname,
    public dataService: TeacherService) { }

formControl = new FormControl('', [
Validators.required
// Validators.email,
]);

getErrorMessage() {
return this.formControl.hasError('required') ? 'Required field' :
this.formControl.hasError('email') ? 'Not a valid email' :
'';
}

submit() {

}

onNoClick(): void {
this.dialogRef.close();
}

public confirmAdd(): void {

this.dataService.postClass(this.data);
}

}


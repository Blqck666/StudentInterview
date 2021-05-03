
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {TeacherService} from '../../../../shared/Services/TeacherServices/teacher.service';



@Component({
  selector: 'app-delete-class',
  templateUrl: './delete-class.component.html',
  styleUrls: ['./delete-class.component.scss']
})
export class DeleteClassComponent {

  constructor(public dialogRef: MatDialogRef<DeleteClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public teacherService:TeacherService) { }


onNoClick(): void {
this.dialogRef.close();
}

confirmDelete(): void {
//this.dataService.deleteIssue(this.data.id);
this.teacherService.deleteClassName(this.data._id);
}
}


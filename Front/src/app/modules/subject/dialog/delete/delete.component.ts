import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {TeacherService} from '../../../../shared/Services/TeacherServices/teacher.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public teacherService:TeacherService) { }


onNoClick(): void {
this.dialogRef.close();
}

confirmDelete(): void {

this.teacherService.deleteSubject(this.data._id);
}
}

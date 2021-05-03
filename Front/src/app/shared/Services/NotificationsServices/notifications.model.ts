export class Notifications {
  _id: string;
  StudentID: string;
  title: string;
  SubjectID: string;

  constructor(StudentID, title, SubjectID){
    this.StudentID = StudentID;
    this.title = title;
    this.SubjectID = SubjectID;

}
}

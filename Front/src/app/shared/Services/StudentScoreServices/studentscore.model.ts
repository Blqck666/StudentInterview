export class Studentscore {
  _id:string;
  IdClass: string;
  IdSubject: string;
  Grade: number;
  IdStudent: string;

  constructor(IdClass, IdSubject, Grade,IdStudent){
    this.IdClass = IdClass;
    this.IdSubject = IdSubject;
    this.Grade = Grade;
    this.IdStudent = IdStudent;
}
}

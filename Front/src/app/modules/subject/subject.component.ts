import { TeacherService } from '../../shared/Services/TeacherServices/teacher.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subject} from '../../shared/Services/SubjectServices/subject.model';
import {DataSource} from '@angular/cdk/collections';
import {AddComponent} from './dialog/add/add.component';
import {EditComponent} from './dialog/edit/edit.component';
import {DeleteComponent} from './dialog/delete/delete.component';
//import {EditRegistrationComponent} from './Registrationdialogs/edit-registration/edit-registration.component';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  displayedColumns = [ 'SubjectName', 'Coefficient', 'IdTeacher', 'actions'];
  exampleDatabase: TeacherService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  _id: string;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: TeacherService,
              private router: Router) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    const dialogRef = this.dialog.open(AddComponent, {
      data: {subject: Subject }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChangeSubject.value.push(this.dataService.getDialogData());
        console.log("After push",this.dataService.getDialogData())
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, _id: string, SubjectName: string, coefficient: string, IdTeacher: string) {
    this._id = _id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(EditComponent, {
      data: {_id: _id, SubjectName: SubjectName, coefficient: coefficient, IdTeacher: IdTeacher}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChangeSubject.value.findIndex(x => x._id === this._id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChangeSubject.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, _id: string, SubjectName: string, coefficient: string, IdTeacher: string) {
    this.index = i;
    this._id = _id;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {_id: _id, SubjectName: SubjectName, coefficient: coefficient, IdTeacher: IdTeacher}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChangeSubject.value.findIndex(x => x._id === this._id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChangeSubject.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.exampleDatabase = new TeacherService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

}
export class ExampleDataSource extends DataSource<Subject> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Subject[] = [];
  renderedData: Subject[] = [];

  constructor(public _exampleDatabase: TeacherService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Subject[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChangeSubject,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllSubject();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.dataSubject.slice().filter((subject: Subject) => {
          console.log(subject);
          const searchStr = (subject._id + subject.SubjectName + subject.coefficient + subject.IdTeacher).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: Subject[]): Subject[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case '_id': [propertyA, propertyB] = [a._id, b._id]; break;
        case 'SubjectName': [propertyA, propertyB] = [a.SubjectName, b.SubjectName]; break;
        case 'Coefficient': [propertyA, propertyB] = [a.coefficient, b.coefficient]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

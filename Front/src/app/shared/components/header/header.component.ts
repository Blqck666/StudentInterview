import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TeacherService } from '../../Services/TeacherServices/teacher.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private adminService: TeacherService,private router: Router) { }

  ngOnInit() { }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  onLogout(){
    this.adminService.deleteToken();
    this.router.navigate(['/login']);
  }

}

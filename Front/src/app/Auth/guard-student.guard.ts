import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from "@angular/router";
import { StudentService } from '../shared/Services/StudentServices/student.service';

@Injectable({
  providedIn: 'root'
})
export class GuardStudentGuard implements CanActivate {

  constructor(private studentService : StudentService,private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.studentService.isLoggedIn()) {
        this.router.navigateByUrl('/login');
        this.studentService.deleteToken();
        return false;
      }
    return true;
  }
}

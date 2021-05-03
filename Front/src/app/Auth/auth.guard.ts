import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TeacherService } from "../shared/Services/TeacherServices/teacher.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private teacherService : TeacherService,private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.teacherService.isLoggedIn()) {
        this.router.navigateByUrl('/login');
        this.teacherService.deleteToken();
        return false;
      }
    return true;
  }

}


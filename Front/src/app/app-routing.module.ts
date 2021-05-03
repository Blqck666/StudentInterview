import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { PostsComponent } from './modules/posts/posts.component';
import { UserComponent } from './modules/user/user.component';
import { SubjectComponent } from './modules/subject/subject.component';
import { UsersComponent } from '../app/modules/users/users.component';
import { SignUpComponent } from '../app/modules/users/sign-up/sign-up.component';
import { SignInComponent } from '../app/modules/users/sign-in/sign-in.component';
import { AuthGuard } from '../app/Auth/auth.guard';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatFormFieldModule,MatSelectModule,MatInputModule,MatDividerModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule,
  MatBadgeModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule } from '@angular/material';
import { AlertComponent } from './modules/alert/alert.component';
import { ClassListComponent } from './modules/class-list/class-list.component';
import { GradeComponent } from './modules/grade/grade.component';
import { ViewgradComponent } from './modules/viewgrad/viewgrad.component';
import { GuardStudentGuard } from './Auth/guard-student.guard';
const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: DefaultComponent,
    children: [{
      path: 'posts',
      component: PostsComponent
    }, {
      path: 'grade',
      component: GradeComponent,canActivate:[AuthGuard]
    },
    { path: 'subject',          component: SubjectComponent,canActivate:[AuthGuard] },
    { path: 'addusers',      component: UserComponent ,canActivate:[AuthGuard]},
    { path: 'notifications',      component: AlertComponent ,canActivate:[GuardStudentGuard]},
    { path: 'classlist',      component: ClassListComponent ,canActivate:[AuthGuard]},
    { path: 'viewgrade',      component: ViewgradComponent ,canActivate:[GuardStudentGuard]},
  ],

  },
  {
    path: 'signup', component: UsersComponent,
    children: [{ path: '', component: SignUpComponent }]
  },

{

    path: 'login', component: UsersComponent,
    children: [{ path: '', component: SignInComponent }]
},
{
    path: '', redirectTo: '/login', pathMatch: 'full'
},
  {
    path: '', redirectTo: '/signup', pathMatch: 'full'
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes),    MatMenuModule,
    MatCardModule,
    MatListModule,MatFormFieldModule,MatSelectModule,MatInputModule,MatBadgeModule,MatSidenavModule,MatGridListModule,MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,FlexLayoutModule],
  exports: [RouterModule,MatMenuModule,
    MatCardModule,
    MatListModule,MatFormFieldModule,MatSelectModule,MatInputModule,MatBadgeModule,MatSidenavModule,MatGridListModule,MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule]
})
export class AppRoutingModule { }

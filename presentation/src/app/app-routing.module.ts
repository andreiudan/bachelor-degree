import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { LandingComponent } from './components/landing/landing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SprintComponent } from './components/sprint/sprint.component';
import { TaskComponent } from './components/task/task.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { BacklogComponent } from './components/backlog/backlog.component';
import { UserComponent } from './components/user/user.component';
import { CreateIssueComponent } from './components/create-issue/create-issue.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { ProjectsComponent } from './components/projects/projects.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ValidationSuccessfulComponent } from './components/validation-successful/validation-successful.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ guestGuard ]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ guestGuard ]
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'registerSuccessful',
    component: RegisterComponent,
    canActivate: [authGuard]
  },
  {
    path: 'task/:taskId',
    component: TaskComponent,
    canActivate: [authGuard]
  },
  {
    path: 'sprint',
    component: SprintComponent,
    canActivate: [authGuard]
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [authGuard]
  },
  {
    path: 'backlog',
    component: BacklogComponent,
    canActivate: [authGuard]
  },
  {
    path: 'user/:userId',
    component: UserComponent,
    canActivate: [authGuard]
  },
  {
    path: 'createIssue/:sprintId',
    component: CreateIssueComponent,
    canActivate: [authGuard],
    data: { sprintId: '' }
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'accountValidationSuccessful',
    component: ValidationSuccessfulComponent,
    canActivate: [ guestGuard ],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

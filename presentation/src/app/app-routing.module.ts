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
import { CalendarEventDetailsComponent } from './components/calendar-event-details/calendar-event-details.component';
import { CalendarEventComponent } from './components/calendar-event/calendar-event.component';
import { BacklogComponent } from './components/backlog/backlog.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'registerSuccessful',
    component: RegisterComponent,
  },
  {
    path: 'task/:taskId',
    component: TaskComponent,
  },
  {
    path: 'sprint',
    component: SprintComponent,
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: 'backlog',
    component: BacklogComponent,
  },
  {
    path: 'user/:userId',
    component: UserComponent,
  },
  {
    path: 'calendar-event-details',
    component: CalendarEventDetailsComponent,
  },
  {
    path: 'calendar-event',
    component: CalendarEventComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

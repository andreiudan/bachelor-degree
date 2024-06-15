import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldControl, MatFormFieldDefaultOptions, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WrapperComponent } from './components/wrapper/wrapper.component'
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { HttpInterceptorService } from './services/interceptor/http-interceptor.service';
import { LandingComponent } from './components/landing/landing.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { TaskComponent } from './components/task/task.component';
import { SprintComponent } from './components/sprint/sprint.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DynamicHostDirective } from './directives/dynamic-host/dynamic-host.directive';
import { BacklogComponent } from './components/backlog/backlog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserComponent } from './components/user/user.component';
import { CreateIssueComponent } from './components/create-issue/create-issue.component';
import { authInterceptor } from './services/interceptor/auth.interceptor';
import { ErrorHandlingService } from './services/error-handling/error-handling.service';
import { DATE_FORMATS } from './date-formats';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

const matFormFieldOptions: MatFormFieldDefaultOptions = {
  hideRequiredMarker: true,
  appearance: 'outline',
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WrapperComponent,
    LandingComponent,
    DashboardComponent,
    TaskComponent,
    SprintComponent,
    CalendarComponent,
    DynamicHostDirective,
    BacklogComponent,
    UserComponent,
    CreateIssueComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatGridListModule,
    MatCheckboxModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,useValue: matFormFieldOptions },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
    { provide: ErrorHandler, useClass: ErrorHandlingService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

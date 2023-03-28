import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { Page404Component } from './page404/page404.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { AuthService } from './auth/auth.service'
import { AuthGuard } from './auth/auth.guard'
import { TodosService } from './todos.service';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserDetailsComponent } from './user-details/user-details.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddlimitInterceptor } from './addlimit.interceptor';

const routes: Routes = [
  {path:'', component: TodoListComponent, canActivate:[AuthGuard]},
  {path:'todos/:id', component: TodoDetailsComponent, canActivate:[AuthGuard]},
  {path:'profile', component: UserDetailsComponent, canActivate:[AuthGuard]},
  {path:'signin', component: SignInFormComponent},
  {path:'login', component: LoginFormComponent},
  {path:'**', component: Page404Component}
];
@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    NavBarComponent,
    FooterComponent,
    TodoListComponent,
    Page404Component,
    TodoDetailsComponent,
    SignInFormComponent,
    LoginFormComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard, TodosService,
    { provide: HTTP_INTERCEPTORS, useClass: AddlimitInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

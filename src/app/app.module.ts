import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
import { TodosService } from './todos.service'

const routes: Routes = [
  {path:'', component: TodoListComponent},
  {path:'todos/:id/:todo/:completed', component: TodoDetailsComponent},
  {path:'signin', component: TodoDetailsComponent ,canActivate:[AuthGuard]},
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
    TodoDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, AuthGuard, TodosService],
  bootstrap: [AppComponent]
})
export class AppModule { }

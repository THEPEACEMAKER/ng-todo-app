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

const routes: Routes = [
  {path:'', component: TodoListComponent},
  {path:'**', component: Page404Component}
];
@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    NavBarComponent,
    FooterComponent,
    TodoListComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

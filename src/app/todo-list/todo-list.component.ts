import { Component } from '@angular/core';
import { Todo } from './Todo';
import { TodosService } from '../todos.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  title: string = 'todo-app';
  
  todos$: Observable<Todo[]> = this.TodosService.getSelectedTodos$();
  statusSelected$: Observable<string> =this.TodosService.statusSelected;
  constructor(private TodosService: TodosService) { }

  newTodo: string = '';
  // setValue() {
  //   this.todos.push({
  //     id: !this.todos.length ? 1 : this.todos[this.todos.length - 1].id + 1,
  //     todo: this.newTodo,
  //     completed: false,
  //     userId: 26,
  //   });
  //   this.newTodo = '';
  // }

  selectByStatus(status: string) {
    this.TodosService.selectByStatus(status);
  }

  deleteTodo(id: number):void {
    this.TodosService.deleteTodo(id);
  }

  clearAll() {
    // this.todos = [];
  }

}

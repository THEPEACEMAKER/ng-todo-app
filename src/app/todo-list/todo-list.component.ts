import { Component, OnInit } from '@angular/core';
import { Todo } from './Todo';
import { TodosService } from '../todos.service'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  title: string = 'todo-app';

  todos: Todo[] = []
  constructor(private TodosService: TodosService) { }
  ngOnInit(): void {
    this.todos = this.TodosService.getTodos();
  }

  newTodo: string = '';
  setValue() {
    this.todos.push({
      id: !this.todos.length ? 1 : this.todos[this.todos.length - 1].id + 1,
      todo: this.newTodo,
      completed: false,
      userId: 26,
    });
    this.newTodo = '';
  }

  statusSelected: string = 'all';
  selectByStatus(status: string) {
    this.statusSelected = status;
  }

  selectedTodos(status: string) {
    return this.statusSelected == 'all'
      ? this.todos
      : this.todos.filter((todo: Todo) => {
          return this.statusSelected == 'pending'
            ? !todo.completed
            : todo.completed;
        });
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
  }

  clearAll() {
    this.todos = [];
  }

}

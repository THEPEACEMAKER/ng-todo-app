import { Injectable } from '@angular/core';
import { Todo } from './Todo';
import { User } from './auth/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service'
import { TodosSummary } from './todos-summary';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private readonly TODOS_STORAGE_KEY = 'todos_list';
  private readonly DELETED_TODOS_STORAGE_KEY = 'todos_deleted_list';

  todos: Todo[] = [];
  deletedTodos: Todo[] = [];

  LoggedUserId!: number | undefined;
  
  constructor(private AuthService: AuthService, private http: HttpClient) {
    this.AuthService.LoggedUser$.subscribe(user => {
      this.LoggedUserId = user?.id
      this.loadTodos();
    });
  }

  private saveTodos(): void {
    localStorage.setItem(this.TODOS_STORAGE_KEY, JSON.stringify(this.todos));
    localStorage.setItem(this.DELETED_TODOS_STORAGE_KEY, JSON.stringify(this.deletedTodos));
  }

  private loadTodos(): void {
    const storedTodos = localStorage.getItem(this.TODOS_STORAGE_KEY);
    const storedDeletedTodos = localStorage.getItem(this.DELETED_TODOS_STORAGE_KEY);
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }else {
      this.http.get<any>('https://dummyjson.com/todos').subscribe(data => {
        this.todos = data.todos;
      });
      this.saveTodos();
    }
    if (storedDeletedTodos) {
      this.deletedTodos = JSON.parse(storedDeletedTodos);
    }
  }

  statusSelected = new BehaviorSubject<string>('all');

  selectByStatus(status: string) {
    this.statusSelected.next(status);
  }

  getSelectedTodos$(): Observable<Todo[]>{
    // returns a new Observable every time the statusSelected value changes.
    return this.statusSelected.pipe(
      map(statusSelected => {
        if (statusSelected == 'all'){
          return this.todos.filter(todo => todo.userId === this.LoggedUserId);
        }else if(statusSelected == 'pending'){
          return this.todos.filter(todo =>!todo.completed && todo.userId === this.LoggedUserId);
        }else if(statusSelected == 'completed'){
          return this.todos.filter(todo => todo.completed && todo.userId === this.LoggedUserId);
        }else if(statusSelected == 'favorite'){
          return this.todos.filter(todo => todo.favorite && todo.userId === this.LoggedUserId);
        }else {
          return this.deletedTodos.filter(todo => todo.userId === this.LoggedUserId);
        }
      }
    ));
    // when you subscribe to the returned Observable, 
    // you need to resubscribe to it every time the statusSelected value changes
    // to get the updated filtered array.
  }

  getTodosSummary$(): Observable<TodosSummary>{
    // returns a new Observable every time the statusSelected value changes.
    return this.statusSelected.pipe(
      map(statusSelected => {
        return {
          total: this.todos.filter(todo => todo.userId === this.LoggedUserId).length,
          pending: this.todos.filter(todo => !todo.completed && todo.userId === this.LoggedUserId).length,
          completed: this.todos.filter(todo => todo.completed && todo.userId === this.LoggedUserId).length,
          favorite: this.todos.filter(todo => todo.favorite && todo.userId === this.LoggedUserId).length,
          deleted: this.deletedTodos.filter(todo => todo.userId === this.LoggedUserId).length,
        }
        }
    ));
  }

  deleteTodo(id: number): void {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      const deletedTodo = this.todos.splice(index, 1)[0];
      this.deletedTodos.push(deletedTodo);
      this.saveTodos();
      this.statusSelected.next(this.statusSelected.getValue());
    }
  }

  loveTodo(id: number): void {
    const todo = this.todos.find(a => a.id === id);
    if (todo) {
      todo.favorite = !todo.favorite;
      this.saveTodos();
      this.statusSelected.next(this.statusSelected.getValue());
    }
  }

  newTodo(todo: Todo): void {
    todo.id =  !this.todos.length ? 1 : this.todos[this.todos.length - 1].id + 1;
    if(this.LoggedUserId){
      todo.userId = this.LoggedUserId;
    }
    this.todos.push(todo);
    this.saveTodos();
    this.statusSelected.next(this.statusSelected.getValue());
  }

  toggleCompleted(todo: Todo): void {
    const index = this.todos.findIndex(a => a.id === todo.id);
    if (index!== -1) {
      this.todos[index].completed = !this.todos[index].completed;
      this.saveTodos();
      console.log("toggle", todo.id)
      this.statusSelected.next(this.statusSelected.getValue());
    }
  }

  clearAll(): void {
    if (this.statusSelected.getValue() == 'all'){
      this.todos = [];
    }else if(this.statusSelected.getValue() == 'pending'){
      this.todos = this.todos.filter(todo => !todo.completed && todo.userId === this.LoggedUserId);
    }else if(this.statusSelected.getValue() == 'completed') {
      this.todos = this.todos.filter(todo => todo.completed && todo.userId === this.LoggedUserId);
    }else if(this.statusSelected.getValue() == 'favorite') {
      this.todos = this.todos.filter(todo => todo.favorite && todo.userId === this.LoggedUserId);
    }else {
      this.deletedTodos = [];
    }

    this.saveTodos();
    this.statusSelected.next(this.statusSelected.getValue());
  }

  getTodo(id:number): Todo | undefined {
    return this.todos.find(a => a.id === Number(id));
  }

}

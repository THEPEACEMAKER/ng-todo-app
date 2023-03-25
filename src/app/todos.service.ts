import { Injectable } from '@angular/core';
import { Todo } from './Todo';
import { User } from './auth/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos: Todo[] = [
    {
      id: 1,
      todo: 'Do something nice for someone I care about',
      completed: true,
      userId: 48,
    },
    {
      id: 2,
      todo: 'Memorize the fifty states and their capitals',
      completed: false,
      userId: 48,
    },
    { id: 3, todo: 'Watch a classic movie', completed: false, userId: 4 },
    {
      id: 4,
      todo: 'Contribute code or a monetary donation to an open-source software project',
      completed: false,
      userId: 48,
    },
    { id: 5, todo: "Solve a Rubik's cube", completed: false, userId: 31 },
    {
      id: 6,
      todo: 'Bake pastries for me and neighbor',
      completed: false,
      userId: 39,
    },
    {
      id: 7,
      todo: 'Go see a Broadway production',
      completed: false,
      userId: 32,
    },
    {
      id: 8,
      todo: 'Write a thank you letter to an influential person in my life',
      completed: true,
      userId: 13,
    },
    {
      id: 9,
      todo: 'Invite some friends over for a game night',
      completed: false,
      userId: 47,
    },
    {
      id: 10,
      todo: 'Have a football scrimmage with some friends',
      completed: false,
      userId: 19,
    },
    {
      id: 11,
      todo: "Text a friend I haven't talked to in a long time",
      completed: false,
      userId: 39,
    },
    { id: 12, todo: 'Organize pantry', completed: true, userId: 39 },
    {
      id: 13,
      todo: 'Buy a new house decoration',
      completed: false,
      userId: 16,
    },
    {
      id: 14,
      todo: "Plan a vacation I've always wanted to take",
      completed: false,
      userId: 28,
    },
    { id: 15, todo: 'Clean out car', completed: false, userId: 33 },
    { id: 16, todo: 'Draw and color a Mandala', completed: true, userId: 24 },
    {
      id: 17,
      todo: 'Create a cookbook with favorite recipes',
      completed: false,
      userId: 1,
    },
    {
      id: 18,
      todo: 'Bake a pie with some friends',
      completed: false,
      userId: 1,
    },
    { id: 19, todo: 'Create a compost pile', completed: true, userId: 5 },
    {
      id: 20,
      todo: 'Take a hike at a local park',
      completed: true,
      userId: 43,
    },
    {
      id: 21,
      todo: 'Take a class at local community center that interests you',
      completed: false,
      userId: 22,
    },
    {
      id: 22,
      todo: 'Research a topic interested in',
      completed: false,
      userId: 4,
    },
    {
      id: 23,
      todo: 'Plan a trip to another country',
      completed: true,
      userId: 37,
    },
    { id: 24, todo: 'Improve touch typing', completed: false, userId: 45 },
    { id: 25, todo: 'Learn Express.js', completed: false, userId: 49 },
    { id: 26, todo: 'Learn calligraphy', completed: false, userId: 50 },
    {
      id: 27,
      todo: 'Have a photo session with some friends',
      completed: false,
      userId: 14,
    },
    { id: 28, todo: 'Go to the gym', completed: false, userId: 15 },
    { id: 29, todo: 'Make own LEGO creation', completed: false, userId: 30 },
    { id: 30, todo: 'Take cat on a walk', completed: false, userId: 15 },
  ];

  deletedTodos: Todo[] = [];

  LoggedUserId!: number;
  todosLength$: BehaviorSubject<number> = new BehaviorSubject<number>(this.todos.filter(todo => todo.userId === this.LoggedUserId).length);
  
  constructor(private AuthService: AuthService) {
    this.AuthService.LoggedUser$.subscribe(user => this.LoggedUserId = user.id);
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
        }else {
          return this.todos.filter(todo => todo.completed && todo.userId === this.LoggedUserId);
        }}
    ));
    // when you subscribe to the returned Observable, 
    // you need to resubscribe to it every time the statusSelected value changes
    // to get the updated filtered array.
  }

  deleteTodo(id: number): void {
    let deletedElements = this.todos.splice(this.todos.findIndex(a => a.id === id) , 1)
    this.deletedTodos.push(deletedElements[0]);
    this.todosLength$.next(this.todos.filter(todo => todo.userId === this.LoggedUserId).length);
    this.statusSelected.next(this.statusSelected.getValue());
  }

  newTodo(todo: Todo): void {
    todo.id =  !this.todos.length ? 1 : this.todos[this.todos.length - 1].id + 1,
    todo.userId = this.LoggedUserId;
    this.todos.push(todo);
    this.todosLength$.next(this.todos.filter(todo => todo.userId === this.LoggedUserId).length);
    this.statusSelected.next(this.statusSelected.getValue());
  }

  toggleCompleted(todo: Todo): void {
    const index = this.todos.findIndex(a => a.id === todo.id);
    this.todos[index].completed = todo.completed;
    // to update the UI instantly
    this.statusSelected.next(this.statusSelected.getValue());
  }

  clearAll(): void {
    if (this.statusSelected.getValue() == 'all'){
      this.todos = [];
    }else if(this.statusSelected.getValue() == 'pending'){
      this.todos = this.todos.filter(todo => todo.completed && todo.userId === this.LoggedUserId);
    }else {
      this.todos = this.todos.filter(todo => !todo.completed && todo.userId === this.LoggedUserId);
    }
    // to update the UI instantly
    this.statusSelected.next(this.statusSelected.getValue());
  }

}

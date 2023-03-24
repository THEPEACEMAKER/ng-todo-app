import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  @Input() 
  id!: number;
  @Input() 
  todo!: string;
  @Input() 
  completed!: boolean;
  @Input()
  userId!: number;
  
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() toggleEvent = new EventEmitter<Todo>();
  
  constructor() { }

  deleteTodo() {
    this.deleteEvent.emit(this.id)
  }

  toggleCompleted() {
    this.toggleEvent.emit({id: this.id, todo: this.todo, completed: this.completed, userId: this.userId})
  }

}

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
  @Input()
  favorite!: boolean | undefined;
  
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() toggleEvent = new EventEmitter<Todo>();
  @Output() loveEvent = new EventEmitter<number>();
  
  constructor() { }

  deleteTodo() {
    this.deleteEvent.emit(this.id)
  }

  loveTodo() {
    this.loveEvent.emit(this.id)
  }

  toggleCompleted() {
    this.toggleEvent.emit({id: this.id, todo: this.todo, completed: this.completed, userId: this.userId})
  }

}

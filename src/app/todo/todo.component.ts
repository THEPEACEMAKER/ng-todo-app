import { Component, Input, Output, EventEmitter } from '@angular/core';

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
  
  @Output() deleteEvent = new EventEmitter<number>();
  
  constructor() { }

  deleteTodo() {
    this.deleteEvent.emit(this.id)
  }

}

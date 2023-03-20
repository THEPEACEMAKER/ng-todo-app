import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  // template: `
  //     Say {{ id }} - {{ todo }} - {{ completed }}
  // `,
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  @Input() 
  id!: number;
  @Input() 
  todo!: string;
  @Input() 
  completed!: boolean;
  
  constructor() { }
}

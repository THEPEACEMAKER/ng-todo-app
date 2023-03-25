import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodosService } from '../todos.service'
import { Todo } from '../Todo';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit{  
  todo!: Todo | undefined;

  constructor(private TodosService: TodosService, private _activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id: number = this._activateRoute.snapshot.params['id'];
    this.todo = this.TodosService.getTodo(id);
  }

  deleteTodo(id: number):void {
    this.TodosService.deleteTodo(id);
  }

  loveTodo(id: number):void {
    console.log(id);
    this.TodosService.loveTodo(id);
  }

  toggleCompleted(todo: Todo):void {
    // Call the service method to update the original todos array
    this.TodosService.toggleCompleted(todo);
  }

}

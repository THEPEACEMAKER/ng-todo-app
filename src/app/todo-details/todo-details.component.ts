import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit{  
  todo!: { id:number; todo: string;completed: boolean}

  constructor(private _activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.todo = {
      id: this._activateRoute.snapshot.params['id'],
      todo: this._activateRoute.snapshot.params['todo'],
      completed: this._activateRoute.snapshot.params['completed']
    }
  }

}

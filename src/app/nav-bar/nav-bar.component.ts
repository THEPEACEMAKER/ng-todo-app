import { Component, OnInit } from '@angular/core';
import { TodosService } from '../todos.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit  {
  todosNum:number=0;
  constructor(private TodosService: TodosService) { }
  ngOnInit(): void {
    this.todosNum = this.TodosService.getTodosNumber();
  }

}

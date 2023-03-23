import { Component, OnInit } from '@angular/core';
import { TodosService } from '../todos.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit  {
  todosNum:number=0;
  subscription!: Subscription;

  constructor(private TodosService: TodosService) { }
  ngOnInit(): void {
    this.subscription = this.TodosService.todosLength$.subscribe(len => this.todosNum = len)
  }

}

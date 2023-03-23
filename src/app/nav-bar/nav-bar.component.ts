import { Component } from '@angular/core';
import { TodosService } from '../todos.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  todosNum:number=0;
  Length$:Observable<number> =this.TodosService.todosLength$;

  constructor(private TodosService: TodosService) { }

}

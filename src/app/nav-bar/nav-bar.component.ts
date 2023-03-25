import { Component } from '@angular/core';
import { TodosService } from '../todos.service'
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  todosNum:number=0;

  constructor(private TodosService: TodosService, private AuthService: AuthService) { }
  isLoggedIn: BehaviorSubject<boolean> = this.AuthService.isAuthenticated$();
}

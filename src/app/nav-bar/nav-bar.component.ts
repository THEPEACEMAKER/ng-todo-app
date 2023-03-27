import { Component } from '@angular/core';
import { TodosService } from '../todos.service'
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service'
import { User } from '../auth/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  user:BehaviorSubject<User | null> = this.AuthService.LoggedUser$;

  constructor(private TodosService: TodosService, private AuthService: AuthService) { }
  isLoggedIn: BehaviorSubject<boolean> = this.AuthService.isAuthenticated$();

  logout(){
    this.AuthService.logout();
  }
}

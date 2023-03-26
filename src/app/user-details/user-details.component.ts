import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service'
import { BehaviorSubject } from 'rxjs';
import { User } from '../auth/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  user:BehaviorSubject<User> = this.AuthService.LoggedUser$;

  constructor(private AuthService: AuthService) { }

}

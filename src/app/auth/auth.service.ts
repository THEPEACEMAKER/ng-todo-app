import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: User[] = [
    {
    id: 48,
    name: "Adel",
    email: "Adel@mail.com",
    quote: "just do it",
    },
  ];


  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  LoggedUser$: BehaviorSubject<User> = new BehaviorSubject<User>({
    id: 48,
    name: "Adel",
    email: "Adel@mail.com",
    quote: "just do it",
  });

  constructor(private router: Router) { }

  isAuthenticated$(): BehaviorSubject<boolean>{
    return this.isLoggedIn$;
  }

  newUser(user: User): void {
    const newId = !this.users.length ? 1 : this.users[this.users.length - 1].id + 1;
    user.id =  newId,
    this.users.push(user);
    this.LoggedUser$.next(user);
    this.isLoggedIn$.next(true);
    this.router.navigate(['']);
  }

  login(name: string, email: string): void {
    const user: User|undefined = this.users.find(a => a.name === name && a.email === email);
    if (user) {
      this.LoggedUser$.next(user);
      this.isLoggedIn$.next(true);
      this.router.navigate(['']);
    }else{
      console.log("User not found");
    }
  }

  logout(): void {
    this.isLoggedIn$.next(false);
    this.router.navigate(['signin']);
  }
  
}

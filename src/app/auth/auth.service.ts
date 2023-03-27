import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_STORAGE_KEY = 'users';
  private readonly LOGGED_USER_KEY = 'loggedUser';

  users: User[] = [];
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  LoggedUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private router: Router) {
    const storedUsers = localStorage.getItem(this.USERS_STORAGE_KEY);
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }

    const storedUser = localStorage.getItem(this.LOGGED_USER_KEY);
    if (storedUser) {
      this.LoggedUser$.next(JSON.parse(storedUser));
      this.isLoggedIn$.next(true);
    }
  }

  isAuthenticated$(): BehaviorSubject<boolean>{
    return this.isLoggedIn$;
  }

  newUser(user: User): void {
    const userExist: User|undefined = this.users.find(a => a.email === user.email);
    if(!userExist) {
      const newId = !this.users.length ? 1 : Math.max(...this.users.map(u => u.id)) + 1;
      user.id =  newId,
      this.users.push(user);
      localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(this.users));
      this.LoggedUser$.next(user);
      this.isLoggedIn$.next(true);
      localStorage.setItem(this.LOGGED_USER_KEY, JSON.stringify(user));
      this.router.navigate(['']);
    }else {
      alert("There is a user already registered using this same mail");
    }

  }

  login(name: string, email: string): void {
    const user: User|undefined = this.users.find(a => a.name === name && a.email === email);
    if (user) {
      this.LoggedUser$.next(user);
      this.isLoggedIn$.next(true);
      localStorage.setItem(this.LOGGED_USER_KEY, JSON.stringify(user));
      this.router.navigate(['']);
    }else{
      alert("User not found");
    }
  }

  logout(): void {
    this.isLoggedIn$.next(false);
    this.LoggedUser$.next(null);
    localStorage.removeItem(this.LOGGED_USER_KEY);
    this.router.navigate(['login']);
  }
  
}

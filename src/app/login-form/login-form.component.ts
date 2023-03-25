import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(private AuthService: AuthService) { }

  handleFormSubmit(form: NgForm): void {
    this.AuthService.login(form.value.name, form.value.email);
  }

}

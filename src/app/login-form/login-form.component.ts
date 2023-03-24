import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  handleFormSubmit(form: NgForm): void {
    // value will print the JavaScript Object of the Form Values.
    console.log(form.value);
     }
}

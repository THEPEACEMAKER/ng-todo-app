import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {
  signForm!: FormGroup;

  constructor(private AuthService: AuthService) { }
  ngOnInit(): void {
    this.signForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'quote': new FormControl('', [Validators.required])
    });
  }

  handleSubmit() {
    this.AuthService.newUser({
      id: 0,
      name: this.signForm.value.name,
      email: this.signForm.value.email,
      quote: this.signForm.value.quote,
    });
 }
  
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {
  signForm!: FormGroup;
  ngOnInit(): void {
    this.signForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'quote': new FormControl('', [Validators.required])
    });
  }

  handleSubmit() {
    console.log(this.signForm.value);
 }
  
}

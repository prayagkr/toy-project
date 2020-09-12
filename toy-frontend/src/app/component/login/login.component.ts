import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && (control.dirty || control.touched || isSubmitted) && control.invalid);
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public matcher: MyErrorStateMatcher;

  constructor(
    private fb: FormBuilder
  ) {
    this.matcher = new MyErrorStateMatcher();
  }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });
  }

  public onSubmit() {
    console.log(this.loginForm.value);
  }

}

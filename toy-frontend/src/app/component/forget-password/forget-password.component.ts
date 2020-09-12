import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { passwordValidatorFn } from '../custom-validation/validator-function';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && (control.dirty || control.touched || isSubmitted) && control.invalid);
  }
}

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  public passwordForm: FormGroup;
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
    this.passwordForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
      confirmPassword: this.fb.control('', [Validators.required])
    }, { validator: passwordValidatorFn() });
  }

  public onSubmit() {
    console.log(this.passwordForm);
  }

  public reset() {
    this.passwordForm.reset();
  }


}

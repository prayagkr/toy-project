import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { passwordValidatorFn } from '../custom-validation/validator-function';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/service/common.service';
import { CookieService } from 'src/app/shared/service/cookie.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { RegisterModel, ResponseBody } from 'src/app/shared/model/shared.model';

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
    private fb: FormBuilder,
    private sharedService: SharedService,
    private toastr: ToastrService,
    public commonService: CommonService,
    private cookieService: CookieService,
    private router: Router,
  ) {
    this.matcher = new MyErrorStateMatcher();
    this.cookieService.clearCookie('token');
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
    this.commonService.setLoadingTrue();
    const fv = this.passwordForm.value;
    const password = window.btoa(fv.password);
    const confirmPassword = window.btoa(fv.password);
    const data: RegisterModel = new RegisterModel(fv.email, password, confirmPassword);

    this.sharedService.changePassword(data)
      .subscribe(
        (response: HttpResponse<ResponseBody<any>>) => {
          if (response.body.code === 2000) {
            this.toastr.success('Password changed successfull');
            this.router.navigateByUrl('/login');
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          if (error.error.code === 1001) {
            this.toastr.error('Invalid email id.');
          } else {
            this.toastr.error('Something went wrong. Please try again.');
          }
          this.commonService.resetLoading();
        },
        () => {
          this.commonService.resetLoading();
        }
      );
  }

  public reset() {
    this.passwordForm.reset();
  }


}

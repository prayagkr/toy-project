import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ResponseBody } from '../../shared/model/shared.model';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/service/common.service';
import { CookieService } from 'src/app/shared/service/cookie.service';
import { Router } from '@angular/router';

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
    private fb: FormBuilder,
    private sharedService: SharedService,
    private toastr: ToastrService,
    public commonService: CommonService,
    private cookieService: CookieService,
    private router: Router,
  ) {
    this.matcher = new MyErrorStateMatcher();
  }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });
  }

  public onSubmit(): void {
    this.commonService.setLoadingTrue();
    this.sharedService.login(this.loginForm.value)
      .subscribe(
        (response: HttpResponse<ResponseBody<any>>) => {
          console.log('response', response.body);
          if (response.body.code === 2000) {
            const token = response.body.data.token;
            this.cookieService.setCookie('token', token);
            this.toastr.success('login successfull');
            this.router.navigateByUrl('/home');
          }
        },
        (error: HttpErrorResponse) => {
          console.error('error');
        },
        () => {
          this.commonService.resetLoading();
        }
      );
  }

}

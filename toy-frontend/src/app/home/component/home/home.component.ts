import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/service/common.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel, ResponseBody } from 'src/app/shared/model/shared.model';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/shared/service/cookie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user: RegisterModel;

  constructor(
    private sharedService: SharedService,
    private commonService: CommonService,
    private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  private getUserDetails(): void {
    this.commonService.setLoadingTrue();
    this.sharedService.getUserDetails()
      .subscribe(
        (response: HttpResponse<ResponseBody<RegisterModel>>) => {
          console.log(response.body.data);
          this.user = response.body.data;
          this.commonService.userDetails.next(response.body.data);
          this.commonService.resetLoading();
        },
        (error: HttpErrorResponse) => {
          this.commonService.resetLoading();

        }
      );
  }

  public logout() {
    this.cookieService.clearCookie('token');
    this.router.navigateByUrl('/login');
  }

  public selectedTabChange(event) {
    if (event.index === 0) {
      this.router.navigateByUrl('/home/landing-page');
    } else if (event.index === 1) {
      this.router.navigateByUrl('/home/quiz');
    } else if (event.index === 2) {
      this.router.navigateByUrl('/home/profile');
    }
  }


}

import { Component, OnInit } from '@angular/core';
import { RegisterModel } from 'src/app/shared/model/shared.model';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public user: RegisterModel;
  public centered = false;
  public unbounded = false;

  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  private getUserDetails() {
    this.commonService.userDetails
      .subscribe(
        (data: RegisterModel) => {

          this.user = data;
        }
      );
  }

}

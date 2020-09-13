import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from './shared/service/common.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;

  constructor(
    public commonService: CommonService,
    private toastrService: ToastrService
  ) {}

  public ngOnInit(): void {
    this.toastrService.overlayContainer = this.toastContainer;
  }


}

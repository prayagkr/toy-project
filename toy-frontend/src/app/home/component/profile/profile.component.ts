import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CommonService } from 'src/app/shared/service/common.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ResponseBody, Score } from 'src/app/shared/model/shared.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Score>([]);

  public scores: Array<Score>;
  public displayedColumns: string[] = ['category', 'difficulty', 'score', 'submiteddate'];

  constructor(
    private sharedService: SharedService,
    private commonService: CommonService,
  ) {
    this.scores = new Array<Score>();
  }

  ngOnInit(): void {
    this.getQuizData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private getQuizData(): void {
    this.commonService.setLoadingTrue();
    this.sharedService.getQuizData()
      .subscribe(
        (response: HttpResponse<ResponseBody<Array<Score>>>) => {
          this.scores = response.body.data;
          this.dataSource = new MatTableDataSource<Score>(this.scores);
          this.dataSource.paginator = this.paginator;
          this.commonService.resetLoading();
        },
        (error: HttpErrorResponse) => {

          this.commonService.resetLoading();
        }
      );
  }

}

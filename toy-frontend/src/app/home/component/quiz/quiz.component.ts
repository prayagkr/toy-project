import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/service/common.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/shared/service/cookie.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Question } from 'src/app/shared/model/shared.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  public questions: Array<Question>;
  public selected: number;
  public selectedQuestion: Question;

  constructor(
    private sharedService: SharedService,
    private commonService: CommonService,
    private toastr: ToastrService,
    private router: Router,
    private cookieService: CookieService,
    private httpBackend: HttpBackend
  ) {
    this.questions = new Array<Question>();
  }

  ngOnInit(): void {
    this.getQuizData();
  }


  private getQuizData(): void {
    this.commonService.setLoadingTrue();
    const newHttpClient = new HttpClient(this.httpBackend);
    newHttpClient.get('https://opentdb.com/api.php?amount=10&amp;category=17&amp;difficulty=hard&amp;type=multiple')
      // this.sharedService.getQuizData()
      .subscribe(
        (response: any) => {
          this.questions = response['results'];
          this.questions.forEach((question: Question, index: number) => {
            question.id = index;
            let ans: Array<string> = question.incorrect_answers;
            ans.push(question.correct_answer);
            let shuffleAns = this.shuffle(ans);
            question.ans = shuffleAns;
            question.ansValue = '';
          });
          if (this.questions.length > 0) {
            this.selectQuestion(this.questions[0], 0);
          }
          this.commonService.resetLoading();
        },
        (error: HttpErrorResponse) => {
          this.commonService.resetLoading();

        }
      );
  }

  public selectQuestion(question: Question, index: number): void {
    this.selected = index;
    this.selectedQuestion = question;
  }

  public shuffle(arra1): [] {
    let ctr = arra1.length, temp, index;
    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
  }

}

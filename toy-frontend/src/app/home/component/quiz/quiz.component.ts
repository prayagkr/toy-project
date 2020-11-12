import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/service/common.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Question, ResponseBody, Score } from 'src/app/shared/model/shared.model';
import { CanDeactivateInterface } from '../../../shared/model/can-deactivate.model';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, CanDeactivateInterface {

  public questions: Array<Question>;
  public selected: number;
  public selectedQuestion: Question;
  public disablePrevious: boolean;
  public disableNext: boolean;
  public score: number;
  public candidateScore: Score;
  public scoreSubmited: boolean;
  public disableSubmit: boolean;
  public viewCorrectAnswer: boolean;

  constructor(
    private sharedService: SharedService,
    private commonService: CommonService,
    private toastr: ToastrService,
    private httpBackend: HttpBackend
  ) {
    this.questions = new Array<Question>();
    this.scoreSubmited = false;
    this.disableNext = false;
    this.disablePrevious = false;
    this.disableSubmit = false;
    this.viewCorrectAnswer = false;
  }

  ngOnInit(): void {
    this.getQuizData();
  }


  private getQuizData(): void {
    this.commonService.setLoadingTrue();
    const newHttpClient = new HttpClient(this.httpBackend);
    newHttpClient.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple')
      // this.sharedService.getQuizData()
      .subscribe(
        (response: any) => {
          this.questions = response['results'];
          this.questions.forEach((question: Question, index: number) => {
            question.id = index;
            let ans: Array<string> = question.incorrect_answers;
            ans.push(question.correct_answer);
            const shuffleAns = this.shuffle(ans);
            question.ans = shuffleAns;
            question.selectedAns = '';
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

  public next(): void {
    const index = this.selected + 1;
    this.selectQuestion(this.questions[index], index);

  }

  public previous(): void {
    const index = this.selected - 1;
    this.selectQuestion(this.questions[index], index);
  }

  public ansSelected(value: string): void {
    this.questions[this.selected].selectedAns = value;
  }

  public submit(): void {
    this.disableSubmit = true;
    this.commonService.setLoadingTrue();
    this.score = 0;

    this.questions.forEach((question: Question) => {
      if (question.correct_answer === question.selectedAns) {
        this.score += 1;
      }
    });
    this.candidateScore = new Score(
      this.selectedQuestion.category,
      this.selectedQuestion.difficulty,
      this.score
    );
    this.sharedService.submitQuiz(this.candidateScore)
      .subscribe(
        (response: HttpResponse<ResponseBody<string>>) => {
          this.toastr.success('Total score : ' + this.score);
          this.commonService.resetLoading();
          this.scoreSubmited = true;
        },
        (error: HttpErrorResponse) => {
          this.toastr.success('Something went wrong. Resubmit your request');
          this.disableSubmit = false;
          this.commonService.resetLoading();
        }
      );
  }

  public showCorrecAnswer() {
    this.viewCorrectAnswer = true;
  }  

  public canDeactivate(currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

}

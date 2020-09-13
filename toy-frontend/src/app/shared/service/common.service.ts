import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RegisterModel } from '../model/shared.model';

@Injectable()
export class CommonService {

  public isLoading: boolean;
  public userDetails: BehaviorSubject<RegisterModel> = new BehaviorSubject<RegisterModel>(null);

  constructor() {
    this.isLoading = false;
  }

  public setLoadingTrue() {
    this.isLoading = true;
  }

  public resetLoading() {
    this.isLoading = false;
  }
}

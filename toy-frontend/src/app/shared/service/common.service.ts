import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

  public isLoading: boolean;

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

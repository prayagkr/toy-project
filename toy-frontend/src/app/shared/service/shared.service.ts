import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { LoginModel, ResponseBody } from '../model/shared.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class SharedService {

  constructor(
    private http: HttpClientService
  ) { }

  public login(data: LoginModel): Observable<HttpResponse<ResponseBody<string>>> {
    const url = environment.BASE_URL + 'login';
    return this.http.post(url, data)
      .pipe(catchError((error) => throwError(error)));
  }
}

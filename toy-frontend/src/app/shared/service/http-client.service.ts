import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class HttpClientService {

  constructor(private http: HttpClient) { }

  private httpHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });


  /**
   * It is used to perform a HTTP Get request. It 
   * @param {string} url Url of the resource.
   * @returns {Observable<HttpResponse<any>>} Observable of HttpResponse Object.
   */
  public get(url: string): Observable<HttpResponse<any>> {
    return this.http.get(url, { headers: this.httpHeader, observe: 'response' })
      .pipe(catchError((error) => throwError(error)));
  }

  /**
   * It is used to perform a HTTP Post request
   * @param {string} url Url of the resource.
   * @param {any} data RequestBody required for api.
   * @returns {Observable<HttpResponse<any>>} Observable of HttpResponse Object.
   */
  public post(url: string, data: any): Observable<any> {
    return this.http.post<any>(url, data, { headers: this.httpHeader, observe: 'response' })
      .pipe(catchError((error) => throwError(error)));
  }

  /**
   * It is used to perform a HTTP Put request
   * @param {string} url Url of the resource.
   * @param {any} data RequestBody required for api.
   * @returns {Observable<HttpResponse<any>>} Observable of HttpResponse Object.
   */
  public put(url: string, data: any): Observable<any> {
    return this.http.put<any>(url, data,  { headers: this.httpHeader, observe: 'response' })
      .pipe(catchError((error) => throwError(error)));
  }

  /**
   * It is used to perform a HTTP Delete request
   * @param {string} url Url of the resource.
   * @returns {Observable<HttpResponse<any>>} Observable of HttpResponse Object.
   */
  public delete(url: string): Observable<any> {
    return this.http.delete<any>(url,  { headers: this.httpHeader, observe: 'response' })
      .pipe(catchError((error) => throwError(error)));
  }
}

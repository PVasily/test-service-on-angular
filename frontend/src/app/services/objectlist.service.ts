import { Inject, Injectable, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { IItems } from '../objectlist/objectlist.component';
import { Observable, catchError, delay, tap, throwError, timeInterval, timeout } from 'rxjs';
import { AuthUser, LogIn, SingleItem } from '../item';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ObjectlistService{

  constructor(
      @Inject(DOCUMENT) private document: Document,
      private http: HttpClient,
      private errorService: ErrorService 
    ) { }

  localStorage = this.document.defaultView?.localStorage
  token: {} = {'auth_token': ''}
  localToken = this.localStorage?.getItem('auth_token')

  headers = new HttpHeaders({
    'Accept': 'application/json;text/plain;*/*',
      'Access-Control-Allow-Origin': 'localhost',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type, x-requested-with',
      // "Access-Control-Allow-Methods": 'GET;HEAD;OPTIONS;POST;PUT',
      'Content-Type': 'application/json;utf-8',
      'Authorization': `Token ${this.localToken}`
  });

  public items: SingleItem[] = []

  getData(): Observable<SingleItem[]> {
    return this.http.get<SingleItem[]>(
      'https://jsonplaceholder.typicode.com/todos',
      {params: new HttpParams().append('_limit', 9)}
    ).pipe(
      delay(200),
      tap(items => {this.items = items}),
      catchError(this.errorHandler.bind(this))
    )
  }
  errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(()=> error.message)
  }

  getItem(id: string): Observable<SingleItem> {
    return this.http.get<SingleItem>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,)
      .pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  create(item: SingleItem): Observable<SingleItem> {
    return this.http.post<SingleItem>('https://jsonplaceholder.typicode.com/todos', {item}, {headers: this.headers})
    .pipe(
      tap(itemm => {this.items.push(itemm); console.log(itemm, this.items)})
    )
  }

  userMe(): Observable<AuthUser> {

    // return current user and set his username in localStorage

    return this.http.get<AuthUser>('http://localhost:8000/api/users/me', {headers: this.headers})
    .pipe(
      delay(400),
      tap(me => {
        if (me) {
          console.log(me, 'ITS ME')
          this.localStorage?.setItem('username', me.username)
          this.localStorage?.setItem('user_id', me.id)
        }
        else { console.log('NOT ME') }
        }),
      catchError(this.errorHandler.bind(this))
    )
  }

  login(email: string, password: string): Observable<LogIn> {
    return this.http.post<LogIn>('http://localhost:8000/api/auth/token/login', {email, password})
    .pipe(
      delay(200),
      tap(token => {
        if (token) {
          this.token = {...token }
          this.setToLocalstorage()
          this.userMe()
          }
        }),
      catchError(this.errorHandler.bind(this))
    )
  }

  setToLocalstorage() {

      // get token and set it to the localStorage

      let newToken = this.token
      let localToken = Object.values(newToken)[0]
      if(typeof localToken === 'string') {
        localStorage.setItem('auth_token', localToken)
        const gettingToken = localStorage.getItem('auth_token')
        if(typeof gettingToken === 'string') {
          this.localToken = gettingToken
        }
      }
      else return
  
  }

deleteToken() {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('username')
}

}

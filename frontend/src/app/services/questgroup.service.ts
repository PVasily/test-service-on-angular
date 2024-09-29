import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { Observable, catchError, delay, tap, throwError } from 'rxjs';
import { Tests, TestsGroup, UserQuestAnswered } from '../item';
import { ObjectlistService } from './objectlist.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class QuestgroupService {
  
  public tests: Tests[] = []
  public testsGroup: TestsGroup[] =  []
  public answeredQuests: {}[] = []

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient, 
    private errorService: ErrorService,
    private objListService: ObjectlistService,
   ) { }

   public groupId: number | undefined
   public dataForStatic: {}[] = []
   localStorage = this.document.defaultView?.localStorage
   localToken = this.localStorage?.getItem('auth_token')
 
   headers = new HttpHeaders({
     'Accept': 'application/json;text/plain;*/*',
       'Access-Control-Allow-Origin': 'localhost',
       'Access-Control-Allow-Credentials': 'true',
       'Access-Control-Allow-Headers': 'Content-Type, x-requested-with',
       'Content-Type': 'application/json;utf-8',
       'Authorization': `Token ${this.localToken}`
   });

  getGroups(): Observable<TestsGroup[]> {
    return this.http.get<TestsGroup[]>(
      'http://localhost:8000/api/quest_group/',
      {params: new HttpParams().append('limit', 9), headers: this.headers}
    ).pipe(
      delay(200),
      tap(test => { this.testsGroup = test }),
      catchError(this.errorHandler.bind(this))
    )
  }

  errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(()=> error.message)
  }

  getQuestion(id: string): Observable<Tests> {
    return this.http.get<Tests>(
      `http://localhost:8000/api/questions/${id}`,)
      .pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  getQuestsInGroup(id: string): Observable<TestsGroup> {
    return this.http.get<TestsGroup>(
      `http://localhost:8000/api/quest_in_group/${id}`,)
      .pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  getUserQuestAnswered(): Observable<UserQuestAnswered[]> {
    return this.http.get<UserQuestAnswered[]>( `http://localhost:8000/api/uqa/`,
      {headers: this.headers}
    )
    .pipe(
    catchError(this.errorHandler.bind(this))
  )
  }

  createUserQuestAnswered(
    user_id: number,
    quest_id: number,
    is_how_answered: boolean
  ): Observable<UserQuestAnswered> {
    return this.http.post<UserQuestAnswered>( `http://localhost:8000/api/uqa/`, 
      {
        is_how_answered: is_how_answered,
        user: user_id,
        quest: quest_id
      },
      {headers: this.headers}
  )
    .pipe(
    catchError(this.errorHandler.bind(this)))
  }

  getUQAInGroup(group_id: number): Observable<UserQuestAnswered[]> {
     return this.http.get<UserQuestAnswered[]>( 
      `http://localhost:8000/api/uqa_in_group/?group=${group_id}`,
      {headers: this.headers}
     )
  }

  clearUQAInGroup(quest_id: number): Observable<UserQuestAnswered> {
    return this.http.delete<UserQuestAnswered>( 
     `http://localhost:8000/api/uqa/${quest_id}`,
     {headers: this.headers}
    )
 }
}

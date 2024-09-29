import { Injectable } from '@angular/core';
import { Observable, catchError, delay, tap, throwError } from 'rxjs';
import { ITTests, Score, Tests, TestsGroup } from '../item';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ErrorService } from './error.service';
import { QuestgroupService } from './questgroup.service';

@Injectable({
  providedIn: 'root'
})
export class IttestslistService {

  constructor(
      private http: HttpClient, 
      private errorService: ErrorService,
      private qgs: QuestgroupService
    ) { }

  public count: number = 0
  public tests: Tests[] = []
  public testsGroup: TestsGroup[] =  []
  public errorMessage: string = ''
  public scores: Score[] = []
  public score_id: number = 0
  public groupId: number = 0
  public qra: number = 0

  createScore(
        user_id: number, 
        group_id: number, 
        qty_right_answer: number): Observable<Score> {
    return this.http.post<Score>(`http://localhost:8000/api/score/`,
      {
        user: user_id,
        group: this.groupId,
        qty_right_answer: qty_right_answer 
      },
      {headers: this.qgs.headers}
    ).pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  updateScore( 
      user_id: number,
      group_id: number,
      score_id: number,
      qty_right_answer: number): Observable<Score> {
      
        let body = 
          {
            
            user: user_id,
            group: group_id,
            qty_right_answer: qty_right_answer
          }
        
        // let score_id;
        // this.http.get(
        // `http://localhost:8000/api/uniqe_score/?user=${user_id}`)
        // .pipe(
        //   tap((score)=> score_id = score.isPrototypeOf('id') )
        // )
        console.log('BODY', body, user_id, group_id, score_id, qty_right_answer)
    return this.http.put<Score>(`http://localhost:8000/api/score/${score_id}/`,
      {    
        user: user_id,
        group: group_id,
        qty_right_answer: qty_right_answer
      }, 
      {headers: this.qgs.headers}
    )
    // .pipe(
    //   tap(data => console.log('DATA', data))
    // )
  }

  getScores( 
    // user_id: number,
    // group_id: number,
   ): Observable<Score[]>  {
    
      return this.http.get<Score[]>(
        `http://localhost:8000/api/score`, {
          headers: this.qgs.headers
        })
        .pipe(
          tap((score)=> {this.scores = score} ))
  }

  getScoreId( user: string){

    if(this.scores.length > 0) {
      for(let score of this.scores) {
        if(score.user === user && score.group.toString() === this.groupId.toString()) {
          this.score_id = score.id
          this.qra = score.qty_right_answer
          break
        }
        else this.score_id = 0
      }
    }
    else this.score_id = 0
  }

  getUserGroupScore( 
    user: string,
    group_id: number,
   ): Observable<Score>  {
    
      return this.http.get<Score>(
        `http://localhost:8000/api/score/${this.score_id}`, {
          headers: this.qgs.headers
        })
        // .pipe(
        //   tap((score)=> { console.log(score)} ),
        //   // catchError(this.errorHandler.bind(this))
        //   )
    
 
    
      // if(this.scores.length > 0) {
      //   for(let score of this.scores) {
      //     if(score.user === user && score.group === this.groupId) {
      //       this.score_id = score.id
      //       return this.http.get<Score>(
      //         `http://localhost:8000/api/score/${this.score_id}`, {
      //           headers: this.qgs.headers
      //         })
      //         .pipe(
      //           tap((score)=> { console.log(score)} ))
      //     }
        
      //   }
      // }

     
      // return this.http.get<Score>(
      //   `http://localhost:8000/api/score/${this.score_id}`, {
      //     headers: this.qgs.headers
      //   })
      //   .pipe(
      //     tap((score)=> { console.log(score)} ))
  }

  getMoveScore() {
    if(this.score_id !== 0) {
     return true
    }
    else return false
  }

  errorHandler(error: HttpErrorResponse) {
    this.errorMessage = 'You already answered'
    this.errorService.handle(error.message)
    return throwError(()=> error.message)
  }

}

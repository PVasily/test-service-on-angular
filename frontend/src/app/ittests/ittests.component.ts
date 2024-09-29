import { Component, Inject, Input, OnInit } from '@angular/core';
import { ITTests, Tests } from '../item';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { ittests } from '../ittestslist/ittestslist.component';
import { ActivatedRoute, Params } from '@angular/router';
import { IttestslistService } from '../services/ittestslist.service';
import { DOCUMENT, Location } from '@angular/common'
import { QuestgroupService } from '../services/questgroup.service';
import { map, pipe, tap } from 'rxjs';


@Component({
  selector: 'app-ittests',
  templateUrl: './ittests.component.html',
  styleUrl: './ittests.component.css',
})
export class IttestsComponent implements OnInit{

  public myForm: FormGroup

  constructor(
      @Inject(DOCUMENT) private document: Document,
      private route: ActivatedRoute, 
      public _location: Location, 
      public srv: IttestslistService,
      private questGroupService: QuestgroupService,
      private fb: FormBuilder,
      
    ) {
      this.myForm = new FormGroup({
        answersList: new FormArray([
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false)
        ])
      })
    }
 

  @Input() public isChecked = true
  
  
  @Input() test: ITTests[] = []
  public answers: any[] = []
  public tests: Tests | undefined
  public groupId = this.questGroupService.groupId
  public username = this.document.defaultView?.localStorage.getItem('username')
  public userId = this.document.defaultView?.localStorage.getItem('user_id')
  public id: number = 0
  public allAnswers: any[] = []
  public flag: {}[] = []
  public countTrue = 0
  public countFalse = 4
  public isAnswered = false

  public form = new FormGroup({
    right: new FormControl<any>(''),
    wrong1: new FormControl<any>(''),
    wrong2: new FormControl<any>(''),
    wrong3: new FormControl<any>(''),
    models: new FormArray([ new FormControl ])
  })

  get models() {
    return this.form.controls['models'] as FormArray
  }

  ngOnInit(): void {
    this.myForm.valueChanges.subscribe(val => {
      this.flag = []
      for(let [i, v] of Object.entries(val.answersList)) {
        this.flag.push({[i]: v})
      }
      this.countTrue = 0
      this.countFalse = 0
      for(let [i, v] of Object.entries(this.flag)) {
        
        if(Object.values(v)[Number(0)] && this.answers[Number(i)] === this.tests?.right_answer) {
          this.countTrue += 1  
        }
        if(Object.values(v)[Number(0)]) continue
        else this.countFalse += 1
      }
      if(this.countTrue === 1 && this.countFalse === 3) {
        this.isAnswered = true
      }
      else this.isAnswered = false
    })

    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      this.questGroupService.getQuestion(
          this.id.toString())
          .subscribe({next: (data: any) => {
              this.tests = data;
              for(const [key, value] of Object.entries(data)) {
                if(key === 'id' || key === 'question') {
                  continue
                }
                this.answers.push(value)
                this.answers = this.answers.sort(() => Math.random() - 0.5)
              }
            }
          })
    })
  }

  get answersList() {
    return this.myForm.get('answersList') as FormArray
  }

  redirectTo(): void {
    this._location.back()
  }

  submit() {
   
    this.srv.getScores().subscribe((data) => {
      if(this.countFalse === 4) {
        this.redirectTo()
      }
      if(this.isAnswered) {
        
        if(data.length !== 0 && this.username) {
          this.srv.count += 1
          this.srv.getScoreId(this.username)

  if(this.srv.score_id === 0) {
    this.srv.createScore(
      Number(this.userId), 
      Number(this.groupId), 
      this.srv.count).subscribe()
      this.redirectTo()
  }
  else {

    this.srv.getUserGroupScore(this.username, Number(this.groupId))
    .subscribe(()=> {
       
      this.srv.updateScore(
        Number(this.userId), 
        Number(this.groupId), 
        this.srv.score_id, 
        this.srv.qra + 1).subscribe()
      this.questGroupService.createUserQuestAnswered(
          Number(this.userId),
          Number(this.id),
          true 
        ).subscribe(()=> this.redirectTo())
      
    })
   }
  }
  else {
    this.srv.createScore(
      Number(this.userId), 
      Number(this.groupId), 
      this.srv.count).subscribe()
    this.questGroupService.createUserQuestAnswered(
      Number(this.userId),
      Number(this.id),
      true
    ).subscribe(()=> this.redirectTo())
  }
}
if (!this.isAnswered && this.countFalse !== 4) {
  this.questGroupService.createUserQuestAnswered(
    Number(this.userId),
    Number(this.id),
    false,
  ).subscribe()
  this.redirectTo(); 
  console.log('NO')
}
this.isChecked = false
})
}

check = true

submitted() {
  if(this.flag.length === 1 && this.flag[0] === true) {
   
  }
//   for(let c of Object.entries(this.myForm.controls)) {
    
//   }
//   this.myForm.get('answersList')?.valueChanges.pipe(
//     map(res => console.log(res))
// )
}
}

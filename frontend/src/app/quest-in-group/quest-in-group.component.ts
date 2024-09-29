import { Component, inject, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuestsInGroup, Tests, UserQuestAnswered } from '../item';
import { Location } from '@angular/common';
import { QuestgroupService } from '../services/questgroup.service';
import { IttestslistService } from '../services/ittestslist.service';
import { delay, tap } from 'rxjs';


@Component({
  selector: 'app-quest-in-group',
  templateUrl: './quest-in-group.component.html',
  styleUrl: './quest-in-group.component.css'
})
export class QuestInGroupComponent implements OnInit{
  constructor(
    public questGroupService: QuestgroupService,
    public ittestsListService: IttestslistService,
    private router: Router, 
    private route: ActivatedRoute, 
    public _location: Location
  ) {}

  public id: number = 0
  public showResult = false
  public resetResult = false
  public questInGroup: QuestsInGroup = {
    id: 0,
    group: '',
    questions: []
  }
  public QIG: Tests[] = []
  public answeredQuests: UserQuestAnswered[] = []
  public arrID: Number[] = []
  public rightAnswers = 0
  public wrongAnswers = 0

  redirectTo(id: number): void {
    this.router.navigate([`${id}`], {relativeTo: this.route})
  }

  ngOnInit(): void {
      console.log('QIG_RENDER: ', this.QIG)
      this.questGroupService.getUserQuestAnswered().subscribe(data => {
        this.answeredQuests = data
      })
    
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      this.ittestsListService.groupId = this.id
      this.questGroupService.groupId = this.id
      this.questGroupService.getQuestsInGroup(
          this.id.toString())
          .subscribe((data: any) => {

              this.questGroupService.getUserQuestAnswered().subscribe(uqAnsw => {
              this.answeredQuests = uqAnsw
              this.arrID = this.getArrAnsweredID()
         })
              console.log('AQ Lenght: ', this.answeredQuests.length, 'ARR: ', this.arrID.length)
              this.questInGroup = data 
              console.log(this.answeredQuests.length)
              if(this.answeredQuests.length < 1) {
                this.QIG = this.questInGroup.questions
                this.resetResult = false
                this.showResult = false
              }
              else {
                  this.QIG.splice(0)
                  const arrId = this.getArrAnsweredID()
                  let count = 0
                for(let quest of this.questInGroup.questions) {
                    if(arrId.includes(quest.id)) {
                      count += 1; 
                      this.resetResult = true
                      continue
                    }
                    else {
                    let untouchedQuest = this.questInGroup.questions[count]
                    this.QIG.push(untouchedQuest)
                    count += 1
                    this.showResult = false
                  } 
                  this.resetResult = true
                }
              }
              if(this.QIG.length === 0) {
                this.showResult = true
              }
              else this.showResult = false
            }
        )
      // console.log('QIIIIG ', this.QIG.length, this.showResult)
    })
  }

  getArrAnsweredID() {
    let arrID = []
    for(let quest of this.answeredQuests) {
      arrID.push(quest.quest)
    }
    return arrID
  }

  getAnsweredQuestInGroup() {
    this.rightAnswers = 0
    this.wrongAnswers = 0
    this.questGroupService.getUQAInGroup(Number(this.questGroupService.groupId))
    .subscribe(uqa => {
      for(let u of uqa) {
        if(u.is_how_answered === true) {this.rightAnswers += 1}
        else this.wrongAnswers += 1
      }
    })
  }

  resetAnsweredQuestInGroup() {
    
    this.questGroupService.getUQAInGroup(Number(this.questGroupService.groupId))
    .subscribe(uqa => {
      for (let u of uqa) {
        this.questGroupService.clearUQAInGroup(u.id).subscribe()
      }
      this.questGroupService.getQuestsInGroup(this.id.toString())
      .pipe(
        tap(()=> {
          this.rightAnswers = 0
          this.wrongAnswers = 0
          this.resetResult = false
          this.showResult = false
        })
      )
      .subscribe(
        (data: any) => {
          this.questInGroup = data
          this.QIG = this.questInGroup.questions  
          this.ngOnInit()
          this.router.navigate([`ittests`])
        }
      )
    } 
    )
  }
}

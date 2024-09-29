import { Component, Input, OnInit } from '@angular/core';
import { ITTests, Tests, TestsGroup } from '../item';
import { ActivatedRoute, Router } from '@angular/router';
// import { IttestslistService } from '../services/ittestslist.service';
import { QuestgroupService } from '../services/questgroup.service';
import { ObjectlistService } from '../services/objectlist.service';
import { StatisticService } from '../services/statistic.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-ittestslist',
  templateUrl: './ittestslist.component.html',
  styleUrl: './ittestslist.component.css',
  providers: [QuestgroupService]
 
})
export class IttestslistComponent implements OnInit{
  constructor( 
    private router: Router, 
    private route: ActivatedRoute,
    public questGroupService: QuestgroupService,
    public objlistService: ObjectlistService,
    public statisticService: StatisticService
  ) {}

  public count: number = 0

  public ittests: Tests[] = []
  // public dataForStatistic: {}[] = []
  public listGroupId: {}[] = []
  

  redirectTo(id: number): void {
    this.router.navigate([`${id}`], {relativeTo: this.route})
  }

  ngOnInit(): void {
    // const exp = [
    //   {1: [true, false, true]},
    //   {2: [false, false]}
    // ]
    // let nw = exp[0]['1']
    // nw?.push(true)
    // // this.exp['1'] = nw
    // console.log(nw)
   
    this.objlistService.userMe().subscribe()
    this.questGroupService.getGroups()
    .pipe(
      tap(p => {
        for(let group of p) {
          console.log(group.group)
          this.listGroupId.push({[group.id]: group})
        }
      })
    )
    .subscribe(() => {
      for(let group of this.listGroupId) {
        let group_id = Number(Object.keys(group)[0])
        this.questGroupService.getUQAInGroup(group_id)
        .pipe(
          tap((quests) => {
           
            for(let quest of quests) {
              let obj = Object.assign(
                {[group_id]: group},
              {[quest.id]: quest.is_how_answered})
              this.questGroupService.dataForStatic.push(obj)
              
            }
            
          }
         )
        )
        .subscribe(() => console.log(this.questGroupService.dataForStatic))
      }
      console.log(this.questGroupService.dataForStatic)
    })

  }

  getStatistic() {
    this.statisticService.getStatistic().subscribe()
  }

}

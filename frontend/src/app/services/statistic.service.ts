import { Injectable } from '@angular/core';
import { QuestgroupService } from './questgroup.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Stat, Statistic } from '../item';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(
    private qgs: QuestgroupService,
    private http: HttpClient
  ) { }

  public statisticData: Statistic[] = []
  public dataInAllGroups: Stat[] = []

  getStatistic(): Observable<Statistic[]> {
   return this.http.get<Statistic[]>(
          `http://localhost:8000/api/statistic/`,
          {headers: this.qgs.headers}
   ).pipe(
    tap((data) => {this.statisticData = data
      let groups: string[] = []
      for(let data of this.statisticData) {
        if(groups.includes(data.group.group)) {
          continue
        }
        else {
          groups.push(data.group.group)
        }
        let item = {
          'group': data.group.group,
          'qty_right': 1,
          'qty_wrong': 2 
        }
        this.dataInAllGroups.push(item)
      }
      console.log(groups)
    })
   )
  }
}

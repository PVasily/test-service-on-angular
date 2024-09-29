import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectlistService } from '../services/objectlist.service';
import { SingleItem } from '../item';
import { Observable, tap } from 'rxjs';
import { ModalService } from '../services/modal.service';


export interface IItems{
  title: string,
  content: string,
  id: number
}

@Component({
  selector: 'app-objectlist',
  templateUrl: './objectlist.component.html',
  styleUrl: './objectlist.component.scss',
  providers: [ObjectlistService]
})
export class ObjectlistComponent implements OnInit{

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    public objectlistService: ObjectlistService,
    public modalService: ModalService
  ) {}

  // public items = Items
  public loading = false
  // public newItems$: Observable<SingleItem[]> | undefined
  public term: string = ''
  
  redirectTo(id: number): void {
    this.router.navigate([`${id}`], {relativeTo: this.route})
  }

  ngOnInit() {
    this.loading = true
    // this.newItems$ = this.objectlistService.getData().pipe(tap(()=> this.loading = false))
    this.objectlistService.getData().subscribe(() => this.loading = false)      
  }

  getMe() {
    this.objectlistService.userMe().subscribe()
  }

  removeToken() {
    this.objectlistService.deleteToken()
  }

}

// export const Items: IItems[] = [
//   {
//     title: 'First item',
//     content: 'Some content1',
//     id: 1
//   },
//   {
//     title: 'Second item',
//     content: 'Some content2',
//     id: 2
//   },
//   {
//     title: 'Third item',
//     content: 'Some content3',
//     id: 3
//   },
// ]


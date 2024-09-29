import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SingleItem } from '../item';
import { ObjectlistService } from '../services/objectlist.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
})
export class ItemsComponent implements OnInit{
  public id: string = ''
  public object: SingleItem | undefined

  constructor(private route: ActivatedRoute, private objectlistService: ObjectlistService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      this.objectlistService.getItem(this.id).subscribe({next: (data: any) => this.object = data})
    })
  }
}

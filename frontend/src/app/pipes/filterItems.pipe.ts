import { Pipe, PipeTransform } from '@angular/core';
import { SingleItem } from '../item';

@Pipe({
  name: 'filterItems'
})
export class FilterPipe implements PipeTransform {

  transform(newItems: SingleItem[], search: string): SingleItem[] {
    if(search.length === 0) return newItems
    return newItems.filter(i => i.title.toLowerCase().includes(search.toLowerCase()))
  }

}

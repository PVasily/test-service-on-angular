import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public isVisible = new BehaviorSubject<boolean>(false)
  public isHidden = new BehaviorSubject<boolean>(true)

  open() {
    this.isVisible.next(true)
    this.isHidden.next(false)
  }

  close() {
    this.isVisible.next(false)
    this.isHidden.next(true)
  }
}

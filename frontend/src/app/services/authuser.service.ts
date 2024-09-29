import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthuserService {

  constructor( @Inject(DOCUMENT) private document: Document) { }

  getAuthUser() {
    let localStorage = this.document.defaultView?.localStorage
    if(localStorage) {
      return localStorage.getItem('username')
    }
    else return false
  }

}

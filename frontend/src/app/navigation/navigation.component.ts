import { Component, Inject, OnInit } from '@angular/core';
import { ObjectlistService } from '../services/objectlist.service';
import { DOCUMENT } from '@angular/common';
import { AuthuserService } from '../services/authuser.service';

@Component({
  selector: 'mynavigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class MyNavigation {
  constructor(
   public authUserService: AuthuserService
  ) {}
  title = 'navigation';
  user = this.authUserService.getAuthUser()
  
  getAuthUser() {
   console.log(this.user)
  }
  // authUser = 'user'
}
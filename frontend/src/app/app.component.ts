import { Component, OnInit } from '@angular/core';
import { AuthuserService } from './services/authuser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(
    public authUserService: AuthuserService
  ) {}
  current_user = this.authUserService.getAuthUser()
  title = 'second-app';

  ngOnInit(): void {
    console.log(this.current_user)
  }
}

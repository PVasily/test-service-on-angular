import { Component } from '@angular/core';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  constructor(public errorService: ErrorService) {}
}

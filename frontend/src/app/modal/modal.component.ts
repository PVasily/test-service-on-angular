import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit{

  constructor(public modalService: ModalService) {}

  @Input() title: string | undefined

  ngOnInit(): void {
    
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { ObjectlistService } from '../services/objectlist.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.css'
})
export class CreateItemComponent {

constructor(
  private objectlistService: ObjectlistService,
  private modalService: ModalService
){}

newform = new FormGroup({
  title: new FormControl<string>('', [
     Validators.minLength(6)
  ]),
});

form = new FormGroup({
  email: new FormControl<string>('', [
    Validators.minLength(6)
  ]),
  password: new FormControl<string>('', [
    Validators.minLength(3)
  ])
})

  get title() {
    return this.newform.controls.title as FormControl
  }

  // get email() {
  //   return this.form.controls.email as FormControl    
  // }

  // get password() {
  //   return this.form.controls.password as FormControl
  // }
  get email() {
    return this.form.value.email as string
  }

  get password() {
    return this.form.value.password as string
  }

  submit() {
    // console.log(this.newform.value)
    // this.objectlistService.create({
    //   userId: 1,
    //   title: this.newform.value.title as string,
    //   completed: true
    // }).subscribe(() => this.modalService.close())

    console.log(this.form.value)
    this.objectlistService.login(
    //   {
    //   email: this.form.value.email as string,
    //   password: this.form.value.password as string
    // }
    this.email, this.password
  ).subscribe()

    // this.objectlistService.userMe().subscribe((u) => console.log(u))
  }

  confirm() {
    this.objectlistService.userMe().subscribe(() => this.modalService.close())
  }

}

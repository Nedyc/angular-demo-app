import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup} from '@angular/forms';
import Utils from '../../../utils';
import { Author } from '../../../models/author.model';

@Component({
  selector: 'app-book-list-form',
  templateUrl: './book-list-form.component.html',
  styleUrls: ['./book-list-form.component.less']
})
export class BookListFormComponent implements OnInit {

  @Input() itemForm: FormGroup = new FormGroup({});
  @Input() authorList: Author[] = [];
  @Output() onSubmit = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    
  }

  onSubmitSend(){
    this.onSubmit.next();
  }

  getErrorMessageFn(field: string){
    return Utils.getErrorMessage(field, this.itemForm);
  }
}

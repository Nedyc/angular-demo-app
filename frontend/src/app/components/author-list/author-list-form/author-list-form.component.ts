import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthorListService } from 'src/app/services/author-list.service';
import {FormGroup} from '@angular/forms';
import Utils from '../../../utils';

@Component({
  selector: 'app-author-list-form',
  templateUrl: './author-list-form.component.html',
  styleUrls: ['./author-list-form.component.less']
})
export class AuthorListFormComponent implements OnInit {

  @Input() itemForm: FormGroup = new FormGroup({});
  @Output() onSubmit = new EventEmitter<void>();

  constructor(public authorListService: AuthorListService) { }

  ngOnInit(): void {
    
  }

  onSubmitSend(){
    this.onSubmit.next();
  }

  getErrorMessageFn(field: string){
    return Utils.getErrorMessage(field, this.itemForm);
  }

}

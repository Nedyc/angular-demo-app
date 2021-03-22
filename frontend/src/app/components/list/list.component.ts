import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  @Input() list?: any[];
  @Input() hasEditBtn: boolean = true;
  @Input() itemTemplate?: TemplateRef<any>;
  @Input() orderList?: any[];

  @Output() onOrderChange = new EventEmitter<any>();
  @Output() onElementsChecked = new EventEmitter<{isChecked: boolean, id: Number}>();
  @Output() onElementEdit = new EventEmitter<any>();

  onCheckClick($event: any, id: any): void{
    let isChecked = $event.checked;
    this.onElementsChecked.next({isChecked, id});
  }

  onOrderSelected(order: any): void{
    this.onOrderChange.next(order);
  }

  onElementEditClick(item: any){
    this.onElementEdit.next(item);
  }

  constructor() { }

  ngOnInit(): void {
  }

}

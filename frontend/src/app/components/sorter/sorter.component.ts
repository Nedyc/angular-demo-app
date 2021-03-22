import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.less']
})
export class SorterComponent implements OnInit {
  @Input() orderList?: any[];
  @Output() onOrderChange = new EventEmitter<{value: string, direction: Number}>();
    
  selected = '';

  constructor() { }

  onOrderSelected($event: any): void {
    let res: any[] = $event.value.toString().split("|");
    this.onOrderChange.next({
      value: res[0],
      direction: parseInt(res[1])
    });
  }

  ngOnInit(): void {
    if(this.orderList){
      let newArray:any[] = [];
      this.orderList.forEach(element => {
        newArray.push({
          "value": element.value+"|1",
          "viewValue": element.viewValue+" [Asc]"
        });

        newArray.push({
          "value": element.value+"|-1",
          "viewValue": element.viewValue+" [Desc]"
        });
      });

      this.orderList = newArray;
    }
  }
}

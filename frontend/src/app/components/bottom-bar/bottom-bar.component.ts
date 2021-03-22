import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.less']
})
export class BottomBarComponent implements OnInit {
  @Input() isDeleteBtnDisabled?: boolean;
  @Input() deletedArray: Number[] = [];
  @Input() isCreatingOrEditingEl: boolean = false;
  @Input() areSettingsOpen: boolean = false;
  @Input() areSettingsDisabled: boolean = true;

  @Output() onElementsDelete = new EventEmitter<string>();
  @Output() onElementAdd = new EventEmitter<void>();
  @Output() onCreateEditClose = new EventEmitter<void>();
  @Output() onSettingsOpen = new EventEmitter<void>();
  @Output() onSettingsClose = new EventEmitter<void>();
  @Output() openSearchDialog = new EventEmitter<void>();


  constructor(public dialog: MatDialog) { }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.onElementsDelete.next();
    });
  }

  openSearchBtnClick(){
    this.openSearchDialog.next();
  }

  onElementAddClick(){
    this.onElementAdd.next();
  }

  onCreateEditCloseClick(){
    this.onCreateEditClose.next();
  }

  onSettingsBtnClick(){
    this.onSettingsOpen.next();
  }

  onSettingsCloseClick(){
    this.onSettingsClose.next();
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialog {
  
}
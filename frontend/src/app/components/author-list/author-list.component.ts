import { Component, OnInit } from '@angular/core';
import { AuthorListService } from 'src/app/services/author-list.service';
import { Author } from '../../models/author.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.less'],
  providers: [AuthorListService]
})
export class AuthorListComponent implements OnInit {

  constructor(public authorListService: AuthorListService, public dialog: MatDialog) { }
  
  itemForm = new FormGroup({
    _id: new FormControl(''),
    __v: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)])
  });

  isCreatingOrEditingEl: boolean = false;
  deletedArray: Number[] = [];
  orderedBy: any = {
    value: "surname",
    direction: 1
  };

  searchBy: any;

  orderList: any[] = [
    {
      value: "name",
      viewValue: "Name"
    },
    {
      value: "surname",
      viewValue: "Surname"
    }
  ];

  onElementsChecked(isChecked: boolean, id: Number): void {
    if(isChecked)
      this.deletedArray.push(id);
    else {
      const index = this.deletedArray.indexOf(id);
      if (index > -1) 
        this.deletedArray.splice(index, 1);
    }
  }

  onOrderChange(order: any): void{
    this.orderedBy = order;
    this.getAuthorList();
  }

  onCreateEditClose(): void{
    this.isCreatingOrEditingEl = false;
    this.authorListService.selectedAuthor = undefined;
  }

  onElementAdd(): void {
    this.itemForm.reset();
    this.isCreatingOrEditingEl = true;
  }

  onElementEdit(item: any): void {
    this.onElementAdd();
    this.authorListService.selectedAuthor = item;
    this.authorListService.getByAuthorById(item._id).subscribe((res) => {
      this.itemForm.setValue(res);
    });
  }

  onElementsDelete(): void {
    this.authorListService.deleteAuthors(this.deletedArray).subscribe((res) => {
      this.getAuthorList();
      this.onCreateEditClose();
    });
  }

  onSubmit(): void{
    if(this.itemForm.status != "INVALID"){
      if(this.authorListService.selectedAuthor)
        this.authorListService.putAuthor(this.itemForm.value).subscribe((res) => {
          this.getAuthorList();
          this.onCreateEditClose();
        });
      else
        this.authorListService.postAuthor(this.itemForm.value).subscribe((res) => {
          this.getAuthorList();
          this.onCreateEditClose();
        });
    }
  }

  getAuthorList(){
    this.authorListService.getAuthorList(this.orderedBy, this.searchBy).subscribe((res) => {
      this.authorListService.authorList = res as Author[];
    });
  }

  openSearchDialog() {
    const dialogRef = this.dialog.open(AuthorListSearchDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.searchBy = result;
      this.getAuthorList();
    });
  }

  resetSearch(){
    this.searchBy = undefined;
    this.getAuthorList();
  }

  ngOnInit(): void {
    this.getAuthorList();
  }

}

@Component({
  selector: 'author-list-search-dialog',
  templateUrl: 'author-list-search-dialog.html',
})
export class AuthorListSearchDialog {
  searchType?: string;
  searchParameter?: string;
}
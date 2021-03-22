import { Component, OnInit } from '@angular/core';
import { BookListService } from 'src/app/services/book-list.service';
import { AuthorListService } from 'src/app/services/author-list.service';
import { Book } from '../../models/book.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.less']
})
export class BookListComponent implements OnInit {
  authorList: Author[] = [];

  constructor(
    public bookListService: BookListService, 
    public authorListService: AuthorListService, 
    public dialog: MatDialog
  ) {
    this.authorListService.getAuthorList({}).subscribe((res) => {
      this.authorList = res as Author[];
    });
  }
  
  itemForm = new FormGroup({
    _id: new FormControl(''),
    __v: new FormControl(''),
    author: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)])
  });

  isCreatingOrEditingEl: boolean = false;
  deletedArray: Number[] = [];
  
  orderedBy: any = {
    value: "title",
    direction: 1
  };

  searchBy: any;

  orderList: any[] = [
    {
      value: "author",
      viewValue: "Author"
    },
    {
      value: "title",
      viewValue: "Title"
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

  onOrderChange(order: String): void{
    this.orderedBy = order;
    this.getBookList();
  }

  onCreateEditClose(): void{
    this.isCreatingOrEditingEl = false;
    this.bookListService.selectedBook = undefined;
  }

  onElementAdd(): void {
    this.itemForm.reset();
    this.isCreatingOrEditingEl = true;
  }

  onElementEdit(item: any): void {
    this.onElementAdd();
    this.bookListService.selectedBook = item;
    this.bookListService.getByBookById(item._id).subscribe((res) => {
      let book = res as Book;
      let author = this.authorList.filter(x => {
        if(typeof book.author != "undefined" && x._id ===  book.author._id)
          return x;
        return null;
      });

      book.author = author[0];
      this.itemForm.setValue(book);
    });
  }

  onElementsDelete(): void {
    this.bookListService.deleteBooks(this.deletedArray).subscribe((res) => {
      this.getBookList();
      this.onCreateEditClose();
    });
  }

  onSubmit(): void{
    if(this.itemForm.status != "INVALID"){
      if(this.bookListService.selectedBook)
        this.bookListService.putBook(this.itemForm.value).subscribe((res) => {
          this.getBookList();
          this.onCreateEditClose();
        });
      else
        this.bookListService.postBook(this.itemForm.value).subscribe((res) => {
          this.getBookList();
          this.onCreateEditClose();
        });
      }
  }

  getBookList(){
    this.bookListService.getBooksList(this.orderedBy, this.searchBy).subscribe((res) => {
      this.bookListService.bookList = res as Book[];
    });
  }

  openSearchDialog() {
    const dialogRef = this.dialog.open(BookListSearchDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.searchBy = result;
      this.getBookList();
    });
  }

  resetSearch(){
    this.searchBy = undefined;
    this.getBookList();
  }

  ngOnInit(): void {
    this.getBookList();
  }

}
@Component({
  selector: 'book-list-search-dialog',
  templateUrl: 'book-list-search-dialog.html',
})
export class BookListSearchDialog {
  searchType?: string;
  searchParameter?: string;
}
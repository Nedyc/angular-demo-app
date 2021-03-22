import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookListService {
  bookList: Book[] = [];
  selectedBook?: Book;
  readonly baseURL = "http://localhost:3000/books";

  constructor(private http: HttpClient) {}

  postBook(book: Book){
    return this.http.post(this.baseURL, book);
  }

  getBooksList(orderedBy: any, searchBy: any) {
    let params = new HttpParams()
      .set("orderedBy", JSON.stringify(orderedBy))
      .set("searchBy", JSON.stringify(searchBy));

    return this.http.get(this.baseURL + '/list', {params: params});
  }

  getByBookById(id: any){
    return this.http.get(this.baseURL + '/' + id);
  }

  putBook(book: Book){
    return this.http.put(this.baseURL + '/' + book._id, book);
  }

  deleteBooks(ids: Number[]){
    let params = new HttpParams().set("ids", JSON.stringify(ids));
    return this.http.delete(this.baseURL, {params: params});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorListService {
  authorList: Author[] = [];
  selectedAuthor?: Author;
  readonly baseURL = "http://localhost:3000/authors";

  constructor(private http: HttpClient) {}

  postAuthor(author: Author){
    return this.http.post(this.baseURL, author);
  }

  getAuthorList(orderedBy?: any, searchBy?: any) {
    let params = new HttpParams()
      .set("orderedBy", JSON.stringify(orderedBy))
      .set("searchBy", JSON.stringify(searchBy));

    return this.http.get(this.baseURL + '/list', {params: params});
  }

  getByAuthorById(id: any){
    return this.http.get(this.baseURL + '/' + id);
  }

  putAuthor(author: Author){
    return this.http.put(this.baseURL + '/' + author._id, author);
  }

  deleteAuthors(ids: Number[]){
    let params = new HttpParams().set("ids", JSON.stringify(ids));
    return this.http.delete(this.baseURL, {params: params});
  }
}

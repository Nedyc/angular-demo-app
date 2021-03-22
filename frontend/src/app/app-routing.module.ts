import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { AuthorListComponent } from './components/author-list/author-list.component';

const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'author-list', component: AuthorListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { SorterComponent } from './components/sorter/sorter.component';
import { HeaderComponent } from './components/header/header.component';
import { BottomBarComponent, DeleteDialog } from './components/bottom-bar/bottom-bar.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { BookListComponent, BookListSearchDialog } from './components/book-list/book-list.component';
import { BookListFormComponent } from './components/book-list/book-list-form/book-list-form.component';
import { AuthorListComponent, AuthorListSearchDialog } from './components/author-list/author-list.component';
import { AuthorListFormComponent } from './components/author-list/author-list-form/author-list-form.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BottomBarComponent,
    PageHeaderComponent,
    DeleteDialog,
    BookListSearchDialog,
    ListComponent,
    SorterComponent,
    BookListComponent,
    BookListFormComponent,
    AuthorListComponent,
    AuthorListFormComponent,
    AuthorListSearchDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [
    DeleteDialog,
    BookListSearchDialog,
    AuthorListSearchDialog
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

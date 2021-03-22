import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListFormComponent } from './book-list-form.component';

describe('BookListFormComponent', () => {
  let component: BookListFormComponent;
  let fixture: ComponentFixture<BookListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookListFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorListFormComponent } from './author-list-form.component';

describe('AuthorListFormComponent', () => {
  let component: AuthorListFormComponent;
  let fixture: ComponentFixture<AuthorListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorListFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

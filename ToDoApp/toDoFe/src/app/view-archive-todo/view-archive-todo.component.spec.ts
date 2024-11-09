import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArchiveTodoComponent } from './view-archive-todo.component';

describe('ViewArchiveTodoComponent', () => {
  let component: ViewArchiveTodoComponent;
  let fixture: ComponentFixture<ViewArchiveTodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewArchiveTodoComponent]
    });
    fixture = TestBed.createComponent(ViewArchiveTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewImportantTodoComponent } from './view-important-todo.component';

describe('ViewImportantTodoComponent', () => {
  let component: ViewImportantTodoComponent;
  let fixture: ComponentFixture<ViewImportantTodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewImportantTodoComponent]
    });
    fixture = TestBed.createComponent(ViewImportantTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

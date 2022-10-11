import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgesEditComponent } from './knowledges-edit.component';

describe('KnowledgesEditComponent', () => {
  let component: KnowledgesEditComponent;
  let fixture: ComponentFixture<KnowledgesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnowledgesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

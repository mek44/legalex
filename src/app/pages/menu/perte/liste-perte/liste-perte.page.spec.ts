import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePertePage } from './liste-perte.page';

describe('ListePertePage', () => {
  let component: ListePertePage;
  let fixture: ComponentFixture<ListePertePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListePertePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListePertePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

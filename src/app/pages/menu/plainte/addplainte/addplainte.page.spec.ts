import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddplaintePage } from './addplainte.page';

describe('AddplaintePage', () => {
  let component: AddplaintePage;
  let fixture: ComponentFixture<AddplaintePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddplaintePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddplaintePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

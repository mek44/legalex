import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalisationListePage } from './legalisation-liste.page';

describe('LegalisationListePage', () => {
  let component: LegalisationListePage;
  let fixture: ComponentFixture<LegalisationListePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalisationListePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalisationListePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

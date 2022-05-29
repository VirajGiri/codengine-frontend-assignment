import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editinsuranceform } from './editinsuranceform.component';

describe('AddeditaddressComponent', () => {
  let component: Editinsuranceform;
  let fixture: ComponentFixture<Editinsuranceform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Editinsuranceform ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Editinsuranceform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

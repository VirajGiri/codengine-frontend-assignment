import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinsuranceformComponent } from './addinsuranceform.component';

describe('AddinsuranceformComponent', () => {
  let component: AddinsuranceformComponent;
  let fixture: ComponentFixture<AddinsuranceformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddinsuranceformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddinsuranceformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

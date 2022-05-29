import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewinsurenceformComponent } from './viewinsurenceform.component';

describe('ViewinsurenceformComponent', () => {
  let component: ViewinsurenceformComponent;
  let fixture: ComponentFixture<ViewinsurenceformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewinsurenceformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewinsurenceformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

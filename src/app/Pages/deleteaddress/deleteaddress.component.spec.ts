import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteaddressComponent } from './deleteaddress.component';

describe('DeleteaddressComponent', () => {
  let component: DeleteaddressComponent;
  let fixture: ComponentFixture<DeleteaddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteaddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

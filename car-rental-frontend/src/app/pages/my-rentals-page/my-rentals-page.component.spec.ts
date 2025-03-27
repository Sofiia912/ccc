import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRentalsPageComponent } from './my-rentals-page.component';

describe('MyRentalsPageComponent', () => {
  let component: MyRentalsPageComponent;
  let fixture: ComponentFixture<MyRentalsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRentalsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRentalsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

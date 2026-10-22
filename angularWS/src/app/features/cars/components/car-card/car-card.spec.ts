import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CarCard } from './car-card';

describe('CarCard', () => {
  let component: CarCard;
  let fixture: ComponentFixture<CarCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CarCard);
    fixture.componentRef.setInput('car', {
      _id: '1',
      make: 'Toyota',
      model: 'Corolla',
      year: 2023
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { CarService } from '../../services/car';
import { CarForm } from './car-form';

describe('CarForm', () => {
  let component: CarForm;
  let fixture: ComponentFixture<CarForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarForm],
      providers: [
        provideRouter([]),
        {
          provide: CarService,
          useValue: {
            addCar: () => of({ _id: '1', make: 'Toyota', model: 'Corolla', year: 2023 })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

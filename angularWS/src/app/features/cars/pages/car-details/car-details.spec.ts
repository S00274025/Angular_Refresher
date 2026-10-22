import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CarService } from '../../services/car';
import { CarDetails } from './car-details';

describe('CarDetails', () => {
  let component: CarDetails;
  let fixture: ComponentFixture<CarDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDetails],
      providers: [{
        provide: CarService,
        useValue: {
          getCarById: () => of({ _id: '1', make: 'Toyota', model: 'Corolla', year: 2023 })
        }
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(CarDetails);
    fixture.componentRef.setInput('id', '1');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

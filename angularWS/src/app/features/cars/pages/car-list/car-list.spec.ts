import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CarService } from '../../services/car';
import { CarList } from './car-list';

describe('CarList', () => {
  let component: CarList;
  let fixture: ComponentFixture<CarList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarList],
      providers: [{
        provide: CarService,
        useValue: {
          getCars: () => of([
            { _id: '1', make: 'Toyota', model: 'Corolla', year: 2023 }
          ])
        }
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(CarList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

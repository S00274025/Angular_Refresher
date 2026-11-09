
import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarService } from '../../services/car';
import { Car } from '../../models/car.model';
import { Observable } from 'rxjs';
import { CarCard } from '../../components/car-card/car-card';
import { toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state';
@Component({
  selector: 'app-car-list',
  imports: [AsyncPipe, CarCard, RouterLink],
  templateUrl: './car-list.html',
  styleUrl: './car-list.scss'
})

export class CarList implements OnInit {
  private carService = inject(CarService);
  
  cars = toSignal(this.carService.getCars());
  
  cars$!: Observable<Car[]>;
  
  ngOnInit(): void {
    this.cars$ = this.carService.getCars();
  }
  state = toSignal(withLoadState(this.carService.getCars()), { requireSync: true });
}

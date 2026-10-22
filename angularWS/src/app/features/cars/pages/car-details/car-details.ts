
import { Component, inject, input, signal, OnInit } from '@angular/core';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car';

@Component({
  selector: 'app-car-details',
  imports: [],
  templateUrl: './car-details.html',
  styleUrl: './car-details.scss'
})
export class CarDetails implements OnInit {
  private carService = inject(CarService);

  readonly id = input.required<string>();
  readonly car = signal<Car | null>(null);

 ngOnInit(): void {
  this.carService.getCarById(this.id()).subscribe({
    next: (car) => this.car.set(car),
    error: (error) => console.error('Error loading car:', error)
  });
}
}

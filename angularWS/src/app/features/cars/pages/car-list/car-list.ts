
import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import {  CarService } from '../../services/car';
import { Car } from '../../models/car.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-car-list',
  imports: [AsyncPipe],
  templateUrl: './car-list.html',
  styleUrl: './car-list.scss'
})
export class CarList implements OnInit {
  private carService = inject(CarService);

  cars$!: Observable<Car[]>;

  ngOnInit(): void {
    this.cars$ = this.carService.getCars();
  }
}

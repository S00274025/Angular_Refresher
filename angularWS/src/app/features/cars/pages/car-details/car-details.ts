import { Component, inject, input, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car';
import { LoadState, withLoadState } from '../../../../shared/load-state';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-car-details',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './car-details.html',
  styleUrl: './car-details.scss'
})
export class CarDetails implements OnInit {
  private carService = inject(CarService);
  private readonly router = inject(Router);

  readonly id = input.required<string>();
  readonly car = signal<Car | null>(null);
  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);
  readonly initial: LoadState<Car> = { status: 'loading' };
  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => withLoadState(this.carService.getCarById(id))),
    ),
    { initialValue: this.initial },
  );

  ngOnInit(): void {
    this.carService.getCarById(this.id()).subscribe({
      next: (car) => this.car.set(car),
      error: (error) => console.error('Error loading car:', error)
    });
  }

  deleteCar(car: Car): void {
    if (!confirm(`Delete ${car.make} ${car.model}?`)) return;

    this.deleting.set(true);
    this.deleteError.set(null);

    this.carService.deleteCar(car._id).subscribe({
      next: () => this.router.navigate(['/cars']),
      error: (err: Error) => {
        this.deleteError.set(err.message);
        this.deleting.set(false);
      },
    });
  }
}
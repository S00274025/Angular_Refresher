
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car';

@Component({
  selector: 'app-car-form',
  imports: [ReactiveFormsModule],
  templateUrl: './car-form.html',
  styleUrl: './car-form.scss'
})
export class CarForm {
  private formBuilder = inject(FormBuilder);
  private carService = inject(CarService);
  private router = inject(Router);

  carForm = this.formBuilder.group({
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: ['']
  });

  onSubmit(): void {
    if (this.carForm.invalid) {
      return;
    }

    const carData: Car = {
      make: this.carForm.value.make!,
      model: this.carForm.value.model!,
      ...(this.carForm.value.year
        ? { year: Number(this.carForm.value.year) }
        : {})
    };

    (this.carService as any).addCar(carData).subscribe({
      next: (response: any) => {
        console.log('Car added successfully:', response);
        this.router.navigate(['/cars']);
      },
      error: (error: any) => {
        console.error('Error adding car:', error);
      }
    });
  }
}

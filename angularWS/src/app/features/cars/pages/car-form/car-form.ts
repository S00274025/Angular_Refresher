
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Car, CreateCarDto } from '../../models/car.model';
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

  carForm = this.formBuilder.nonNullable.group({
     make: ['', Validators.required],
     model: ['', Validators.required],
     year: this.formBuilder.control<number|null> (null)

  });
  saving = signal(false);
  saveError = signal<string | null>(null);

  onSubmit(): void {


    const { make, model, year } = this.carForm.getRawValue();
    const newCar: CreateCarDto = { make, model, year: year ?? undefined };

    this.saving.set(true);
    this.saveError.set(null);

    this.carService.addCar(newCar).subscribe({
      next: (response) => {
        console.log('Car added successfully:', response);
        this.router.navigate(['/cars']);
      },
    error: (err: Error) => {
      this.saveError.set(err.message);
      this.saving.set(false);
    },
    });
  }


//   onSubmit(): void {
//     if (this.carForm.invalid) {
//       return;
      
//     }

//     const carData: Car = {
//       make: this.carForm.value.make!,
//       model: this.carForm.value.model!,
//       ...(this.carForm.value.year
//         ? { year: Number(this.carForm.value.year) }
//         : {}),
//       _id: ''
//     };

//     this.carService.addCar(carData).subscribe({
//       next: (response: Car) => {
//         console.log('Car added successfully:', response);
//         this.router.navigate(['/cars']);
//       },
//       error: (error: unknown) => {
//         console.error('Error adding car:', error);
//       }
//     });
//   }
 }

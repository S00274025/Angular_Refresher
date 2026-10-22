import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/v1/cars';
  private readonly headers = new HttpHeaders({
    'x-api-key': 'Dmf2ZKgxsVJM7Vg6'
  });

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl, { headers: this.headers });
  }

  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  addCar(car: Omit<Car, '_id'>): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car, { headers: this.headers });
  }

  updateCar(id: string, car: Partial<Car>): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${id}`, car, { headers: this.headers });
  }

  deleteCar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}

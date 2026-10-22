import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/v1/cars';

  getCars(): Observable<Car[]> {
    const headers = new HttpHeaders({
      'x-api-key': 'Dmf2ZKgxsVJM7Vg6'
    });

    return this.http.get<Car[]>(this.apiUrl, { headers });
  }

  getCarById(id: string): Observable<Car> {
    const headers = new HttpHeaders({
      'x-api-key': 'Dmf2ZKgxsVJM7Vg6'
    });

    return this.http.get<Car>(`${this.apiUrl}/${id}`, { headers });
  }
}

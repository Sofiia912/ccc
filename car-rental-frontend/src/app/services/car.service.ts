import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:3000/api/cars';

  constructor(private http: HttpClient) {}

  getAllCars(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deleteCar(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/cars/${id}`);
  }
  getCarById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  
  addCar(car: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/cars', car);
  }
  updateCar(id: number, car: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/cars/${id}`, car);
  }
  
}
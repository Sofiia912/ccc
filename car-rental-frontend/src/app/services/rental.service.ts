import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private apiUrl = 'http://localhost:3000/api/rentals';

  constructor(private http: HttpClient) {}

  createRental(rental: {
    car_id: number;
    start_date: string;
    end_date: string;
    total_price: number;
  }): Observable<any> {
    return this.http.post(this.apiUrl, rental);
  }
}

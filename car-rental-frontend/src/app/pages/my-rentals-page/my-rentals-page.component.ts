import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-my-rentals-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-rentals-page.component.html',
  styleUrl: './my-rentals-page.component.scss'
})
export class MyRentalsPageComponent implements OnInit {
  rentals: any[] = [];
  error = '';

  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.rentalService.getUserRentals().subscribe({
      next: (data) => (this.rentals = data),
      error: () => (this.error = 'Не вдалося завантажити оренди')
    });
  }

  isPast(endDate: string): boolean {
    return new Date(endDate) < new Date();
  }
}
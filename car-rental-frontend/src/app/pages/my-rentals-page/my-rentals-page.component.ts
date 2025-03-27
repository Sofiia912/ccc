import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalService } from '../../services/rental.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'my-rentals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-rentals-page.component.html',
  styleUrl: './my-rentals-page.component.scss'
})
export class MyRentalsPageComponent implements OnInit {
  rentals: any[] = [];
  user: any = null;
  error = '';

  constructor(
    private rentalService: RentalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // отримуємо користувача
    this.authService.getUserInfo().subscribe({
      next: (userData) => this.user = userData,
      error: () => console.warn('Не вдалося отримати дані користувача')
    });

    // отримуємо оренди
    this.rentalService.getUserRentals().subscribe({
      next: (data) => (this.rentals = data),
      error: () => (this.error = 'Не вдалося завантажити оренди')
    });
  }

  isPast(endDate: string): boolean {
    return new Date(endDate) < new Date();
  }
}
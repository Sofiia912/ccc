import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RentalService } from '../../services/rental.service';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-rental-page',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './rental-page.component.html',
  styleUrl: './rental-page.component.scss'
})
export class RentalPageComponent {
  carId!: number;
  start_date = '';
  end_date = '';
  pricePerDay = 0;
  message = '';
  error = '';
  totalPrice = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rentalService: RentalService,
    private carService: CarService
  ) {
    this.carId = Number(this.route.snapshot.paramMap.get('carId'));
    this.carService.getCarById(this.carId).subscribe({
      next: (car) => {
        this.pricePerDay = car.price_per_day;
      },
      error: () => {
        this.error = 'Не вдалося отримати інформацію про авто';
      }
    });
  }

  submit() {
    const days = this.getRentalDays();
    const total_price = days * this.pricePerDay;

    this.rentalService
      .createRental({
        car_id: this.carId,
        start_date: this.start_date,
        end_date: this.end_date,
        total_price
      })
      .subscribe({
        next: () => {
          this.message = 'Оренду оформлено успішно!';
          setTimeout(() => this.router.navigate(['/cars']));
        },
        error: () => {
          this.error = 'Не вдалося оформити оренду';
        }
      });
  }

  getRentalDays(): number {
    const start = new Date(this.start_date);
    const end = new Date(this.end_date);
  
    if (!this.start_date || !this.end_date || end < start) return 0;
  
    const diff = end.getTime() - start.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24)) || 1;
  }
  updatePrice() {
    const days = this.getRentalDays();
    this.totalPrice = days * this.pricePerDay;
  }
}

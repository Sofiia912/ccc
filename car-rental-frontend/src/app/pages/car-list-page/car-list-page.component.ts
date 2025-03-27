import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { CarService } from '../../services/car.service';
import { RouterLink } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-car-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './car-list-page.component.html',
  styleUrls: ['./car-list-page.component.scss']
})
export class CarListPageComponent implements OnInit {
  cars: any[] = [];
  error = '';

  constructor(
    private carService: CarService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // лише якщо ми у браузері, а не на сервері
      this.carService.getAllCars().subscribe({
        next: (data) => this.cars = data,
        error: (err) => {
          console.error(err);
          this.error = 'Не вдалося завантажити автівки';
        }
      });
    }
  }
}

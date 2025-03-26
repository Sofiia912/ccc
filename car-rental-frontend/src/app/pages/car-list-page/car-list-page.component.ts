import { CommonModule } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { CarService } from '../../services/car.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-car-list-page',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './car-list-page.component.html',
  styleUrl: './car-list-page.component.scss'
})
export class CarListPageComponent implements OnInit {
  cars: any[] = [];
  error = '';

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getAllCars().subscribe({
      next: (data) => {
        console.log('Автівки з сервера:', data);
        this.cars = data;
      },
      error: (err) => {
        console.error('Помилка при запиті:', err);
        this.error = 'Не вдалося завантажити автівки';
      }
    });
  }
}
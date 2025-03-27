import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  cars: any[] = [];
  selectedTab: 'view' | 'add' | 'edit' = 'view';
  showCars = false;
  rentals: any[] = [];
  showRentals = false;

  // Поле для нової автівки
  newCar = {
    brand: '',
    model: '',
    name: '',
    fuel_type: '',
    engine: '',
    year: 2024,
    price_per_day: 0,
    image_url: '',
    available: true,
    transmission: '',
    passengers: 4
  };

  // Поле для редагування
  editCar: any = null;

  constructor(
    private carService: CarService, 
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
  }

  // Завантажити список автівок
  loadCars() {
    this.carService.getAllCars().subscribe({
      next: (data) => (this.cars = data),
      error: () => console.warn('Не вдалося завантажити автівки')
    });
  }
  loadRentals() {
    this.showRentals = true;
    this.rentalService.getAllRentals().subscribe({
      next: (data) => this.rentals = data,
      error: () => console.warn('Не вдалося завантажити оренди')
    });
  }
  
  // Видалити автівку
  deleteCar(id: number) {
    this.carService.deleteCar(id).subscribe(() => {
      this.cars = this.cars.filter(c => c.id !== id);
    });
  }

  // Переключення вкладок
  setTab(tab: 'view' | 'add' | 'edit') {
    this.selectedTab = tab;
  
    this.showCars = false;
    this.showRentals = false;
  
    if (tab === 'view') {
      this.loadCars();
      this.showCars = true;
    }
  }

  // Додати нову автівку
  addCar() {
    this.carService.addCar(this.newCar).subscribe(() => {
      this.loadCars();
      this.resetNewCar();
      this.selectedTab = 'view';
    });
  }

  // Підготовка до редагування
  startEdit(car: any) {
    this.editCar = { ...car };
    this.selectedTab = 'edit';
  }

  // Зберегти редаговану автівку
  updateCar() {
    this.carService.updateCar(this.editCar.id, this.editCar).subscribe(() => {
      this.loadCars();
      this.editCar = null;
      this.selectedTab = 'view';
    });
  }

  // Очистити форму додавання
  resetNewCar() {
    this.newCar = {
      brand: '',
      model: '',
      name: '',
      fuel_type: '',
      engine: '',
      year: 2024,
      price_per_day: 0,
      image_url: '',
      available: true,
      transmission: '',
      passengers: 4
    };
  }
}

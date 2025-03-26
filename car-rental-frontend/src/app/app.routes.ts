import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CarListPageComponent } from './pages/car-list-page/car-list-page.component';
import { RentalPageComponent } from './pages/rental-page/rental-page.component';

export const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: 'cars', component: CarListPageComponent},
    { path: 'rent/:carId', component: RentalPageComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];

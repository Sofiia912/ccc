import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CarListPageComponent } from './pages/car-list-page/car-list-page.component';
import { RentalPageComponent } from './pages/rental-page/rental-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { MyRentalsPageComponent } from './pages/my-rentals-page/my-rentals-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'cars', component: CarListPageComponent }, // доступна всім
    { path: 'rent/:carId', component: RentalPageComponent, canActivate: [authGuard] },
    { path: 'my-rentals', component: MyRentalsPageComponent, canActivate: [authGuard] },
    { path: '', redirectTo: 'cars', pathMatch: 'full' }
];

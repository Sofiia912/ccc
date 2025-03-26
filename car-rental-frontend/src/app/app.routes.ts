import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CarListPageComponent } from './pages/car-list-page/car-list-page.component';

export const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: 'cars', component: CarListPageComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];

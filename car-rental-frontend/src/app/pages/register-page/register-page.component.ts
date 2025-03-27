import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  first_name = '';
  last_name = '';
  email = '';
  password = '';
  error = '';
  message = '';
  confirmPassword = '';


  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.error = 'Паролі не збігаються';
      return;
    }
    // Викликаємо метод register із AuthService
    this.authService.register({
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.message = 'Реєстрація успішна! Тепер увійдіть у систему.';
        this.first_name = '';
        this.last_name = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.router.navigate(['/login']);
      }
      ,
      error: (err) => {
        this.error = err.error?.error || 'Не вдалося зареєструватися';
      }
    });
  }
}

import { Component } from '@angular/core';
import { CarListPageComponent } from "../pages/car-list-page/car-list-page.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarListPageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

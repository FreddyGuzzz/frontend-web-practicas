import { Component, input } from '@angular/core';
import { Clase } from '../modelos/clase';

@Component({
  selector: 'app-tarjeta-clase',
  standalone: true,
  templateUrl: './tarjeta-clase.component.html',
  styleUrl: './tarjeta-clase.component.css'
})
export class TarjetaClaseComponent {
  item = input.required<Clase>();
}

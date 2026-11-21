import { Component } from '@angular/core';
import { TarjetaClaseComponent } from './tarjeta-clase/tarjeta-clase.component';
import { CATALOGO_CLASES } from './datos/clases-locales';
import { Clase } from './modelos/clase';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TarjetaClaseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  listaClases: Clase[] = CATALOGO_CLASES;

  get cantidadClases(): number {
    return this.listaClases.length;
  }

  get totalMinutos(): number {
    return this.listaClases.reduce((acum, item) => acum + item.minutos, 0);
  }

  get cantidadLargas(): number {
    return this.listaClases.filter((item) => item.minutos >= 60).length;
  }

  limpiarLista(): void {
    this.listaClases = [];
  }

  cargarLista(): void {
    this.listaClases = CATALOGO_CLASES;
  }
}

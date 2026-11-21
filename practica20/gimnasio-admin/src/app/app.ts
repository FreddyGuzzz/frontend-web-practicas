import { Component, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { TarjetaClase } from './componentes/tarjeta-clase/tarjeta-clase';
import { FiltroCategoria } from './componentes/filtro-categoria/filtro-categoria';
import { Catalogo } from './servicios/catalogo';

@Component({
  selector: 'app-root',
  imports: [TarjetaClase, FiltroCategoria, TitleCasePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly servicioCatalogo = inject(Catalogo);
}

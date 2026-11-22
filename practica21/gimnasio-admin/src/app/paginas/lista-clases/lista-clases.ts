import { Component, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TarjetaClase } from '../../componentes/tarjeta-clase/tarjeta-clase';
import { FiltroCategoria } from '../../componentes/filtro-categoria/filtro-categoria';
import { Catalogo } from '../../servicios/catalogo';
import { API_URL } from '../../config';

@Component({
  selector: 'app-lista-clases',
  imports: [TarjetaClase, FiltroCategoria, TitleCasePipe, RouterLink],
  templateUrl: './lista-clases.html',
})
export class ListaClases {
  protected readonly servicioCatalogo = inject(Catalogo);

  protected urlImagen(ruta: string): string {
    return ruta.startsWith('http') ? ruta : `${API_URL}${ruta}`;
  }
}

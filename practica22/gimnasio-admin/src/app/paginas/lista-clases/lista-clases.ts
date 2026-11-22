import { Component, inject, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TarjetaClase } from '../../componentes/tarjeta-clase/tarjeta-clase';
import { FiltroCategoria } from '../../componentes/filtro-categoria/filtro-categoria';
import { Catalogo } from '../../servicios/catalogo';
import { ClasesApi } from '../../servicios/clases-api';
import { mensajeDeError } from '../../servicios/errores';
import { API_URL } from '../../config';
import type { Clase } from '../../modelos/clase';

@Component({
  selector: 'app-lista-clases',
  imports: [TarjetaClase, FiltroCategoria, TitleCasePipe, RouterLink],
  templateUrl: './lista-clases.html',
})
export class ListaClases {
  protected readonly servicioCatalogo = inject(Catalogo);
  private readonly clasesApi = inject(ClasesApi);

  protected readonly eliminando = signal(false);
  protected readonly errorAccion = signal<string | null>(null);

  protected urlImagen(ruta: string): string {
    return ruta.startsWith('http') ? ruta : `${API_URL}${ruta}`;
  }

  protected eliminarClase(clase: Clase): void {
    if (!confirm(`¿Eliminar la clase "${clase.nombre}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    this.eliminando.set(true);
    this.errorAccion.set(null);

    this.clasesApi.eliminar(clase.id).subscribe({
      next: () => {
        this.eliminando.set(false);
        this.servicioCatalogo.claseActiva.set(null);
        this.servicioCatalogo.recargar();
      },
      error: (err: unknown) => {
        this.eliminando.set(false);
        this.errorAccion.set(mensajeDeError(err));
      },
    });
  }
}

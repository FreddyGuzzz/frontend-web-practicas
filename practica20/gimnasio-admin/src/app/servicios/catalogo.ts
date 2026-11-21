import { Injectable, computed, signal } from '@angular/core';
import { CLASES_LOCALES } from '../datos/clases-locales';
import type { Categoria, Clase } from '../modelos/clase';

@Injectable({ providedIn: 'root' })
export class Catalogo {
  private readonly listaClases = signal<Clase[]>(CLASES_LOCALES);

  readonly categoriaActiva = signal<Categoria | 'todas'>('todas');
  readonly claseActiva = signal<Clase | null>(null);

  readonly clasesFiltradas = computed(() => {
    const actual = this.categoriaActiva();
    const todas = this.listaClases();
    return actual === 'todas' ? todas : todas.filter((item) => item.categoria === actual);
  });

  readonly totalMinutos = computed(() =>
    this.clasesFiltradas().reduce((acum, item) => acum + item.duracionMin, 0),
  );

  cambiarCategoria(categoria: Categoria | 'todas'): void {
    this.categoriaActiva.set(categoria);

    const seleccionada = this.claseActiva();
    if (seleccionada && categoria !== 'todas' && seleccionada.categoria !== categoria) {
      this.claseActiva.set(null);
    }
  }

  alternarSeleccion(clase: Clase): void {
    this.claseActiva.update((previa) => (previa?.id === clase.id ? null : clase));
  }
}

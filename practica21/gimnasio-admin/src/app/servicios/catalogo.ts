import { Injectable, computed, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { API_URL } from '../config';
import { mensajeDeError } from './errores';
import type { Categoria, Clase, Sobre } from '../modelos/clase';

@Injectable({ providedIn: 'root' })
export class Catalogo {
  private readonly recurso = httpResource<Sobre<Clase[]>>(() => `${API_URL}/clases`);

  private readonly listaClases = computed<Clase[]>(() => this.recurso.value()?.data ?? []);

  readonly cargando = this.recurso.isLoading;
  readonly error = computed<string | null>(() => {
    const err = this.recurso.error();
    return err ? mensajeDeError(err) : null;
  });

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

  recargar(): void {
    this.recurso.reload();
  }
}

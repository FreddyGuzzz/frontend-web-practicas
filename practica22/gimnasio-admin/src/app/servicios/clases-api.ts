import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config';
import type { Clase, ClaseConHorarios, ClaseNueva, Sobre } from '../modelos/clase';

@Injectable({ providedIn: 'root' })
export class ClasesApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${API_URL}/clases`;

  obtener(id: number): Observable<Sobre<ClaseConHorarios>> {
    return this.http.get<Sobre<ClaseConHorarios>>(`${this.base}/${id}`);
  }

  crear(datos: ClaseNueva): Observable<Sobre<Clase>> {
    return this.http.post<Sobre<Clase>>(this.base, datos);
  }

  actualizar(id: number, datos: Partial<ClaseNueva>): Observable<Sobre<Clase>> {
    return this.http.patch<Sobre<Clase>>(`${this.base}/${id}`, datos);
  }

  eliminar(id: number): Observable<Sobre<Clase>> {
    return this.http.delete<Sobre<Clase>>(`${this.base}/${id}`);
  }
}

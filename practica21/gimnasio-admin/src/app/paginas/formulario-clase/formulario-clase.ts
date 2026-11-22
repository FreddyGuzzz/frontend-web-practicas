import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { API_URL } from '../../config';
import { CATEGORIAS, type Categoria, type ClaseNueva } from '../../modelos/clase';

function multiplosDeCinco(control: AbstractControl): ValidationErrors | null {
  if (control.value === null || control.value === '') return null;
  const numero = Number(control.value);
  return Number.isFinite(numero) && numero % 5 === 0 ? null : { multiploDeCinco: true };
}

@Component({
  selector: 'app-formulario-clase',
  imports: [ReactiveFormsModule, RouterLink, JsonPipe],
  templateUrl: './formulario-clase.html',
})
export class FormularioClase {
  private readonly fb = inject(FormBuilder);

  protected readonly categorias = CATEGORIAS;
  protected readonly objetoListo = signal<ClaseNueva | null>(null);

  protected readonly formulario = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
    categoria: ['fuerza' as Categoria, [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    duracionMin: [45, [Validators.required, Validators.min(15), Validators.max(180), multiplosDeCinco]],
    imagen: ['/img/clase-01.jpg', [Validators.required, Validators.pattern(/^\/img\/.+\.(jpg|jpeg|png|webp)$/i)]],
  });

  protected urlPrevia(): string {
    const ruta = this.formulario.controls.imagen.value;
    return ruta.startsWith('http') ? ruta : `${API_URL}${ruta}`;
  }

  protected guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.objetoListo.set(this.formulario.getRawValue());
  }
}

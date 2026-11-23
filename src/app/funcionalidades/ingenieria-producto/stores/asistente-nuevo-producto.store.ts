import { Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOpcionSelector } from '@compartido/interfaces/selector.interface';

@Injectable()
export class AsistenteNuevoProductoStore {
  readonly categorias: IOpcionSelector[] = [
    { etiqueta: 'Calzado', valor: 'calzado' },
    { etiqueta: 'Ropa', valor: 'ropa' },
    { etiqueta: 'Accesorios', valor: 'accesorios' },
    { etiqueta: 'Textiles', valor: 'textiles' },
  ];

  readonly marcas: IOpcionSelector[] = [
    { etiqueta: 'Marca propia', valor: 'marca-propia' },
    { etiqueta: 'Licencia', valor: 'licencia' },
    { etiqueta: 'Sin marca', valor: 'sin-marca' },
  ];

  readonly lineas: IOpcionSelector[] = [
    { etiqueta: 'Casual', valor: 'casual' },
    { etiqueta: 'Formal', valor: 'formal' },
    { etiqueta: 'Deportiva', valor: 'deportiva' },
    { etiqueta: 'Outdoor', valor: 'outdoor' },
  ];

  readonly generos: IOpcionSelector[] = [
    { etiqueta: 'Dama', valor: 'dama' },
    { etiqueta: 'Caballero', valor: 'caballero' },
    { etiqueta: 'Unisex', valor: 'unisex' },
    { etiqueta: 'Infantil', valor: 'infantil' },
  ];

  readonly estatusOpciones: IOpcionSelector[] = [
    { etiqueta: 'Borrador', valor: 'borrador' },
    { etiqueta: 'Activo', valor: 'activo' },
    { etiqueta: 'Inactivo', valor: 'inactivo' },
  ];

  readonly formularioModelo = new FormGroup({
    codigo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    fechaAlta: new FormControl<Date | null>(new Date()),
    estatus: new FormControl('borrador', { nonNullable: true }),
    descripcion: new FormControl('', { nonNullable: true }),
    categoria: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    marca: new FormControl('', { nonNullable: true }),
    linea: new FormControl('', { nonNullable: true }),
    genero: new FormControl('', { nonNullable: true }),
  });

  readonly imagenes = signal<File[]>([]);

  get codigoInvalido(): boolean {
    const control = this.formularioModelo.controls.codigo;
    return control.invalid && (control.touched || control.dirty);
  }

  get nombreInvalido(): boolean {
    const control = this.formularioModelo.controls.nombre;
    return control.invalid && (control.touched || control.dirty);
  }

  get categoriaInvalida(): boolean {
    const control = this.formularioModelo.controls.categoria;
    return control.invalid && (control.touched || control.dirty);
  }

  get nombreResumen(): string {
    return this.formularioModelo.controls.nombre.value.trim() || 'Sin nombre todavía';
  }

  get categoriaResumen(): string {
    return this.etiqueta(this.categorias, this.formularioModelo.controls.categoria.value);
  }

  get lineaResumen(): string {
    return this.etiqueta(this.lineas, this.formularioModelo.controls.linea.value);
  }

  get estadoResumen(): string {
    return this.etiqueta(this.estatusOpciones, this.formularioModelo.controls.estatus.value);
  }

  validarDatosGenerales(): boolean {
    if (this.formularioModelo.invalid) {
      this.formularioModelo.markAllAsTouched();
      return false;
    }

    return true;
  }

  actualizarImagenes(archivos: File[]): void {
    this.imagenes.set(archivos);
  }

  private etiqueta(opciones: IOpcionSelector[], valor: string): string {
    return opciones.find((opcion) => opcion.valor === valor)?.etiqueta ?? 'Sin definir';
  }
}

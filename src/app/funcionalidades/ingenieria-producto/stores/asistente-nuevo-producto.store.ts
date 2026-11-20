import { Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface OpcionSelect {
  label: string;
  value: string;
}

@Injectable()
export class NewProductWizardStore {
  readonly categorias: OpcionSelect[] = [
    { label: 'Calzado', value: 'calzado' },
    { label: 'Ropa', value: 'ropa' },
    { label: 'Accesorios', value: 'accesorios' },
    { label: 'Textiles', value: 'textiles' },
  ];

  readonly marcas: OpcionSelect[] = [
    { label: 'Marca propia', value: 'marca-propia' },
    { label: 'Licencia', value: 'licencia' },
    { label: 'Sin marca', value: 'sin-marca' },
  ];

  readonly lineas: OpcionSelect[] = [
    { label: 'Casual', value: 'casual' },
    { label: 'Formal', value: 'formal' },
    { label: 'Deportiva', value: 'deportiva' },
    { label: 'Outdoor', value: 'outdoor' },
  ];

  readonly generos: OpcionSelect[] = [
    { label: 'Dama', value: 'dama' },
    { label: 'Caballero', value: 'caballero' },
    { label: 'Unisex', value: 'unisex' },
    { label: 'Infantil', value: 'infantil' },
  ];

  readonly estatusOpciones: OpcionSelect[] = [
    { label: 'Borrador', value: 'borrador' },
    { label: 'Activo', value: 'activo' },
    { label: 'Inactivo', value: 'inactivo' },
  ];

  readonly modeloForm = new FormGroup({
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
    const control = this.modeloForm.controls.codigo;
    return control.invalid && (control.touched || control.dirty);
  }

  get nombreInvalido(): boolean {
    const control = this.modeloForm.controls.nombre;
    return control.invalid && (control.touched || control.dirty);
  }

  get categoriaInvalida(): boolean {
    const control = this.modeloForm.controls.categoria;
    return control.invalid && (control.touched || control.dirty);
  }

  get nombreResumen(): string {
    return this.modeloForm.controls.nombre.value.trim() || 'Sin nombre todavía';
  }

  get categoriaResumen(): string {
    return this.etiqueta(this.categorias, this.modeloForm.controls.categoria.value);
  }

  get lineaResumen(): string {
    return this.etiqueta(this.lineas, this.modeloForm.controls.linea.value);
  }

  get estadoResumen(): string {
    return this.etiqueta(this.estatusOpciones, this.modeloForm.controls.estatus.value);
  }

  validarDatosGenerales(): boolean {
    if (this.modeloForm.invalid) {
      this.modeloForm.markAllAsTouched();
      return false;
    }

    return true;
  }

  actualizarImagenes(archivos: File[]): void {
    this.imagenes.set(archivos);
  }

  private etiqueta(opciones: OpcionSelect[], valor: string): string {
    return opciones.find((opcion) => opcion.value === valor)?.label ?? 'Sin definir';
  }
}

import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { CheckCircle, ExclamationTriangle, FileEdit, Sparkles, Tags, Images } from '@primeicons/angular';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { ToastService } from '../../../../core/services/toast.service';
import {
  AsistentePasosComponent,
  PasoAsistente,
} from '../../../../shared/components/asistente-pasos/asistente-pasos.component';
import { AsistentePasosAccionesComponent } from '../../../../shared/components/asistente-pasos-acciones/asistente-pasos-acciones.component';
import { FormLabelComponent } from '../../../../shared/components/form-label/form-label.component';
import { SelectorImagenComponent } from '../../../../shared/components/selector-imagen/selector-imagen.component';

interface OpcionSelect {
  label: string;
  value: string;
}

@Component({
  selector: 'app-new-product-page',
  imports: [
    ReactiveFormsModule,
    InputText,
    Textarea,
    Select,
    DatePicker,
    FormLabelComponent,
    SelectorImagenComponent,
    AsistentePasosComponent,
    AsistentePasosAccionesComponent,
    FileEdit,
    Tags,
    Sparkles,
    Images,
    CheckCircle,
    ExclamationTriangle,
  ],
  templateUrl: './new-product.page.html',
  styleUrl: './new-product.page.scss',
})
export class NewProductPage {
  private readonly breadcrumb = inject(BreadcrumbService);
  private readonly toast = inject(ToastService);

  readonly pasos: PasoAsistente[] = [
    { id: 1, titulo: 'Datos generales' },
    { id: 2, titulo: 'Corridas y equivalencias' },
    { id: 3, titulo: 'Piezas y consumos' },
    { id: 4, titulo: 'Combinaciones' },
    { id: 5, titulo: 'Revisión y liberación' },
  ];

  pasoActual = 1;

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

  readonly imagen = signal<File | null>(null);

  constructor() {
    this.breadcrumb.setItems([
      {
        key: 'product-engineering',
        label: 'Ingeniería de producto',
        route: '/app/product-engineering/new-product',
        disabled: true,
      },
      { key: 'new-product', label: 'Nuevo producto', disabled: true },
    ]);
  }

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

  get puedeRegresar(): boolean {
    return this.pasoActual > 1;
  }

  get esUltimoPaso(): boolean {
    return this.pasoActual >= this.pasos.length;
  }

  alCambiarPaso(id: number): void {
    this.pasoActual = id;
  }

  alContinuar(): void {
    if (this.pasoActual === 1 && this.modeloForm.invalid) {
      this.modeloForm.markAllAsTouched();
      this.toast.warning(
        'Revisa los datos generales',
        'Completa los campos obligatorios para continuar.',
      );
      return;
    }

    if (this.pasoActual < this.pasos.length) {
      this.pasoActual += 1;
    }
  }

  alRegresar(): void {
    if (this.pasoActual > 1) {
      this.pasoActual -= 1;
    }
  }

  guardarBorrador(): void {
    this.toast.success(
      'Borrador guardado',
      'Puedes retomar este modelo más tarde desde Ingeniería de producto.',
    );
  }

  alSeleccionarImagen(archivo: File): void {
    this.imagen.set(archivo);
  }

  alEliminarImagen(): void {
    this.imagen.set(null);
  }

  private etiqueta(opciones: OpcionSelect[], valor: string): string {
    return opciones.find((opcion) => opcion.value === valor)?.label ?? 'Sin definir';
  }
}

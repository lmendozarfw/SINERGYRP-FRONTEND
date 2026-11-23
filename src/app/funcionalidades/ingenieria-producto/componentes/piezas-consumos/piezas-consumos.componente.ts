import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ConfirmationService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Drawer } from 'primeng/drawer';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { PIcon } from '@primeicons/angular';
import { EtiquetaFormularioComponente } from '@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente';
import { MensajeAyudaErrorComponente } from '@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente';
import { AvisosServicio } from '@nucleo/servicios/aviso.servicio';

type ModoConsumo = 'general' | 'porTalla';

interface ConsumoTalla {
  talla: number;
  consumo: number;
  rendimiento: number;
}

export interface PiezaConsumo {
  id: number;
  nombre: string;
  tipo: string;
  material: string;
  unidad: string;
  departamento: string;
  corrida: string;
  requiereSuaje: boolean;
  suaje: string;
  modoConsumo: ModoConsumo;
  consumoGeneral: number;
  rendimientoGeneral: number;
  consumosPorTalla: ConsumoTalla[];
}

interface CorridaOpcion {
  clave: string;
  nombre: string;
  detalle: string;
  tallas: number[];
}

type ConsumoFormGroup = FormGroup<{
  talla: FormControl<number>;
  consumo: FormControl<number>;
  rendimiento: FormControl<number>;
}>;

@Component({
  selector: 'app-piezas-consumos',
  imports: [
    DecimalPipe,
    ReactiveFormsModule,
    ButtonDirective,
    Checkbox,
    ConfirmDialog,
    Drawer,
    InputNumber,
    InputText,
    Select,
    TableModule,
    EtiquetaFormularioComponente,
    MensajeAyudaErrorComponente,
    PIcon
  ],
  templateUrl: './piezas-consumos.componente.html',
  styleUrl: './piezas-consumos.componente.scss',
  providers: [ConfirmationService],
})
export class PiezasConsumosComponente {
  private readonly avisos = inject(AvisosServicio);
  private readonly confirmationService = inject(ConfirmationService);

  readonly tiposPieza = [
    'Corte',
    'Forro',
    'Suela',
    'Plantilla',
    'Contrafuerte',
    'Herraje',
    'Accesorio',
    'Empaque',
  ];

  readonly materiales = [
    'Piel vacuna',
    'Piel sintética',
    'Textil',
    'EVA',
    'Caucho',
    'Espuma',
    'Cartón',
    'Metal',
  ];

  readonly unidades = ['dm²', 'm²', 'pieza', 'kg', 'g', 'm', 'cm'];

  readonly departamentos = ['Corte', 'Preparado', 'Montado', 'Suela', 'Acabado', 'Empaque'];

  readonly suajes = [
    'Suaje corte principal',
    'Suaje forro',
    'Suaje plantilla',
    'Suaje refuerzo',
    'Suaje contrafuerte',
  ];

  readonly modosConsumo: { etiqueta: string; valor: ModoConsumo }[] = [
    { etiqueta: 'General', valor: 'general' },
    { etiqueta: 'Por talla', valor: 'porTalla' },
  ];

  readonly corridas: CorridaOpcion[] = [
    {
      clave: 'estandar',
      nombre: 'Estándar',
      detalle: 'MX 25 a 30',
      tallas: [25, 26, 27, 28, 29, 30],
    },
    {
      clave: 'amplia',
      nombre: 'Amplia',
      detalle: 'MX 24 a 31',
      tallas: [24, 25, 26, 27, 28, 29, 30, 31],
    },
    {
      clave: 'reducida',
      nombre: 'Reducida',
      detalle: 'MX 26 a 29',
      tallas: [26, 27, 28, 29],
    },
    {
      clave: 'extra',
      nombre: 'Extra amplia',
      detalle: 'MX 23 a 32',
      tallas: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
    },
  ];

  readonly formularioPieza = new FormGroup({
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    tipo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    material: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    unidad: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    departamento: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    corrida: new FormControl(this.corridas[0].clave, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    requiereSuaje: new FormControl(false, { nonNullable: true }),
    suaje: new FormControl('', { nonNullable: true }),
    modoConsumo: new FormControl<ModoConsumo>('general', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    consumoGeneral: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0.01)],
    }),
    rendimientoGeneral: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0.01)],
    }),
  });

  readonly consumosForm = new FormArray<ConsumoFormGroup>([]);

  private readonly piezasState = signal<PiezaConsumo[]>([]);
  readonly piezas = this.piezasState.asReadonly();

  private siguienteId = 1;

  mostrarDrawer = false;
  piezaEnEdicion: PiezaConsumo | null = null;
  mensajeValidacion = '';
  consumosInvalidos = false;

  constructor() {
    this.formularioPieza.controls.modoConsumo.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((modo) => this.actualizarValidadoresConsumo(modo));

    this.formularioPieza.controls.requiereSuaje.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((requiere) => this.actualizarValidadoresSuaje(requiere));

    this.formularioPieza.controls.corrida.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((clave) => this.regenerarConsumos(clave));

    this.regenerarConsumos(this.corridas[0].clave);
  }

  get opcionesCorrida(): { label: string; value: string }[] {
    return this.corridas.map((corrida) => ({
      label: `${corrida.nombre} · ${corrida.detalle}`,
      value: corrida.clave,
    }));
  }

  get tituloDrawer(): string {
    return this.piezaEnEdicion ? 'Editar pieza' : 'Nueva pieza';
  }

  get modoConsumo(): ModoConsumo {
    return this.formularioPieza.controls.modoConsumo.value;
  }

  get requiereSuaje(): boolean {
    return this.formularioPieza.controls.requiereSuaje.value;
  }

  get unidadSeleccionada(): string {
    return this.formularioPieza.controls.unidad.value || 'unidad';
  }

  abrirNuevaPieza(): void {
    this.piezaEnEdicion = null;
    this.mensajeValidacion = '';
    this.consumosInvalidos = false;
    this.formularioPieza.reset({
      nombre: '',
      tipo: '',
      material: '',
      unidad: '',
      departamento: '',
      corrida: this.corridas[0].clave,
      requiereSuaje: false,
      suaje: '',
      modoConsumo: 'general',
      consumoGeneral: 0,
      rendimientoGeneral: 0,
    });
    this.regenerarConsumos(this.corridas[0].clave);
    this.mostrarDrawer = true;
  }

  abrirEdicion(pieza: PiezaConsumo): void {
    this.piezaEnEdicion = pieza;
    this.mensajeValidacion = '';
    this.consumosInvalidos = false;
    this.formularioPieza.reset({
      nombre: pieza.nombre,
      tipo: pieza.tipo,
      material: pieza.material,
      unidad: pieza.unidad,
      departamento: pieza.departamento,
      corrida: pieza.corrida,
      requiereSuaje: pieza.requiereSuaje,
      suaje: pieza.suaje,
      modoConsumo: pieza.modoConsumo,
      consumoGeneral: pieza.consumoGeneral,
      rendimientoGeneral: pieza.rendimientoGeneral,
    });
    this.regenerarConsumos(pieza.corrida, pieza.consumosPorTalla);
    this.mostrarDrawer = true;
  }

  cerrarDrawer(): void {
    this.mostrarDrawer = false;
  }

  alCerrarDrawer(): void {
    this.piezaEnEdicion = null;
    this.mensajeValidacion = '';
    this.consumosInvalidos = false;
  }

  guardarPieza(): void {
    this.formularioPieza.markAllAsTouched();
    this.mensajeValidacion = '';

    if (this.formularioPieza.invalid) {
      this.mensajeValidacion = 'Revisa los campos marcados para continuar.';
      return;
    }

    if (this.modoConsumo === 'porTalla' && !this.consumosValidos()) {
      this.consumosInvalidos = true;
      this.mensajeValidacion =
        'Captura un consumo y un rendimiento mayores a cero en todas las tallas.';
      return;
    }

    this.consumosInvalidos = false;
    const valores = this.formularioPieza.getRawValue();
    const editando = this.piezaEnEdicion;

    const pieza: PiezaConsumo = {
      id: editando?.id ?? this.siguienteId++,
      nombre: valores.nombre.trim(),
      tipo: valores.tipo,
      material: valores.material,
      unidad: valores.unidad,
      departamento: valores.departamento,
      corrida: valores.corrida,
      requiereSuaje: valores.requiereSuaje,
      suaje: valores.requiereSuaje ? valores.suaje : '',
      modoConsumo: valores.modoConsumo,
      consumoGeneral: valores.modoConsumo === 'general' ? valores.consumoGeneral : 0,
      rendimientoGeneral: valores.modoConsumo === 'general' ? valores.rendimientoGeneral : 0,
      consumosPorTalla:
        valores.modoConsumo === 'porTalla'
          ? this.consumosForm.getRawValue().map((fila) => ({
              talla: fila.talla,
              consumo: fila.consumo,
              rendimiento: fila.rendimiento,
            }))
          : [],
    };

    this.piezasState.update((piezas) =>
      editando ? piezas.map((item) => (item.id === pieza.id ? pieza : item)) : [...piezas, pieza],
    );

    if (editando) {
      this.avisos.exito('Pieza actualizada', `"${pieza.nombre}" se guardó correctamente.`);
    } else {
      this.avisos.exito('Pieza agregada', `"${pieza.nombre}" se agregó a la lista.`);
    }

    this.cerrarDrawer();
  }

  eliminarPieza(pieza: PiezaConsumo): void {
    this.confirmationService.confirm({
      header: 'Eliminar pieza',
      message: `¿Eliminar "${pieza.nombre}"? Esta acción no se puede deshacer.`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonProps: { size: 'small' },
      rejectButtonProps: { variant: 'outlined', size: 'small' },
      accept: () => {
        this.piezasState.update((piezas) => piezas.filter((item) => item.id !== pieza.id));
        this.avisos.informacion('Pieza eliminada', `"${pieza.nombre}" se quitó de la lista.`);
      },
    });
  }

  campoInvalido(nombre: string): boolean {
    const control = this.formularioPieza.get(nombre);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  corridaNombre(clave: string): string {
    return this.corridaPorClave(clave).nombre;
  }

  corridaDetalle(clave: string): string {
    return this.corridaPorClave(clave).detalle;
  }

  private actualizarValidadoresConsumo(modo: ModoConsumo): void {
    const controles = this.formularioPieza.controls;
    const general = modo === 'general';

    if (general) {
      controles.consumoGeneral.setValidators([Validators.required, Validators.min(0.01)]);
      controles.rendimientoGeneral.setValidators([Validators.required, Validators.min(0.01)]);
    } else {
      controles.consumoGeneral.clearValidators();
      controles.rendimientoGeneral.clearValidators();
    }

    controles.consumoGeneral.updateValueAndValidity({ emitEvent: false });
    controles.rendimientoGeneral.updateValueAndValidity({ emitEvent: false });
  }

  private actualizarValidadoresSuaje(requiere: boolean): void {
    const control = this.formularioPieza.controls.suaje;

    if (requiere) {
      control.setValidators(Validators.required);
    } else {
      control.clearValidators();
      control.setValue('', { emitEvent: false });
    }

    control.updateValueAndValidity({ emitEvent: false });
  }

  private consumosValidos(): boolean {
    return (
      this.consumosForm.length > 0 &&
      this.consumosForm.controls.every((fila) => {
        const consumo = Number(fila.controls.consumo.value);
        const rendimiento = Number(fila.controls.rendimiento.value);
        return consumo > 0 && rendimiento > 0;
      })
    );
  }

  private regenerarConsumos(clave: string, valores: ConsumoTalla[] = []): void {
    const corrida = this.corridaPorClave(clave);
    this.consumosForm.clear();

    for (const talla of corrida.tallas) {
      const existente = valores.find((fila) => fila.talla === talla);
      this.consumosForm.push(
        new FormGroup({
          talla: new FormControl(talla, { nonNullable: true }),
          consumo: new FormControl(existente?.consumo ?? 0, { nonNullable: true }),
          rendimiento: new FormControl(existente?.rendimiento ?? 0, {
            nonNullable: true,
          }),
        }),
      );
    }
  }

  private corridaPorClave(clave: string): CorridaOpcion {
    return this.corridas.find((corrida) => corrida.clave === clave) ?? this.corridas[0];
  }
}

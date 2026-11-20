import { Component, inject } from '@angular/core';
import { BreadcrumbService } from '../../../../nucleo/servicios/breadcrumb.servicio';
import { ToastService } from '../../../../nucleo/servicios/toast.servicio';
import {
  AsistentePasosComponent,
  PasoAsistente,
} from '../../../../compartido/componentes/asistente-pasos/asistente-pasos.component';
import { AsistentePasosAccionesComponent } from '../../../../compartido/componentes/asistente-pasos-acciones/asistente-pasos-acciones.component';
import { EncabezadoPaginaComponent } from '../../../../compartido/componentes/encabezado-pagina/encabezado-pagina.component';
import { DatosGeneralesComponent } from '../../componentes/datos-generales/datos-generales.component';
import { CorridasEquivalenciasComponent } from '../../componentes/corridas-equivalencias/corridas-equivalencias.component';
import { PiezasConsumosComponent } from '../../componentes/piezas-consumos/piezas-consumos.component';
import { CombinacionesComponent } from '../../componentes/combinaciones/combinaciones.component';
import { RevisionLiberacionComponent } from '../../componentes/revision-liberacion/revision-liberacion.component';
import { NewProductWizardStore } from '../../stores/asistente-nuevo-producto.store';

interface EncabezadoPaso {
  titulo: string;
  descripcion: string;
}

@Component({
  selector: 'app-new-product-page',
  imports: [
    AsistentePasosComponent,
    AsistentePasosAccionesComponent,
    EncabezadoPaginaComponent,
    DatosGeneralesComponent,
    CorridasEquivalenciasComponent,
    PiezasConsumosComponent,
    CombinacionesComponent,
    RevisionLiberacionComponent,
  ],
  providers: [NewProductWizardStore],
  templateUrl: './new-product.page.html',
  styleUrl: './new-product.page.scss',
})
export class NewProductPage {
  private readonly breadcrumb = inject(BreadcrumbService);
  private readonly toast = inject(ToastService);
  private readonly wizard = inject(NewProductWizardStore);

  readonly pasos: PasoAsistente[] = [
    { id: 1, titulo: 'Datos generales' },
    { id: 2, titulo: 'Corridas y equivalencias' },
    { id: 3, titulo: 'Piezas y consumos' },
    { id: 4, titulo: 'Combinaciones' },
    { id: 5, titulo: 'Revisión y liberación' },
  ];

  pasoActual = 1;

  readonly encabezados: Record<number, EncabezadoPaso> = {
    1: {
      titulo: 'Crea un nuevo modelo',
      descripcion:
        'Completa la información base del modelo. Después podrás configurar sus corridas, piezas y combinaciones.',
    },
    2: {
      titulo: 'Corridas y equivalencias',
      descripcion: 'Define las tallas disponibles y su correspondencia en otros sistemas.',
    },
    3: {
      titulo: 'Piezas y consumos',
      descripcion: 'Configura las piezas del modelo y sus consumos por corrida.',
    },
    4: {
      titulo: 'Combinaciones',
      descripcion: 'Combina colores, materiales y acabados para el modelo.',
    },
    5: {
      titulo: 'Revisión y liberación',
      descripcion: 'Revisa la información del modelo antes de liberarlo.',
    },
  };

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

  get encabezado(): EncabezadoPaso {
    return this.encabezados[this.pasoActual] ?? this.encabezados[1];
  }

  get siguientePaso(): string {
    return this.pasos[this.pasoActual]?.titulo ?? '';
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
    // if (this.pasoActual === 1 && !this.wizard.validarDatosGenerales()) {
    //   this.toast.warning(
    //     'Revisa los datos generales',
    //     'Completa los campos obligatorios para continuar.',
    //   );
    //   return;
    // }

    // if (this.pasoActual < this.pasos.length) {
    //   this.pasoActual += 1;
    // }
    this.pasoActual += 1;
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
}

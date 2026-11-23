import { Component, inject } from '@angular/core';
import { AsistentePasosAccionesComponente } from '@compartido/componentes/asistente-pasos-acciones/asistente-pasos-acciones.componente';
import { AsistentePasosComponente, IPasoAsistente } from '@compartido/componentes/asistente-pasos/asistente-pasos.componente';
import { EncabezadoPaginaComponente } from '@compartido/componentes/encabezado-pagina/encabezado-pagina.componente';
import { CombinacionesComponente } from '@funcionalidades/ingenieria-producto/componentes/combinaciones/combinaciones.componente';
import { CorridasEquivalenciasComponente } from '@funcionalidades/ingenieria-producto/componentes/corridas-equivalencias/corridas-equivalencias.componente';
import { DatosGeneralesComponente } from '@funcionalidades/ingenieria-producto/componentes/datos-generales/datos-generales.componente';
import { PiezasConsumosComponente } from '@funcionalidades/ingenieria-producto/componentes/piezas-consumos/piezas-consumos.componente';
import { RevisionLiberacionComponente } from '@funcionalidades/ingenieria-producto/componentes/revision-liberacion/revision-liberacion.componente';
import { AsistenteNuevoProductoStore } from '@funcionalidades/ingenieria-producto/stores/asistente-nuevo-producto.store';
import { AvisosServicio } from '@nucleo/servicios/aviso.servicio';
import { BreadcrumbServicio } from '@nucleo/servicios/breadcrumb.servicio';

interface EncabezadoPaso {
  titulo: string;
  descripcion: string;
}

@Component({
  selector: 'app-nuevo-producto-pagina',
  imports: [
    AsistentePasosComponente,
    AsistentePasosAccionesComponente,
    EncabezadoPaginaComponente,
    DatosGeneralesComponente,
    CorridasEquivalenciasComponente,
    PiezasConsumosComponente,
    CombinacionesComponente,
    RevisionLiberacionComponente,
  ],
  providers: [AsistenteNuevoProductoStore],
  templateUrl: './nuevo-producto.pagina.html',
})
export class NuevoProductoPagina {
  private readonly breadcrumb = inject(BreadcrumbServicio);
  private readonly avisos = inject(AvisosServicio);
  private readonly wizard = inject(AsistenteNuevoProductoStore);

  readonly pasos: IPasoAsistente[] = [
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
    this.breadcrumb.configurar([
      {
        llave: 'product-engineering',
        etiqueta: 'Ingeniería de producto',
        ruta: '/app/product-engineering/new-product',
        deshabilitado: true,
      },
      { llave: 'new-product', etiqueta: 'Nuevo producto', deshabilitado: true },
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
    //   this.avisos.advertencia(
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
    this.avisos.exito(
      'Borrador guardado',
      'Puedes retomar este modelo más tarde desde Ingeniería de producto.',
    );
  }
}

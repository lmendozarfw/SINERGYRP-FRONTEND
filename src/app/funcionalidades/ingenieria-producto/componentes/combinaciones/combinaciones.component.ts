import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PIcon } from '@primeicons/angular';
import { SortIcon, Table, TableHeaderCheckbox, TableCheckbox } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Drawer } from 'primeng/drawer';

import { BreadcrumbServicio } from '../../../../nucleo/servicios/breadcrumb.servicio';
import { ToastService } from '../../../../nucleo/servicios/toast.servicio';
import { BulkActionsBarComponent } from '../../../../compartido/componentes/bulk-actions-bar/bulk-actions-bar.component';
import {
  AtributoCombinacion,
  Combinacion,
  MaterialAsignado,
  OpcionSelectSimple,
  PiezaCombinacion,
} from '../../modelos/combinacion';
import { AtributosCombinacionComponent } from './atributos-combinacion/atributos-combinacion.component';
import { MaterialesCombinacionComponent } from './materiales-combinacion/materiales-combinacion.component';
import { PasoDrawer, PasosDrawerComponent } from './pasos-drawer/pasos-drawer.component';
@Component({
  selector: 'app-combinaciones',
  imports: [
    DatePipe,
    FormsModule,
    SortIcon,
    Table,
    TableHeaderCheckbox,
    TableCheckbox,
    Tag,
    Drawer,
    BulkActionsBarComponent,
    AtributosCombinacionComponent,
    MaterialesCombinacionComponent,
    PasosDrawerComponent,
    PIcon
  ],
  templateUrl: './combinaciones.component.html',
  styleUrl: './combinaciones.component.scss',
})
export class CombinacionesComponent {
  private readonly breadcrumb = inject(BreadcrumbServicio);
  private readonly toast = inject(ToastService);

  private readonly atributosStep = viewChild(AtributosCombinacionComponent);
  private readonly materialesStep = viewChild(MaterialesCombinacionComponent);
  private readonly pasosDrawer = viewChild(PasosDrawerComponent);

  readonly drawerVisible = signal(false);
  readonly pasoActual = signal(1);
  readonly seleccion = signal<Combinacion[]>([]);
  readonly terminoBusqueda = signal('');
  readonly valoresAtributos = signal<Record<string, string>>({});
  readonly materiales = signal<MaterialAsignado[]>([]);
  readonly combinaciones = signal<Combinacion[]>([]);
  readonly combinacionEditando = signal<Combinacion | null>(null);

  readonly pasos: PasoDrawer[] = [
    { id: 1, titulo: 'Atributos', descripcion: 'Define la combinación' },
    { id: 2, titulo: 'Materiales', descripcion: 'Asigna por pieza' },
  ];

  readonly atributos: AtributoCombinacion[] = [
    {
      id: 'color',
      nombre: 'Color',
      opciones: [
        { label: 'Negro', value: 'NEG', codigo: 'NEG' },
        { label: 'Blanco', value: 'BLA', codigo: 'BLA' },
        { label: 'Azul marino', value: 'AZM', codigo: 'AZM' },
        { label: 'Rojo', value: 'ROJ', codigo: 'ROJ' },
        { label: 'Beige', value: 'BEI', codigo: 'BEI' },
      ],
    },
    {
      id: 'suela',
      nombre: 'Suela',
      opciones: [
        { label: 'Caucho', value: 'CAU', codigo: 'CAU' },
        { label: 'EVA', value: 'EVA', codigo: 'EVA' },
        { label: 'Piel', value: 'PIE', codigo: 'PIE' },
        { label: 'TPR', value: 'TPR', codigo: 'TPR' },
      ],
    },
    {
      id: 'forro',
      nombre: 'Forro',
      opciones: [
        { label: 'Textil', value: 'TXT', codigo: 'TXT' },
        { label: 'Piel sintética', value: 'PSI', codigo: 'PSI' },
        { label: 'Malla', value: 'MAL', codigo: 'MAL' },
      ],
    },
    {
      id: 'herraje',
      nombre: 'Herraje',
      opciones: [
        { label: 'Plata', value: 'PLA', codigo: 'PLA' },
        { label: 'Oro', value: 'ORO', codigo: 'ORO' },
        { label: 'Negro', value: 'NEG', codigo: 'NEG' },
        { label: 'Sin herraje', value: 'NAD', codigo: 'NAD' },
      ],
    },
  ];

  readonly piezas: PiezaCombinacion[] = [
    { id: 'corte', nombre: 'Corte principal' },
    { id: 'forro', nombre: 'Forro interior' },
    { id: 'plantilla', nombre: 'Plantilla' },
    { id: 'suela', nombre: 'Suela' },
    { id: 'contrafuerte', nombre: 'Contrafuerte' },
    { id: 'herraje', nombre: 'Herraje' },
  ];

  readonly opcionesMateriales: OpcionSelectSimple[] = [
    { label: 'Piel vacuna', value: 'Piel vacuna' },
    { label: 'Piel sintética', value: 'Piel sintética' },
    { label: 'Textil', value: 'Textil' },
    { label: 'EVA', value: 'EVA' },
    { label: 'Caucho', value: 'Caucho' },
    { label: 'Espuma', value: 'Espuma' },
    { label: 'Cartón', value: 'Cartón' },
    { label: 'Metal', value: 'Metal' },
  ];

  readonly opcionesFiltroAtributo: OpcionSelectSimple[] = [
    { label: 'Todas las combinaciones', value: 'todas' },
    { label: 'Con versión activa', value: 'activas' },
  ];

  readonly codigoGenerado = computed(() => {
    const partes = this.atributos.map((atributo) => {
      const value = this.valoresAtributos()[atributo.id];
      return atributo.opciones.find((opcion) => opcion.value === value)?.codigo ?? '---';
    });

    return `RDX-${partes.join('-')}`;
  });

  readonly combinacionesFiltradas = computed(() => {
    const termino = this.terminoBusqueda().trim().toLowerCase();
    if (!termino) {
      return this.combinaciones();
    }

    return this.combinaciones().filter((combinacion) =>
      combinacion.codigo.toLowerCase().includes(termino),
    );
  });

  readonly esPasoUno = computed(() => this.pasoActual() === 1);
  readonly esUltimoPaso = computed(() => this.pasoActual() === this.pasos.length);

  constructor() {
    this.breadcrumb.configurar([
      { llave: 'product-engineering', etiqueta: 'Ingeniería de producto', ruta: '/app/product-engineering/new-product', deshabilitado: true },
      { llave: 'combinaciones', etiqueta: 'Combinaciones', deshabilitado: true },
    ]);
  }

  abrirDrawer(): void {
    this.reiniciarFormulario();
    this.drawerVisible.set(true);
  }

  cerrarDrawer(): void {
    this.drawerVisible.set(false);
  }

  cambiarPaso(paso: number): void {
    if (paso < this.pasoActual()) {
      this.pasoActual.set(paso);
    }
  }

  actualizarValores(valores: Record<string, string>): void {
    this.valoresAtributos.set(valores);
    this.pasosDrawer()?.desmarcarDesde(1);
  }

  actualizarMateriales(materiales: MaterialAsignado[]): void {
    this.materiales.set(materiales);
    this.pasosDrawer()?.desmarcarDesde(2);
  }

  continuar(): void {
    if (this.esPasoUno()) {
      // if (!this.atributosStep()?.validar()) {
      //   return;
      // }

      this.pasosDrawer()?.marcarCompletado(1);
      this.pasoActual.set(2);
      return;
    }

    if (!this.materialesStep()?.validar()) {
      return;
    }

    this.guardarCombinacion();
  }

  regresar(): void {
    if (this.esPasoUno()) {
      return;
    }

    this.pasoActual.set(1);
  }

  editar(combinacion: Combinacion): void {
    this.reiniciarFormulario();
    this.combinacionEditando.set(combinacion);
    this.valoresAtributos.set({ ...combinacion.atributos });
    this.materiales.set(
      (combinacion.versiones[0]?.materiales ?? []).map((material) => ({ ...material })),
    );
    this.pasoActual.set(1);
    this.drawerVisible.set(true);
  }

  limpiarSeleccion(): void {
    this.seleccion.set([]);
  }

  eliminar(combinacion: Combinacion): void {
    this.combinaciones.update((items) => items.filter((item) => item.id !== combinacion.id));
    this.seleccion.update((items) => items.filter((item) => item.id !== combinacion.id));
    this.toast.info('Combinación eliminada', combinacion.codigo);
  }

  etiquetaAtributo(combinacion: Combinacion, atributoId: string): string {
    return combinacion.etiquetaAtributos[atributoId] ?? '—';
  }

  etiquetaMaterial(combinacion: Combinacion, piezaId: string): string {
    const material = combinacion.versiones[0]?.materiales.find(
      (item) => item.piezaId === piezaId,
    );
    return material?.material ?? '—';
  }

  private guardarCombinacion(): void {
    const ahora = new Date();
    const combinacionAnterior = this.combinacionEditando();
    const etiquetas: Record<string, string> = {};

    for (const atributo of this.atributos) {
      const value = this.valoresAtributos()[atributo.id];
      etiquetas[atributo.id] =
        atributo.opciones.find((opcion) => opcion.value === value)?.label ?? value;
    }

    const version: Combinacion['versiones'][number] = {
      id: `v-${ahora.getTime()}`,
      numero: (combinacionAnterior?.versiones.length ?? 0) + 1,
      materiales: this.materiales().map((material) => ({ ...material })),
      fechaRegistro: ahora,
    };

    if (combinacionAnterior) {
      this.combinaciones.update((items) =>
        items.map((item) =>
          item.id === combinacionAnterior.id
            ? {
                ...item,
                atributos: { ...this.valoresAtributos() },
                etiquetaAtributos: etiquetas,
                codigo: this.codigoGenerado(),
                versiones: [version, ...item.versiones],
                versionActual: version.numero,
                fechaModificacion: ahora,
              }
            : item,
        ),
      );
      this.toast.success(
        'Nueva versión creada',
        `${this.codigoGenerado()} · Versión ${version.numero}`,
      );
    } else {
      const combinacion: Combinacion = {
        id: `c-${ahora.getTime()}`,
        codigo: this.codigoGenerado(),
        atributos: { ...this.valoresAtributos() },
        etiquetaAtributos: etiquetas,
        versionActual: 1,
        versiones: [version],
        fechaRegistro: ahora,
        fechaModificacion: ahora,
      };

      this.combinaciones.update((items) => [combinacion, ...items]);
      this.toast.success('Combinación creada', combinacion.codigo);
    }

    this.pasosDrawer()?.marcarCompletado(2);
    this.cerrarDrawer();
  }

  private reiniciarFormulario(): void {
    this.pasoActual.set(1);
    this.valoresAtributos.set({});
    this.materiales.set([]);
    this.combinacionEditando.set(null);
    this.atributosStep()?.reiniciarValidacion();
    this.materialesStep()?.reiniciarValidacion();
    this.pasosDrawer()?.reiniciar();
  }
}

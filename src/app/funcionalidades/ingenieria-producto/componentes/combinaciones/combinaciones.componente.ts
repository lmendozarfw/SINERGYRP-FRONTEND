import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PIcon } from '@primeicons/angular';
import { ButtonDirective } from 'primeng/button';
import { SortIcon, Table, TableHeaderCheckbox, TableCheckbox } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Drawer } from 'primeng/drawer';
import { AtributosCombinacionComponente } from './atributos-combinacion/atributos-combinacion.componente';
import { MaterialesCombinacionComponente } from './materiales-combinacion/materiales-combinacion.componente';
import { BarraAccionesMasivasComponente } from '@compartido/componentes/barra-acciones-masivas/barra-acciones-masivas.componente';
import { BreadcrumbServicio } from '@nucleo/servicios/breadcrumb.servicio';
import { AvisosServicio } from '@nucleo/servicios/aviso.servicio';
import { IAtributoCombinacion, ICombinacion, IMaterialAsignado, IPiezaCombinacion } from '@funcionalidades/ingenieria-producto/modelos/combinacion';
import { IPasoDrawer, PasosDrawerComponente } from './pasos-drawer/pasos-drawer.componente';
import { IOpcionSelector } from '@compartido/interfaces/selector.interface';
@Component({
  selector: 'app-combinaciones',
  imports: [
    DatePipe,
    FormsModule,
    ButtonDirective,
    SortIcon,
    Table,
    TableHeaderCheckbox,
    TableCheckbox,
    Tag,
    Drawer,
    BarraAccionesMasivasComponente,
    AtributosCombinacionComponente,
    MaterialesCombinacionComponente,
    PasosDrawerComponente,
    PIcon
  ],
  templateUrl: './combinaciones.componente.html',
  styleUrl: './combinaciones.componente.scss',
})
export class CombinacionesComponente {
  private readonly breadcrumb = inject(BreadcrumbServicio);
  private readonly avisos = inject(AvisosServicio);

  private readonly pasoAtributos = viewChild(AtributosCombinacionComponente);
  private readonly pasoMateriales = viewChild(MaterialesCombinacionComponente);
  private readonly pasosDrawer = viewChild(PasosDrawerComponente);

  readonly drawerVisible = signal(false);
  readonly pasoActual = signal(1);
  readonly seleccion = signal<ICombinacion[]>([]);
  readonly terminoBusqueda = signal('');
  readonly valoresAtributos = signal<Record<string, string>>({});
  readonly materiales = signal<IMaterialAsignado[]>([]);
  readonly combinaciones = signal<ICombinacion[]>([]);
  readonly combinacionEditando = signal<ICombinacion | null>(null);

  readonly pasos: IPasoDrawer[] = [
    { id: 1, titulo: 'Atributos', descripcion: 'Define la combinación' },
    { id: 2, titulo: 'Materiales', descripcion: 'Asigna por pieza' },
  ];

  readonly atributos: IAtributoCombinacion[] = [
    {
      id: 'color',
      nombre: 'Color',
      opciones: [
        { etiqueta: 'Negro', valor: 'NEG', codigo: 'NEG' },
        { etiqueta: 'Blanco', valor: 'BLA', codigo: 'BLA' },
        { etiqueta: 'Azul marino', valor: 'AZM', codigo: 'AZM' },
        { etiqueta: 'Rojo', valor: 'ROJ', codigo: 'ROJ' },
        { etiqueta: 'Beige', valor: 'BEI', codigo: 'BEI' },
      ],
    },
    {
      id: 'suela',
      nombre: 'Suela',
      opciones: [
        { etiqueta: 'Caucho', valor: 'CAU', codigo: 'CAU' },
        { etiqueta: 'EVA', valor: 'EVA', codigo: 'EVA' },
        { etiqueta: 'Piel', valor: 'PIE', codigo: 'PIE' },
        { etiqueta: 'TPR', valor: 'TPR', codigo: 'TPR' },
      ],
    },
    {
      id: 'forro',
      nombre: 'Forro',
      opciones: [
        { etiqueta: 'Textil', valor: 'TXT', codigo: 'TXT' },
        { etiqueta: 'Piel sintética', valor: 'PSI', codigo: 'PSI' },
        { etiqueta: 'Malla', valor: 'MAL', codigo: 'MAL' },
      ],
    },
    {
      id: 'herraje',
      nombre: 'Herraje',
      opciones: [
        { etiqueta: 'Plata', valor: 'PLA', codigo: 'PLA' },
        { etiqueta: 'Oro', valor: 'ORO', codigo: 'ORO' },
        { etiqueta: 'Negro', valor: 'NEG', codigo: 'NEG' },
        { etiqueta: 'Sin herraje', valor: 'NAD', codigo: 'NAD' },
      ],
    },
  ];

  readonly piezas: IPiezaCombinacion[] = [
    { id: 'corte', nombre: 'Corte principal' },
    { id: 'forro', nombre: 'Forro interior' },
    { id: 'plantilla', nombre: 'Plantilla' },
    { id: 'suela', nombre: 'Suela' },
    { id: 'contrafuerte', nombre: 'Contrafuerte' },
    { id: 'herraje', nombre: 'Herraje' },
  ];

  readonly opcionesMateriales: IOpcionSelector[] = [
    { etiqueta: 'Piel vacuna', valor: 'Piel vacuna' },
    { etiqueta: 'Piel sintética', valor: 'Piel sintética' },
    { etiqueta: 'Textil', valor: 'Textil' },
    { etiqueta: 'EVA', valor: 'EVA' },
    { etiqueta: 'Caucho', valor: 'Caucho' },
    { etiqueta: 'Espuma', valor: 'Espuma' },
    { etiqueta: 'Cartón', valor: 'Cartón' },
    { etiqueta: 'Metal', valor: 'Metal' },
  ];

  readonly opcionesFiltroAtributo: IOpcionSelector[] = [
    { etiqueta: 'Todas las combinaciones', valor: 'todas' },
    { etiqueta: 'Con versión activa', valor: 'activas' },
  ];

  readonly codigoGenerado = computed(() => {
    const partes = this.atributos.map((atributo) => {
      const valor = this.valoresAtributos()[atributo.id];
      return atributo.opciones.find((opcion) => opcion.valor === valor)?.codigo ?? '---';
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

  actualizarMateriales(materiales: IMaterialAsignado[]): void {
    this.materiales.set(materiales);
    this.pasosDrawer()?.desmarcarDesde(2);
  }

  continuar(): void {
    if (this.esPasoUno()) {
      // if (!this.pasoAtributos()?.validar()) {
      //   return;
      // }

      this.pasosDrawer()?.marcarCompletado(1);
      this.pasoActual.set(2);
      return;
    }

    if (!this.pasoMateriales()?.validar()) {
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

  editar(combinacion: ICombinacion): void {
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

  eliminar(combinacion: ICombinacion): void {
    this.combinaciones.update((items) => items.filter((item) => item.id !== combinacion.id));
    this.seleccion.update((items) => items.filter((item) => item.id !== combinacion.id));
    this.avisos.informacion('Combinación eliminada', combinacion.codigo);
  }

  etiquetaAtributo(combinacion: ICombinacion, atributoId: string): string {
    return combinacion.etiquetaAtributos[atributoId] ?? '—';
  }

  etiquetaMaterial(combinacion: ICombinacion, piezaId: string): string {
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
        atributo.opciones.find((opcion) => opcion.valor === value)?.etiqueta ?? value;
    }

    const version: ICombinacion['versiones'][number] = {
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
      this.avisos.exito(
        'Nueva versión creada',
        `${this.codigoGenerado()} · Versión ${version.numero}`,
      );
    } else {
      const combinacion: ICombinacion = {
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
      this.avisos.exito('Combinación creada', combinacion.codigo);
    }

    this.pasosDrawer()?.marcarCompletado(2);
    this.cerrarDrawer();
  }

  private reiniciarFormulario(): void {
    this.pasoActual.set(1);
    this.valoresAtributos.set({});
    this.materiales.set([]);
    this.combinacionEditando.set(null);
    this.pasoAtributos()?.reiniciarValidacion();
    this.pasoMateriales()?.reiniciarValidacion();
    this.pasosDrawer()?.reiniciar();
  }
}

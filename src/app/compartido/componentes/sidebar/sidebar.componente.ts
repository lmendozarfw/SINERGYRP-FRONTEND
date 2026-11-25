import { Component, computed, inject, input, model, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { PIcon } from '@primeicons/angular';

interface ElementoNavegacion {
  id?: string;
  etiqueta: string;
  icono: string;
  ruta?: string;
  distintivo?: string;
  hijos?: ElementoNavegacion[];
}

interface SeccionNavegacion {
  titulo: string;
  elementos: ElementoNavegacion[];
}

interface ElementoEspacioTrabajo extends MenuItem {
  etiqueta: string;
  inicial: string;
  detalle: string;
}

interface AccionUsuario extends MenuItem {
  etiqueta: string;
  clave: 'perfil' | 'configuracion' | 'ayuda' | 'cerrar-sesion';
  peligro?: boolean;
}

@Component({
  selector: 'app-sidebar',
  host: { class: 'block h-full' },
  imports: [Menu, PIcon],
  template: `
    <div id="sidebarMenu" class="flex h-full w-full flex-col border-r border-ds-navy-line bg-ds-navy text-ds-on-navy">
      <div class="flex items-center gap-3 border-b border-ds-navy-line py-6"
        [class.px-4]="!estaContraido()" [class.px-2]="estaContraido()"
        [class.justify-center]="estaContraido()">
        <img
          src="assets/imagenes/isotipo-sinergy.png"
          alt="Sinergy"
          class="size-8 shrink-0 object-contain"
        />

        @if (!estaContraido()) {
          <button
            type="button"
            class="flex min-w-0 flex-1 items-center gap-3 border-0 bg-transparent p-0 text-left text-inherit cursor-pointer focus-visible:shadow-ds-focus focus-visible:outline-none"
            (click)="menuEspacioTrabajo.toggle($event)"
          >
            <span class="min-w-0">
              <span class="block truncate text-sm font-semibold text-ds-on-navy">{{ espacioTrabajoSeleccionado() }}</span>
              <span class="block truncate text-xs leading-[18px] text-ds-navy-muted">{{ espacioTrabajoActual().detalle }}</span>
            </span>
            <svg pIcon="chevron-down" [size]="14" class="ml-auto shrink-0"></svg>
          </button>
          <p-menu
            #menuEspacioTrabajo
            class="ds-menu"
            [model]="espaciosTrabajo"
            [popup]="true"
            appendTo="body"
          >
            <ng-template #item let-item>
              <button
                [id]="item.id"
                type="button"
                class="ds-menu-item"
                [class.ds-menu-item--active]="espacioTrabajoSeleccionado() === item.etiqueta"
                (click)="seleccionarEspacioTrabajo($any(item), menuEspacioTrabajo)"
              >
                <span class="ds-menu-avatar">{{ $any(item).inicial }}</span>
                <span class="ds-menu-item__content">
                  <span class="ds-menu-item__title">{{ item.etiqueta }}</span>
                  <span class="ds-menu-item__subtitle">{{ $any(item).detalle }}</span>
                </span>
                @if (espacioTrabajoSeleccionado() === item.etiqueta) {
                  <svg pIcon="check" [size]="16" class="ds-menu-item__check"></svg>
                }
              </button>
            </ng-template>
          </p-menu>
        }
      </div>

      <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-color:var(--ds-navy-line)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-ds-navy-line [&::-webkit-scrollbar-track]:bg-transparent">
        @for (seccion of secciones(); track seccion.titulo) {
        @if (!estaContraido()) {
          <p class="px-4 pt-6 pb-2 text-xs font-semibold leading-[18px] tracking-[0.08em] text-ds-navy-muted uppercase">{{ seccion.titulo }}</p>
        } @else {
          <div class="h-4"></div>
        }

        <nav class="flex flex-col gap-1 px-3" [attr.aria-label]="'Navegación: ' + seccion.titulo">
          @for (elemento of seccion.elementos; track elemento.etiqueta) {
            @if (elemento.hijos?.length) {
              <button
                [id]="elemento.id"
                type="button"
                class="flex h-11 w-full items-center gap-3 rounded-md border-0 bg-transparent text-left text-sm font-medium text-ds-navy-muted transition-colors hover:bg-ds-navy-hover hover:text-ds-on-navy focus-visible:shadow-ds-focus focus-visible:outline-none data-[active=true]:bg-ds-primary data-[active=true]:text-ds-on-primary data-[active=true]:hover:bg-ds-primary-hover"
                [class.px-3]="!estaContraido()" [class.px-0]="estaContraido()"
                [class.justify-center]="estaContraido()"
                [attr.data-active]="estaElementoActivo(elemento) ? 'true' : null"
                [attr.aria-expanded]="estaSubmenuAbierto(elemento.etiqueta)"
                [attr.title]="elemento.etiqueta"
                (click)="alternarSubmenu(elemento.etiqueta)"
              >
                <svg [pIcon]="elemento.icono" [size]="16" class="shrink-0"></svg>
                @if (!estaContraido()) {
                  <span class="truncate">{{ elemento.etiqueta }}</span>
                  @if (elemento.distintivo) {
                    <span class="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-md bg-ds-on-navy-soft px-1.5 text-xs leading-[18px] text-ds-on-navy">{{ elemento.distintivo }}</span>
                  }
                  <svg pIcon="chevron-down" [size]="12" class="ml-auto shrink-0 transition-transform" [class.rotate-180]="estaSubmenuAbierto(elemento.etiqueta)"></svg>
                }
              </button>

              @if (!estaContraido() && estaSubmenuAbierto(elemento.etiqueta)) {
                <div class="ml-9 flex flex-col gap-0.5 border-l border-ds-navy-line pl-3">
                  @for (hijo of elemento.hijos; track hijo.etiqueta) {
                    <button
                      [id]="hijo.id"
                      type="button"
                      class="flex h-9 w-full items-center gap-2 rounded-md border-0 bg-transparent px-3 text-left text-xs font-medium text-ds-navy-muted transition-colors hover:bg-ds-navy-hover hover:text-ds-on-navy focus-visible:shadow-ds-focus focus-visible:outline-none data-[active=true]:bg-ds-primary data-[active=true]:text-ds-on-primary data-[active=true]:hover:bg-ds-primary-hover"
                      [attr.data-active]="elementoActivo() === hijo.etiqueta ? 'true' : null"
                      [attr.aria-current]="elementoActivo() === hijo.etiqueta ? 'page' : null"
                      [attr.title]="hijo.etiqueta"
                      (click)="abrir(hijo)"
                    >
                      <svg [pIcon]="hijo.icono" [size]="14" class="shrink-0"></svg>
                      <span class="truncate">{{ hijo.etiqueta }}</span>
                    </button>
                  }
                </div>
              }
            } @else {
              <button
                type="button"
                class="flex h-11 w-full items-center gap-3 rounded-md border-0 bg-transparent text-left text-sm font-medium text-ds-navy-muted transition-colors hover:bg-ds-navy-hover hover:text-ds-on-navy focus-visible:shadow-ds-focus focus-visible:outline-none data-[active=true]:bg-ds-primary data-[active=true]:text-ds-on-primary data-[active=true]:hover:bg-ds-primary-hover"
                [class.px-3]="!estaContraido()" [class.px-0]="estaContraido()"
                [class.justify-center]="estaContraido()"
                [attr.data-active]="elementoActivo() === elemento.etiqueta ? 'true' : null"
                [attr.aria-current]="elementoActivo() === elemento.etiqueta ? 'page' : null"
                [attr.title]="elemento.etiqueta"
                (click)="abrir(elemento)"
              >
                <svg [pIcon]="elemento.icono" [size]="16" class="shrink-0"></svg>
                @if (!estaContraido()) {
                  <span class="truncate">{{ elemento.etiqueta }}</span>
                  @if (elemento.distintivo) {
                    <span class="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-md bg-ds-on-navy-soft px-1.5 text-xs leading-[18px] text-ds-on-navy">{{ elemento.distintivo }}</span>
                  }
                }
              </button>
            }
          }
        </nav>

        @if (!$last) {
          <div class="mx-3 my-4 h-px bg-ds-navy-line"></div>
        }
        }
      </div>

      <div class="border-t border-ds-navy-line px-4 py-4 text-xs leading-[18px] text-ds-navy-muted">
        <button type="button" class="group flex w-full cursor-pointer items-center gap-3 border-0 bg-transparent p-0 text-left text-ds-on-navy focus-visible:shadow-ds-focus focus-visible:outline-none" (click)="menuUsuario.toggle($event)">
          <span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-ds-primary-strong text-xs font-semibold text-ds-on-navy">LM</span>
          @if (!estaContraido()) {
            <span class="min-w-0">
              <span class="block truncate text-ds-on-navy">Luis Mendoza</span>
              <span class="block truncate text-ds-navy-muted group-hover:text-ds-on-navy">Empleado · #5366</span>
            </span>
            <svg pIcon="ellipsis-v" [size]="16" class="ml-auto shrink-0"></svg>
          }
        </button>
        <p-menu
          #menuUsuario
          class="ds-menu ds-menu--user"
          [model]="accionesUsuario"
          [popup]="true"
          appendTo="body"
        >
          <ng-template #item let-item>
            <button
              type="button"
              class="ds-menu-item"
              [class.ds-menu-item--danger]="$any(item).peligro"
              (click)="manejarAccionUsuario($any(item), menuUsuario)"
            >
              <span class="ds-menu-item__icon">
                <svg [pIcon]="$any(item).key" [size]="16"></svg>
              </span>
              <span class="ds-menu-item__title">{{ item.etiqueta }}</span>
            </button>
          </ng-template>
        </p-menu>
      </div>
    </div>
  `,
})
export class SidebarComponente {
  readonly movil = input(false);
  readonly contraido = model(false);
  readonly navegar = output<void>();

  readonly estaContraido = computed(() => this.contraido() && !this.movil());
  readonly elementoActivo = signal('Inicio');
  readonly espacioTrabajoSeleccionado = signal('SINERGYERP');
  readonly elementosExpandidos = signal<ReadonlySet<string>>(new Set<string>());

  readonly elementosPrincipales: ElementoNavegacion[] = [
    { id: "inicio", etiqueta: 'Inicio', icono: 'home', ruta: '/app/inicio' },
    {
      id: "ventasPedidos",
      etiqueta: 'Ventas y pedidos',
      icono: 'shopping-cart',
      hijos: [
        { id: "pedidos", etiqueta: 'Pedidos', icono: 'receipt', ruta: '/app/configuration' },
        { etiqueta: 'Cotizaciones', icono: 'file', ruta: '/app/configuration' },
        { etiqueta: 'Clientes', icono: 'users', ruta: '/app/clientes' },
        { etiqueta: 'Facturación', icono: 'file', ruta: '/app/clientes' },
        { etiqueta: 'Devoluciones', icono: 'undo', ruta: '/app/configuration' },
      ],
    },
    {
      etiqueta: 'Producción',
      icono: 'hammer',
      hijos: [
        { etiqueta: 'Órdenes de producción', icono: 'clipboard', ruta: '/app/configuration' },
        { etiqueta: 'Programación', icono: 'calendar', ruta: '/app/configuration' },
        { etiqueta: 'Control de calidad', icono: 'shield', ruta: '/app/configuration' },
        { etiqueta: 'Registro de mermas', icono: 'box', ruta: '/app/configuration' },
        { etiqueta: 'Tiempos y operarios', icono: 'clock', ruta: '/app/configuration' },
      ],
    },
    {
      etiqueta: 'Ingeniería de producto',
      icono: 'wrench',
      hijos: [
        { etiqueta: 'Nuevo producto', icono: 'file-plus', ruta: '/app/ingenieria-producto/nuevo-producto' },
        { etiqueta: 'Modelos y colecciones', icono: 'palette', ruta: '/app/configuration' },
        { etiqueta: 'Materiales y combinaciones', icono: 'box', ruta: '/app/configuration' },
        { etiqueta: 'Corridas y tallajes', icono: 'list-ol', ruta: '/app/configuration' },
        { etiqueta: 'Fichas técnicas', icono: 'file', ruta: '/app/configuration' },
      ],
    },
    { etiqueta: 'Diseño y desarrollo', icono: 'inbox', ruta: '/app/configuration', distintivo: '3' },
    {
      etiqueta: 'Inventarios y almacenes',
      icono: 'warehouse',
      hijos: [
        { etiqueta: 'Stock por almacén', icono: 'box', ruta: '/app/configuration' },
        { etiqueta: 'Movimientos', icono: 'sync', ruta: '/app/configuration' },
        { etiqueta: 'Recepciones', icono: 'truck', ruta: '/app/configuration' },
        { etiqueta: 'Transferencias', icono: 'truck', ruta: '/app/configuration' },
        { etiqueta: 'Conteos físicos', icono: 'clipboard', ruta: '/app/configuration' },
      ],
    },
    {
      etiqueta: 'Compras y proveedores',
      icono: 'shopping-cart',
      hijos: [
        { etiqueta: 'Solicitudes de compra', icono: 'file', ruta: '/app/configuration' },
        { etiqueta: 'Órdenes de compra', icono: 'receipt', ruta: '/app/configuration' },
        { etiqueta: 'Recepción de mercancía', icono: 'truck', ruta: '/app/configuration' },
        { etiqueta: 'Proveedores', icono: 'users', ruta: '/app/proveedores' },
        { etiqueta: 'Facturas de proveedores', icono: 'file', ruta: '/app/cuentas-por-pagar' },
      ],
    },
    {
      etiqueta: 'Tesorería',
      icono: 'wallet',
      hijos: [
        { etiqueta: 'Catálogos', icono: 'list', ruta: '/app/tesoreria/catalogos' },
        { etiqueta: 'Cuentas por cobrar', icono: 'wallet', ruta: '/app/cuentas-por-cobrar' },
        { etiqueta: 'Cuentas por pagar', icono: 'credit-card', ruta: '/app/cuentas-por-pagar' },
        { etiqueta: 'Bancos y conciliación', icono: 'credit-card', ruta: '/app/configuration' },
        { etiqueta: 'Pagos y cobros', icono: 'money-bill', ruta: '/app/configuration' },
        { etiqueta: 'Facturas', icono: 'receipt', ruta: '/app/clientes' },
        { etiqueta: 'Aplicaciones de cobros', icono: 'credit-card', ruta: '/app/clientes' },
      ],
    },
    {
      etiqueta: 'Reportes',
      icono: 'chart-bar',
      hijos: [
        { etiqueta: 'Ventas', icono: 'chart-line', ruta: '/app/configuration' },
        { etiqueta: 'Producción', icono: 'chart-bar', ruta: '/app/configuration' },
        { etiqueta: 'Inventarios', icono: 'warehouse', ruta: '/app/configuration' },
        { etiqueta: 'Financieros', icono: 'dollar', ruta: '/app/configuration' },
        { etiqueta: 'Dashboard ejecutivo', icono: 'th-large', ruta: '/app/configuration' },
      ],
    },
    { etiqueta: 'Búsquedas', icono: 'search', ruta: '/app/configuration' },
  ];

  readonly elementosAdministrativos: ElementoNavegacion[] = [
    {
      etiqueta: 'Recursos humanos',
      icono: 'users',
      hijos: [
        { etiqueta: 'Empleados', icono: 'user', ruta: '/app/configuration' },
        { etiqueta: 'Asistencias', icono: 'calendar', ruta: '/app/configuration' },
        { etiqueta: 'Nóminas', icono: 'money-bill', ruta: '/app/configuration' },
        { etiqueta: 'Vacaciones', icono: 'calendar', ruta: '/app/configuration' },
        { etiqueta: 'Capacitación', icono: 'book', ruta: '/app/configuration' },
      ],
    },
    {
      etiqueta: 'Administración',
      icono: 'briefcase',
      hijos: [
        { etiqueta: 'Usuarios y roles', icono: 'user', ruta: '/app/configuration' },
        { etiqueta: 'Permisos', icono: 'key', ruta: '/app/configuration' },
        { etiqueta: 'Parámetros', icono: 'sliders-h', ruta: '/app/configuration' },
        { etiqueta: 'Sucursales', icono: 'building', ruta: '/app/configuration' },
        { etiqueta: 'Calendario laboral', icono: 'calendar', ruta: '/app/configuration' },
      ],
    },
    {
      etiqueta: 'Seguridad',
      icono: 'shield',
      hijos: [
        { etiqueta: 'Auditoría', icono: 'eye', ruta: '/app/configuration' },
        { etiqueta: 'Respaldos', icono: 'sync', ruta: '/app/configuration' },
        { etiqueta: 'Políticas de acceso', icono: 'lock', ruta: '/app/configuration' },
      ],
    },
    {
      etiqueta: 'Documentos',
      icono: 'file',
      hijos: [
        { etiqueta: 'Expedientes', icono: 'file', ruta: '/app/configuration' },
        { etiqueta: 'Contratos', icono: 'file', ruta: '/app/configuration' },
        { etiqueta: 'Manuales', icono: 'book', ruta: '/app/configuration' },
      ],
    },
  ];

  readonly elementosSecundarios: ElementoNavegacion[] = [
    {
      etiqueta: 'Configuración',
      icono: 'cog',
      hijos: [
        {
          etiqueta: 'Unidades de negocio',
          icono: 'building',
          ruta: '/app/configuracion/unidades-negocio',
        },
      ],
    },
    { etiqueta: 'Componentes', icono: 'question-circle', ruta: '/design-system' },
    { etiqueta: 'Ayuda', icono: 'question-circle', ruta: '/design-system' },
  ];

  readonly espaciosTrabajo: ElementoEspacioTrabajo[] = [
    { etiqueta: 'SINERGYERP', inicial: 'S', detalle: 'Nave 1-2-3 · Corporativo' },
    { etiqueta: 'Sucursal Norte', inicial: 'SN', detalle: 'Planta de producción norte' },
    { etiqueta: 'Sucursal Sur', inicial: 'SS', detalle: 'Planta de producción sur' },
    { etiqueta: 'Almacén Central', inicial: 'AC', detalle: 'Inventario y distribución' },
  ];

  readonly accionesUsuario: AccionUsuario[] = [
    { etiqueta: 'Mi perfil', clave: 'perfil' },
    { etiqueta: 'Configuración', clave: 'configuracion' },
    { etiqueta: 'Ayuda', clave: 'ayuda' },
    { etiqueta: 'Cerrar sesión', clave: 'cerrar-sesion', peligro: true },
  ];

  readonly secciones = computed<SeccionNavegacion[]>(() => [
    { titulo: 'Principal', elementos: this.elementosPrincipales },
    { titulo: 'Administración', elementos: this.elementosAdministrativos },
    { titulo: 'Sistema', elementos: this.elementosSecundarios },
  ]);

  readonly espacioTrabajoActual = computed(
    () =>
      this.espaciosTrabajo.find((espacio) => espacio.etiqueta === this.espacioTrabajoSeleccionado()) ??
      this.espaciosTrabajo[0],
  );

  private readonly router = inject(Router);

  estaSubmenuAbierto(titulo: string): boolean {
    return this.elementosExpandidos().has(titulo);
  }

  estaElementoActivo(elemento: ElementoNavegacion): boolean {
    return (
      this.elementoActivo() === elemento.etiqueta ||
      !!elemento.hijos?.some((hijo) => hijo.etiqueta === this.elementoActivo())
    );
  }

  alternarSubmenu(titulo: string): void {
    const siguientes = new Set(this.elementosExpandidos());
    if (siguientes.has(titulo)) {
      siguientes.delete(titulo);
    } else {
      siguientes.add(titulo);
    }
    this.elementosExpandidos.set(siguientes);
  }

  abrir(elemento: ElementoNavegacion): void {
    this.elementoActivo.set(elemento.etiqueta);
    if (elemento.ruta) {
      void this.router.navigateByUrl(elemento.ruta);
    }
    this.navegar.emit();
  }

  seleccionarEspacioTrabajo(espacio: ElementoEspacioTrabajo, menu: Menu): void {
    this.espacioTrabajoSeleccionado.set(espacio.etiqueta ?? '');
    menu.hide();
    this.navegar.emit();
  }

  manejarAccionUsuario(accion: AccionUsuario, menu: Menu): void {
    menu.hide();
    this.navegar.emit();
    switch (accion.clave) {
      case 'perfil':
      case 'configuracion':
        void this.router.navigateByUrl('/app/configuracion');
        break;
      case 'ayuda':
        void this.router.navigateByUrl('/design-system');
        break;
      case 'cerrar-sesion':
        void this.router.navigateByUrl('/auth/inicio-sesion');
        break;
    }
  }
}

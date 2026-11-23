import { computed, Injectable, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';

export interface ElementoBreadcrumb {
  llave?: string;
  etiqueta: string;
  ruta?: string | unknown[];
  url?: string;
  icono?: string;
  deshabilitado?: boolean;
  visible?: boolean;
  accion?: () => void;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbServicio {
  private readonly estado = signal<ElementoBreadcrumb[]>([]);
  private readonly estadoInicio = signal<ElementoBreadcrumb | null>({
    llave: 'home',
    etiqueta: '',
    ruta: '/app/clientes',
  });

  readonly items = this.estado.asReadonly();
  readonly inicio = this.estadoInicio.asReadonly();

  private readonly visibleItems = computed(() =>
    this.estado().filter((elemento) => elemento.visible !== false),
  );

  readonly menuItems = computed<MenuItem[]>(() =>
    this.visibleItems().map((item) => this.aElementoMenu(item)),
  );

  readonly inicioMenu = computed<MenuItem | undefined>(() => {
    const inicio = this.inicio();
    return inicio && inicio.visible !== false ? this.aElementoMenu(inicio) : undefined;
  });

  configurar(elementos: readonly ElementoBreadcrumb[]): void {
    this.estado.set(elementos.map((elemento) => this.normalizar(elemento)));
  }

  agregar(elemento: ElementoBreadcrumb): void {
    this.estado.update((items) => [...items, this.normalizar(elemento)]);
  }

  remover(clave: string): void {
    this.estado.update((elementos) => elementos.filter((elemento) => this.keyOf(elemento) !== clave));
  }

  actualizar(clave: string, parcial: Partial<ElementoBreadcrumb>): void {
    this.estado.update((elementos) =>
      elementos.map((elemento) =>
        this.keyOf(elemento) === clave ? this.normalizar({ ...elemento, ...parcial }) : elemento,
      ),
    );
  }

  configurarVisibilidad(clave: string, visible: boolean): void {
    this.actualizar(clave, { visible });
  }

  configurarDeshabilitacion(clave: string, deshabilitado: boolean): void {
    this.actualizar(clave, { deshabilitado });
  }

  bloquear(clave: string): void {
    this.configurarDeshabilitacion(clave, true);
  }

  desbloquear(clave: string): void {
    this.configurarDeshabilitacion(clave, false);
  }

  limpiar(): void {
    this.estado.set([]);
  }

  configurarElementoInicio(item: ElementoBreadcrumb | null): void {
    this.estadoInicio.set(item ? this.normalizar(item) : null);
  }

  private aElementoMenu(item: ElementoBreadcrumb): MenuItem {
    const disabled = item.deshabilitado === true;
    return {
      label: item.etiqueta,
      icon: item.icono,
      disabled,
      ...(disabled
        ? {}
        : {
            routerLink: item.ruta,
            url: item.url,
            command: item.accion ? () => item.accion?.() : undefined,
          }),
    };
  }

  private keyOf(item: ElementoBreadcrumb): string {
    return item.llave ?? item.etiqueta;
  }

  private normalizar(elemento: ElementoBreadcrumb): ElementoBreadcrumb {
    return { ...elemento, llave: this.keyOf(elemento) };
  }
}

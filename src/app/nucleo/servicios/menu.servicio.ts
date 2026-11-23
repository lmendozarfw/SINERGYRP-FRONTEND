import { computed, Injectable, signal } from '@angular/core';

export interface ElementoMenu {
  clave: string;
  etiqueta: string;
  icono?: string;
  ruta?: string;
  visible?: boolean;
  deshabilitado?: boolean;
  rolesPermitidos?: string | string[] | null | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class MenuServicio {
  private readonly todosLosElementos = signal<ElementoMenu[]>([
    {
      clave: 'dashboard',
      etiqueta: 'Panel',
      icono: 'dashboard',
      ruta: '/o/dashboard',
      rolesPermitidos: [],
    },
    {
      clave: 'authorization-codes',
      etiqueta: 'Códigos de autorización',
      icono: 'safety',
      ruta: '/o/authorization-codes',
      rolesPermitidos: [],
    },
    {
      clave: 'registers',
      etiqueta: 'Bitácora de defectos',
      icono: 'solution',
      ruta: '/o/inspection-logs',
      rolesPermitidos: [],
    },
    {
      clave: 'report',
      etiqueta: 'Reportes',
      icono: 'bar-chart',
      ruta: '/o/reports',
      rolesPermitidos: [],
    },
    {
      clave: 'settings',
      etiqueta: 'Configuración',
      icono: 'setting',
      ruta: '/o/settings',
      rolesPermitidos: [],
    },
    {
      clave: 'users',
      etiqueta: 'Usuarios',
      icono: 'user',
      ruta: '/o/users',
      rolesPermitidos: [],
    },
  ]);

  readonly elementos = computed<ElementoMenu[]>(() => this.todosLosElementos());

  establecerElementos(elementos: ElementoMenu[]): void {
    this.todosLosElementos.set(elementos);
  }

  agregarElemento(elemento: ElementoMenu): void {
    this.todosLosElementos.update((elementos) => [...elementos, elemento]);
  }

  eliminarElemento(clave: string): void {
    this.todosLosElementos.update((elementos) => elementos.filter((elemento) => elemento.clave !== clave));
  }

  actualizarElemento(clave: string, cambios: Partial<ElementoMenu>): void {
    this.todosLosElementos.update((elementos) =>
      elementos.map((elemento) => (elemento.clave === clave ? { ...elemento, ...cambios } : elemento))
    );
  }

  establecerVisible(clave: string, visible: boolean): void {
    this.actualizarElemento(clave, { visible });
  }

  establecerDeshabilitado(clave: string, deshabilitado: boolean): void {
    this.actualizarElemento(clave, { deshabilitado });
  }
}

import { Component, inject } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadcrumbServicio } from '../../../nucleo/servicios/breadcrumb.servicio';

@Component({
  selector: 'app-breadcrumb',
  imports: [BreadcrumbModule],
  template: `
    <p-breadcrumb
      styleClass="ds-breadcrumb"
      [model]="breadcrumb.menuItems()"
      [home]="breadcrumb.inicioMenu()"
      homeAriaLabel="Ir al inicio"
    />
  `,
  styles: [
    `
      :host {
        display: block;
        max-width: 100%;
        min-width: 0;
      }
    `,
  ],
})
export class BreadcrumbComponente {
  readonly breadcrumb = inject(BreadcrumbServicio);
}

import { Component, inject } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadcrumbService } from '../../../nucleo/servicios/breadcrumb.servicio';

@Component({
  selector: 'app-breadcrumb',
  imports: [BreadcrumbModule],
  template: `
    <p-breadcrumb
      styleClass="ds-breadcrumb"
      [model]="breadcrumb.menuItems()"
      [home]="breadcrumb.homeMenuItem()"
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
export class BreadcrumbComponent {
  readonly breadcrumb = inject(BreadcrumbService);
}

import { Component } from '@angular/core';
import { Tags } from '@primeicons/angular';

@Component({
  selector: 'app-piezas-consumos',
  imports: [Tags],
  template: `
    <div class="ds-card flex items-start gap-4">
      <span
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--ds-primary-soft)] text-[var(--ds-primary)]"
      >
        <svg data-p-icon="tags" [size]="20"></svg>
      </span>
      <div class="min-w-0">
        <h3 class="ds-title-card">Piezas y consumos</h3>
        <p class="ds-body mt-1 text-[var(--ds-text-muted)]">
          Esta sección se encuentra en construcción. Pronto podrás definir las piezas del
          modelo y sus consumos por corrida.
        </p>
      </div>
    </div>
  `,
})
export class PiezasConsumosComponent {}

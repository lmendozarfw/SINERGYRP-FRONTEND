import { Component } from '@angular/core';
import { CheckCircle } from '@primeicons/angular';

@Component({
  selector: 'app-revision-liberacion',
  imports: [CheckCircle],
  template: `
    <div class="ds-card flex items-start gap-4">
      <span
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--ds-primary-soft)] text-[var(--ds-primary)]"
      >
        <svg data-p-icon="check-circle" [size]="20"></svg>
      </span>
      <div class="min-w-0">
        <h3 class="ds-title-card">Revisión y liberación</h3>
        <p class="ds-body mt-1 text-[var(--ds-text-muted)]">
          Esta sección se encuentra en construcción. Pronto podrás revisar el modelo
          completo antes de liberarlo.
        </p>
      </div>
    </div>
  `,
})
export class RevisionLiberacionComponent {}

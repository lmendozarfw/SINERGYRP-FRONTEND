import { Component, input } from '@angular/core';

@Component({
  selector: 'app-encabezado-pagina',
  template: `
    <section class="flex flex-wrap items-end justify-between gap-4">
      <div class="min-w-0">
        @if (eyebrow()) {
          <p class="ds-meta uppercase tracking-widest">{{ eyebrow() }}</p>
        }

        @if (nivel() === 'h1') {
          <h1 class="ds-title-page" [class.mt-2]="!!eyebrow()" [class.mt-1]="!eyebrow()">
            {{ titulo() }}
          </h1>
        } @else {
          <h2 class="ds-title-page" [class.mt-2]="!!eyebrow()" [class.mt-1]="!eyebrow()">
            {{ titulo() }}
          </h2>
        }

        @if (descripcion()) {
          <p
            class="ds-body max-w-2xl text-ds-muted"
            [class.mt-2]="!!eyebrow()"
            [class.mt-1]="!eyebrow()"
          >
            {{ descripcion() }}
          </p>
        }
      </div>

      <ng-content />
    </section>
  `,
  host: { class: 'block' },
})
export class EncabezadoPaginaComponent {
  titulo = input.required<string>();
  descripcion = input<string>();
  eyebrow = input<string>();
  nivel = input<'h1' | 'h2'>('h2');
}

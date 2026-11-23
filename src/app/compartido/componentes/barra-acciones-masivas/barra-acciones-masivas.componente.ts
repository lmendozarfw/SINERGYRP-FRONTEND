import { Component, input, output } from '@angular/core';
import { PIcon } from '@primeicons/angular';

@Component({
  selector: 'app-barra-acciones-masivas',
  imports: [PIcon],
  host: {
    class: 'fixed bottom-7.5 left-1/2 z-60 block -translate-x-1/2',
  },
  template: `
    <div
      class="flex items-center gap-3 rounded-ds-toolbar border border-ds-on-navy-10 bg-ds-navy py-2.5 pl-3.5 pr-3 text-ds-on-navy shadow-ds-floating backdrop-blur-md"
      role="toolbar"
      aria-label="Acciones para la selección"
    >
      <div class="flex items-center gap-2.5 whitespace-nowrap" aria-live="polite">
        <span
          class="flex h-7 min-w-7 items-center justify-center rounded-full bg-ds-primary px-2 text-[13px] font-semibold tabular-nums text-ds-on-primary"
        >{{ cantidad() }}</span>
        <span class="text-[13px] font-medium text-ds-on-navy-78 max-sm:hidden">
          {{ cantidad() === 1 ? sustantivo() + ' seleccionado' : sustantivo() + 's seleccionados' }}
        </span>
      </div>

      <span class="h-6 w-px bg-ds-on-navy-soft"></span>

      <div class="flex items-center gap-1">
        <button
          type="button"
          class="barra-acciones-masivas__accion px-2.5 text-ds-on-navy-82 hover:bg-ds-on-navy-10 hover:text-ds-on-navy max-sm:w-8.5 max-sm:px-0"
          aria-label="Editar {{ sustantivo() }}s seleccionados"
          (click)="editar.emit()"
        >
          <svg pIcon="pencil" [size]="16"></svg>
          <span class="max-sm:hidden">Editar</span>
        </button>
        <button
          type="button"
          class="barra-acciones-masivas__accion px-2.5 text-ds-on-navy-82 hover:bg-ds-on-navy-10 hover:text-ds-on-navy max-sm:w-8.5 max-sm:px-0"
          aria-label="Exportar {{ sustantivo() }}s seleccionados"
          (click)="exportar.emit()"
        >
          <svg pIcon="download" [size]="16"></svg>
          <span class="max-sm:hidden">Exportar</span>
        </button>
        <button
          type="button"
          class="barra-acciones-masivas__accion px-2.5 text-ds-danger-45 hover:bg-ds-danger-18 hover:text-ds-danger-25 max-sm:w-8.5 max-sm:px-0"
          aria-label="Eliminar {{ sustantivo() }}s seleccionados"
          (click)="eliminar.emit()"
        >
          <svg pIcon="trash" [size]="16"></svg>
          <span class="max-sm:hidden">Eliminar</span>
        </button>
      </div>

      <span class="h-6 w-px bg-ds-on-navy-soft"></span>

      <button
        type="button"
        class="barra-acciones-masivas__accion w-8.5 px-0 text-ds-on-navy-60 hover:bg-ds-on-navy-10 hover:text-ds-on-navy"
        aria-label="Limpiar selección"
        (click)="limpiar.emit()"
      >
        <svg pIcon="times" [size]="16"></svg>
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        max-width: calc(100vw - 32px);
        animation: barra-acciones-masivas-entrada 180ms ease-out;
      }

      .barra-acciones-masivas__accion {
        display: inline-flex;
        height: 34px;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border: 0;
        border-radius: var(--ds-radius-input);
        background: transparent;
        font-family: var(--ds-font);
        font-size: 13px;
        font-weight: 500;
        line-height: 18px;
        cursor: pointer;
        transition: background-color 150ms ease, color 150ms ease;
      }

      .barra-acciones-masivas__accion:focus-visible {
        outline: 2px solid var(--ds-focus-ring);
        outline-offset: 2px;
      }

      @keyframes barra-acciones-masivas-entrada {
        from {
          opacity: 0;
          translate: -50% 12px;
        }
        to {
          opacity: 1;
          translate: -50% 0;
        }
      }
    `,
  ],
})
export class BarraAccionesMasivasComponente {
  readonly cantidad = input.required<number>();
  readonly sustantivo = input<string>('cliente');

  readonly editar = output<void>();
  readonly exportar = output<void>();
  readonly eliminar = output<void>();
  readonly limpiar = output<void>();
}

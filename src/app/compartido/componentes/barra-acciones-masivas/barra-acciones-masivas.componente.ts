import { Component, input, output } from '@angular/core';
import { PIcon } from '@primeicons/angular';

@Component({
  selector: 'app-barra-acciones-masivas',
  imports: [PIcon],
  template: `
    <div
      class="flex items-center gap-3 rounded-[14px] border border-[color:color-mix(in_srgb,var(--ds-on-navy)_10%,transparent)] bg-ds-navy py-2.5 pl-3.5 pr-3 text-ds-on-navy shadow-[0_18px_40px_color-mix(in_srgb,var(--ds-navy)_28%,transparent)] backdrop-blur-[12px]"
      role="toolbar"
      aria-label="Acciones para la selección"
    >
      <div class="flex items-center gap-2.5 whitespace-nowrap" aria-live="polite">
        <span
          class="flex h-7 min-w-7 items-center justify-center rounded-full bg-ds-primary px-2 text-[13px] font-semibold tabular-nums text-ds-on-primary"
        >{{ cantidad() }}</span>
        <span
          class="text-[13px] font-medium text-[color:color-mix(in_srgb,var(--ds-on-navy)_78%,transparent)] max-sm:hidden"
        >
          {{ cantidad() === 1 ? 'cliente seleccionado' : 'clientes seleccionados' }}
        </span>
      </div>

      <span class="h-6 w-px bg-ds-on-navy-soft"></span>

      <div class="flex items-center gap-1">
        <button
          type="button"
          class="inline-flex h-[34px] cursor-pointer items-center justify-center gap-2 rounded-lg border-0 bg-transparent px-2.5 font-sans text-[13px] font-medium text-[color:color-mix(in_srgb,var(--ds-on-navy)_82%,transparent)] transition-[background,color] duration-150 ease-[ease] hover:bg-[color:color-mix(in_srgb,var(--ds-on-navy)_10%,transparent)] hover:text-ds-on-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ds-focus max-sm:w-[34px] max-sm:px-0"
          aria-label="Editar clientes seleccionados"
          (click)="editar.emit()"
        >
          <svg pIcon="pencil" [size]="16"></svg>
          <span class="max-sm:hidden">Editar</span>
        </button>
        <button
          type="button"
          class="inline-flex h-[34px] cursor-pointer items-center justify-center gap-2 rounded-lg border-0 bg-transparent px-2.5 font-sans text-[13px] font-medium text-[color:color-mix(in_srgb,var(--ds-on-navy)_82%,transparent)] transition-[background,color] duration-150 ease-[ease] hover:bg-[color:color-mix(in_srgb,var(--ds-on-navy)_10%,transparent)] hover:text-ds-on-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ds-focus max-sm:w-[34px] max-sm:px-0"
          aria-label="Exportar clientes seleccionados"
          (click)="exportar.emit()"
        >
          <svg pIcon="download" [size]="16"></svg>
          <span class="max-sm:hidden">Exportar</span>
        </button>
        <button
          type="button"
          class="inline-flex h-[34px] cursor-pointer items-center justify-center gap-2 rounded-lg border-0 bg-transparent px-2.5 font-sans text-[13px] font-medium text-[color:color-mix(in_srgb,var(--ds-danger)_45%,white)] transition-[background,color] duration-150 ease-[ease] hover:bg-[color:color-mix(in_srgb,var(--ds-danger)_18%,transparent)] hover:text-[color:color-mix(in_srgb,var(--ds-danger)_25%,white)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ds-focus max-sm:w-[34px] max-sm:px-0"
          aria-label="Eliminar clientes seleccionados"
          (click)="eliminar.emit()"
        >
          <svg pIcon="trash" [size]="16"></svg>
          <span class="max-sm:hidden">Eliminar</span>
        </button>
      </div>

      <span class="h-6 w-px bg-ds-on-navy-soft"></span>

      <button
        type="button"
        class="inline-flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent p-0 font-sans text-[color:color-mix(in_srgb,var(--ds-on-navy)_60%,transparent)] transition-[background,color] duration-150 ease-[ease] hover:bg-[color:color-mix(in_srgb,var(--ds-on-navy)_10%,transparent)] hover:text-ds-on-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ds-focus"
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
        position: fixed;
        bottom: 30px;
        left: 50%;
        z-index: 60;
        display: block;
        max-width: calc(100vw - 32px);
        transform: translateX(-50%);
        animation: barra-acciones-masivas-entrada 180ms ease-out;
      }

      @keyframes barra-acciones-masivas-entrada {
        from {
          opacity: 0;
          transform: translate(-50%, 12px);
        }
        to {
          opacity: 1;
          transform: translate(-50%, 0);
        }
      }
    `,
  ],
})
export class BarraAccionesMasivasComponente {
  readonly cantidad = input.required<number>();

  readonly editar = output<void>();
  readonly exportar = output<void>();
  readonly eliminar = output<void>();
  readonly limpiar = output<void>();
}

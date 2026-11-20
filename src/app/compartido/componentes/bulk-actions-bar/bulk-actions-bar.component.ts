import { Component, input, output } from '@angular/core';
import { PIcon } from '@primeicons/angular';

@Component({
  selector: 'app-bulk-actions-bar',
  imports: [PIcon],
  template: `
    <div class="ds-bulk-bar" role="toolbar" aria-label="Acciones para la selección">
      <div class="ds-bulk-bar__count" aria-live="polite">
        <span class="ds-bulk-bar__badge">{{ count() }}</span>
        <span class="ds-bulk-bar__label">
          {{ count() === 1 ? 'cliente seleccionado' : 'clientes seleccionados' }}
        </span>
      </div>

      <span class="ds-bulk-bar__divider"></span>

      <div class="ds-bulk-bar__actions">
        <button
          type="button"
          class="ds-bulk-bar__action"
          aria-label="Editar clientes seleccionados"
          (click)="edit.emit()"
        >
          <svg pIcon="pencil" [size]="16"></svg>
          <span>Editar</span>
        </button>
        <button
          type="button"
          class="ds-bulk-bar__action"
          aria-label="Exportar clientes seleccionados"
          (click)="download.emit()"
        >
          <svg pIcon="download" [size]="16"></svg>
          <span>Exportar</span>
        </button>
        <button
          type="button"
          class="ds-bulk-bar__action ds-bulk-bar__action--danger"
          aria-label="Eliminar clientes seleccionados"
          (click)="remove.emit()"
        >
          <svg pIcon="trash" [size]="16"></svg>
          <span>Eliminar</span>
        </button>
      </div>

      <span class="ds-bulk-bar__divider"></span>

      <button
        type="button"
        class="ds-bulk-bar__close"
        aria-label="Limpiar selección"
        (click)="clear.emit()"
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
        animation: ds-bulk-bar-in 180ms ease-out;
      }

      .ds-bulk-bar {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px 10px 14px;
        border: 1px solid color-mix(in srgb, var(--ds-on-navy) 10%, transparent);
        border-radius: 14px;
        background: var(--ds-navy);
        box-shadow: 0 18px 40px color-mix(in srgb, var(--ds-navy) 28%, transparent);
        color: var(--ds-on-navy);
        backdrop-filter: blur(12px);
      }

      .ds-bulk-bar__count {
        display: flex;
        align-items: center;
        gap: 10px;
        white-space: nowrap;
      }

      .ds-bulk-bar__badge {
        display: flex;
        min-width: 28px;
        height: 28px;
        align-items: center;
        justify-content: center;
        padding: 0 8px;
        border-radius: 999px;
        background: var(--ds-primary);
        color: var(--ds-on-primary);
        font-size: 13px;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }

      .ds-bulk-bar__label {
        color: color-mix(in srgb, var(--ds-on-navy) 78%, transparent);
        font-size: 13px;
        font-weight: 500;
      }

      .ds-bulk-bar__divider {
        width: 1px;
        height: 24px;
        background: var(--ds-on-navy-soft);
      }

      .ds-bulk-bar__actions {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .ds-bulk-bar__action,
      .ds-bulk-bar__close {
        display: inline-flex;
        height: 34px;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 8px;
        background: transparent;
        color: color-mix(in srgb, var(--ds-on-navy) 82%, transparent);
        font: inherit;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition:
          background 150ms ease,
          color 150ms ease;
      }

      .ds-bulk-bar__action {
        gap: 8px;
        padding: 0 10px;
      }

      .ds-bulk-bar__action:hover {
        background: color-mix(in srgb, var(--ds-on-navy) 10%, transparent);
        color: var(--ds-on-navy);
      }

      .ds-bulk-bar__action--danger {
        color: color-mix(in srgb, var(--ds-danger) 45%, white);
      }

      .ds-bulk-bar__action--danger:hover {
        background: color-mix(in srgb, var(--ds-danger) 18%, transparent);
        color: color-mix(in srgb, var(--ds-danger) 25%, white);
      }

      .ds-bulk-bar__close {
        width: 34px;
        padding: 0;
        color: color-mix(in srgb, var(--ds-on-navy) 60%, transparent);
      }

      .ds-bulk-bar__close:hover {
        background: color-mix(in srgb, var(--ds-on-navy) 10%, transparent);
        color: var(--ds-on-navy);
      }

      .ds-bulk-bar__action:focus-visible,
      .ds-bulk-bar__close:focus-visible {
        outline: 2px solid var(--ds-focus-ring);
        outline-offset: 2px;
      }

      @keyframes ds-bulk-bar-in {
        from {
          opacity: 0;
          transform: translate(-50%, 12px);
        }
        to {
          opacity: 1;
          transform: translate(-50%, 0);
        }
      }

      @media (max-width: 640px) {
        .ds-bulk-bar__label,
        .ds-bulk-bar__action span {
          display: none;
        }

        .ds-bulk-bar__action {
          width: 34px;
          padding: 0;
        }
      }
    `,
  ],
})
export class BulkActionsBarComponent {
  readonly count = input.required<number>();

  readonly edit = output<void>();
  readonly download = output<void>();
  readonly remove = output<void>();
  readonly clear = output<void>();
}

import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-etiqueta-formulario',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="ds-label" [attr.for]="para()" [attr.title]="obligatorio() ? 'Campo requerido' : null">
      <ng-content></ng-content>
      @if (obligatorio()) {
        <span class="ds-field-required select-none" aria-hidden="true">*</span>
      }
    </label>
  `,
})
export class EtiquetaFormularioComponente {
  readonly obligatorio = input(false, { transform: booleanAttribute });
  readonly para = input<string>();
}

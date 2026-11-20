import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-form-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="ds-label" [attr.for]="for()" [attr.title]="required() ? 'Campo requerido' : null">
      <ng-content></ng-content>
      @if (required()) {
        <span class="ds-field-required select-none" aria-hidden="true">*</span>
      }
    </label>
  `,
})
export class FormLabelComponent {
  readonly required = input(false, { transform: booleanAttribute });
  readonly for = input<string>();
}

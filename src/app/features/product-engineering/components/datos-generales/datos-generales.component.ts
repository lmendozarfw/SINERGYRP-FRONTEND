import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { CheckCircle } from '@primeicons/angular';
import { FormLabelComponent } from '../../../../shared/components/form-label/form-label.component';
import { MensajeAyudaErrorComponent } from '../../../../shared/components/mesaje-ayuda-error/mensaje-ayuda-error.component';
import { SelectorImagenComponent } from '../../../../shared/components/selector-imagen/selector-imagen.component';
import { TarjetaComponent } from '../../../../shared/components/tarjeta/tarjeta.component';
import { NewProductWizardStore } from '../../stores/new-product-wizard.store';

@Component({
  selector: 'app-datos-generales',
  imports: [
    ReactiveFormsModule,
    InputText,
    Textarea,
    Select,
    DatePicker,
    FormLabelComponent,
    SelectorImagenComponent,
    CheckCircle,
    TarjetaComponent,
    MensajeAyudaErrorComponent,
  ],
  templateUrl: './datos-generales.component.html',
  styleUrl: './datos-generales.component.scss',
})
export class DatosGeneralesComponent {
  protected readonly store = inject(NewProductWizardStore);
}

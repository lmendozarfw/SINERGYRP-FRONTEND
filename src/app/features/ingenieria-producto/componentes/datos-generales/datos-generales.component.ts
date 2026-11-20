import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { PIcon } from '@primeicons/angular';
import { FormLabelComponent } from '../../../../compartido/componentes/form-label/form-label.component';
import { MensajeAyudaErrorComponent } from '../../../../compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.component';
import { SelectorImagenComponent } from '../../../../compartido/componentes/selector-imagen/selector-imagen.component';
import { TarjetaComponent } from '../../../../compartido/componentes/tarjeta/tarjeta.component';
import { NewProductWizardStore } from '../../stores/asistente-nuevo-producto.store';

@Component({
  selector: 'app-datos-generales',
  host: { class: 'block' },
  imports: [
    ReactiveFormsModule,
    InputText,
    Textarea,
    Select,
    DatePicker,
    FormLabelComponent,
    SelectorImagenComponent,
    PIcon,
    TarjetaComponent,
    MensajeAyudaErrorComponent,
  ],
  templateUrl: './datos-generales.component.html',
})
export class DatosGeneralesComponent {
  protected readonly store = inject(NewProductWizardStore);
}

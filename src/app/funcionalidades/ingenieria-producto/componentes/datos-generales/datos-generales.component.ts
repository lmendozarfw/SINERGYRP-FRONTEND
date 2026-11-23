import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { PIcon } from '@primeicons/angular';
import { EtiquetaFormularioComponente } from '../../../../compartido/componentes/form-label/etiqueta-formulario.componente';
import { MensajeAyudaErrorComponente } from '../../../../compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.component';
import { SelectorImagenComponente } from '../../../../compartido/componentes/selector-imagen/selector-imagen.component';
import { TarjetaComponente } from '../../../../compartido/componentes/tarjeta/tarjeta.componente';
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
    EtiquetaFormularioComponente,
    SelectorImagenComponente,
    PIcon,
    TarjetaComponente,
    MensajeAyudaErrorComponente,
  ],
  templateUrl: './datos-generales.component.html',
})
export class DatosGeneralesComponent {
  protected readonly store = inject(NewProductWizardStore);
}

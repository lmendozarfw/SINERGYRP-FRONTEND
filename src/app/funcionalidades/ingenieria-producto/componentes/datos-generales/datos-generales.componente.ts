import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { PIcon } from '@primeicons/angular';
import { EtiquetaFormularioComponente } from '@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente';
import { TarjetaComponente } from '@compartido/componentes/tarjeta/tarjeta.componente';
import { MensajeAyudaErrorComponente } from '@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente';
import { SelectorImagenComponente } from '@compartido/componentes/selector-imagen/selector-imagen.componente';
import { AsistenteNuevoProductoStore } from '@funcionalidades/ingenieria-producto/stores/asistente-nuevo-producto.store';

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
    PIcon,
    TarjetaComponente,
    MensajeAyudaErrorComponente,
    SelectorImagenComponente
  ],
  templateUrl: './datos-generales.componente.html',
})
export class DatosGeneralesComponente {
  protected readonly store = inject(AsistenteNuevoProductoStore);
}

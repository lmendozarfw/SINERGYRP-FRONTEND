import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CopiarTextoComponente } from '@compartido/componentes/copiar-texto/copiar-texto.componente';
import { EtiquetaFormularioComponente } from '@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente';
import { IOpcionSelector } from '@compartido/interfaces/selector.interface';
import { IFacturaFormulario } from '@funcionalidades/tesoreria/cxc/modelos/factura-formulario.interface';
import { IClienteFacturaOption } from '@funcionalidades/tesoreria/cxc/modelos/factura-catalogos';
import { DatePicker } from 'primeng/datepicker';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';

@Component({
  selector: 'app-factura-datos-generales',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CopiarTextoComponente,
    DatePicker,
    EtiquetaFormularioComponente,
    FormsModule,
    InputNumber,
    InputText,
    Select,
    Textarea,
  ],
  templateUrl: './datos-generales.componente.html',
})
export class FacturaDatosGeneralesComponente {
  readonly datos = input.required<IFacturaFormulario>();
  readonly clientes = input.required<IClienteFacturaOption[]>();
  readonly opcionesMoneda = input.required<IOpcionSelector[]>();
  readonly opcionesFormaPago = input.required<IOpcionSelector[]>();
  readonly opcionesMetodoPago = input.required<IOpcionSelector[]>();
  readonly opcionesUsoCfdi = input.required<IOpcionSelector[]>();
  readonly opcionesExportacion = input.required<IOpcionSelector[]>();

  readonly clienteChange = output<string>();
  readonly metodoPagoChange = output<string>();
  readonly monedaChange = output<string>();
  readonly tipoCambioChange = output<number>();
  readonly fechaDocumentoChange = output<Date | null>();
  readonly fechaVencimientoChange = output<Date | null>();
  readonly formaPagoChange = output<string>();
  readonly usoCfdiChange = output<string>();
  readonly exportacionChange = output<string>();
  readonly lugarExpedicionChange = output<string>();
  readonly observacionesChange = output<string>();

  readonly esPPD = computed(() => this.datos().metodoPago === 'PPD');
}

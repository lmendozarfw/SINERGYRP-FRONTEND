import { IPartidaImpuesto } from '@funcionalidades/tesoreria/modelos/partida-impuesto.interface';
import { IPartidaFacturaFormulario } from './factura-formulario.interface';

export interface IAvisoFiscalFactura {
  titulo: string;
  detalle: string;
}

export interface IParcialidadFactura {
  numero: number;
  saldoAnterior: number;
  saldoInsoluto: number;
}

export interface IPartidaValorChange {
  id: string;
  campo: keyof IPartidaFacturaFormulario;
  valor: unknown;
}

export interface IPartidaSeleccionChange {
  id: string;
  valor: string;
}

export interface IImpuestoValorChange {
  id: string;
  campo: keyof IPartidaImpuesto;
  valor: unknown;
}

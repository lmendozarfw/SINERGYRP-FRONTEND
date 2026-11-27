import { EstadoDocumentoCxcEnum } from '@funcionalidades/tesoreria/cxc/enumerables/estado-documento-cxc.enum';
import { TipoDocumentoCxcEnum } from '@funcionalidades/tesoreria/cxc/enumerables/tipo-documento-cxc.enum';
import { EstadoAplicacionCobro } from '@funcionalidades/tesoreria/cxc/modelos/aplicacion-cobro.interface';

export interface IClienteEstadoCuenta {
  id: number;
  codigo: string;
  nombre: string;
  nombreComercial: string;
  rfc: string;
  estado: string;
  fechaAlta: Date;
  limiteCredito: number;
  diasCredito: number;
  moneda: string;
  cuentaContable: string;
}

export interface ICuentaBancariaEstadoCuenta {
  id: number;
  banco: string;
  nombreCuenta: string;
  titularCuenta: string;
  numeroCuenta: string;
  clabe: string;
  moneda: string;
  activa: boolean;
}

export interface IDocumentoEstadoCuenta {
  id: string;
  tipoDocumento: TipoDocumentoCxcEnum;
  serie: string;
  folio: string;
  fechaDocumento: Date;
  fechaVencimiento: Date | null;
  idMoneda: string;
  total: number;
  estado: EstadoDocumentoCxcEnum;
  esCargo: boolean;
  saldo: number | null;
  estaVencido: boolean;
}

export interface IAplicacionEstadoCuenta {
  id: string;
  idDocumentoAbono: string;
  idDocumentoCargo: string;
  fechaAplicacion: Date;
  documentoAbono: string;
  documentoCargo: string;
  importeAbono: number;
  saldoAnterior: number;
  saldoInsoluto: number;
  numeroParcialidad: number;
  estado: EstadoAplicacionCobro;
  observaciones: string | null;
}

export interface IResumenEstadoCuenta {
  fechaCorte: Date;
  totalCargos: number;
  totalAbonos: number;
  saldoActual: number;
  limiteCredito: number;
  creditoDisponible: number;
  porcentajeUsoCredito: number;
  documentosVencidos: number;
  proximoVencimiento: Date | null;
}

export interface IEstadoCuenta {
  cliente: IClienteEstadoCuenta;
  cuentas: ICuentaBancariaEstadoCuenta[];
  documentos: IDocumentoEstadoCuenta[];
  aplicaciones: IAplicacionEstadoCuenta[];
  resumen: IResumenEstadoCuenta;
}

export const ETIQUETAS_TIPO_DOCUMENTO: Record<TipoDocumentoCxcEnum, string> = {
  [TipoDocumentoCxcEnum.FACTURA]: 'Factura',
  [TipoDocumentoCxcEnum.COTIZACION]: 'Cotización',
  [TipoDocumentoCxcEnum.NOTA_CREDITO]: 'Nota de crédito',
  [TipoDocumentoCxcEnum.NOTA_CARGO]: 'Nota de cargo',
  [TipoDocumentoCxcEnum.PAGO]: 'Pago',
  [TipoDocumentoCxcEnum.ANTICIPO]: 'Anticipo',
};

export const ETIQUETAS_ESTADO_DOCUMENTO: Record<EstadoDocumentoCxcEnum, string> = {
  [EstadoDocumentoCxcEnum.BORRADOR]: 'Borrador',
  [EstadoDocumentoCxcEnum.EMITIDO]: 'Emitido',
  [EstadoDocumentoCxcEnum.CANCELADO]: 'Cancelado',
};

export const ETIQUETAS_ESTADO_APLICACION: Record<EstadoAplicacionCobro, string> = {
  aplicada: 'Aplicada',
  revertida: 'Revertida',
};

export function esDocumentoCargo(tipo: TipoDocumentoCxcEnum): boolean {
  return tipo === TipoDocumentoCxcEnum.FACTURA
    || tipo === TipoDocumentoCxcEnum.NOTA_CARGO;
}

export function severidadEstadoDocumento(
  estado: EstadoDocumentoCxcEnum,
): 'success' | 'warn' | 'danger' {
  if (estado === EstadoDocumentoCxcEnum.EMITIDO) {
    return 'success';
  }
  return estado === EstadoDocumentoCxcEnum.CANCELADO ? 'danger' : 'warn';
}

export function severidadEstadoAplicacion(
  estado: EstadoAplicacionCobro,
): 'success' | 'warn' {
  return estado === 'aplicada' ? 'success' : 'warn';
}

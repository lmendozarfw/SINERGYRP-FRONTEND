import { IOpcionSelector } from '@compartido/interfaces/selector.interface';
import { MetodoPagoFactura } from './factura-formulario.interface';

export interface IClienteFacturaOption extends IOpcionSelector {
  rfc: string;
  usoCfdi: string;
  formaPago: string;
  metodoPago: MetodoPagoFactura;
}

export interface IProductoFacturaOption extends IOpcionSelector {
  unidad: string;
}

export const CLIENTES_FACTURA: IClienteFacturaOption[] = [
  { etiqueta: 'Grupo Industrial Raudal, S.A. de C.V.', valor: '1', rfc: 'RIR240315AB1', usoCfdi: 'I01', formaPago: '03', metodoPago: 'PPD' },
  { etiqueta: 'Comercializadora Nova, S. de R.L. de C.V.', valor: '2', rfc: 'CNO890412H23', usoCfdi: 'G01', formaPago: '03', metodoPago: 'PUE' },
  { etiqueta: 'Laura Gutiérrez Méndez', valor: '3', rfc: 'GUML850921E45', usoCfdi: 'G03', formaPago: '04', metodoPago: 'PUE' },
  { etiqueta: 'Manufacturas del Norte, S.A. de C.V.', valor: '4', rfc: 'MNO750618K12', usoCfdi: 'I01', formaPago: '03', metodoPago: 'PPD' },
  { etiqueta: 'Servicios Profesionales Ámbar, S.C.', valor: '5', rfc: 'SPA910203R77', usoCfdi: 'G03', formaPago: '01', metodoPago: 'PUE' },
];

export const OPCIONES_MONEDA: IOpcionSelector[] = [
  { etiqueta: 'MXN · Peso mexicano', valor: 'MXN' },
  { etiqueta: 'USD · Dólar estadounidense', valor: 'USD' },
];

export const OPCIONES_FORMA_PAGO: IOpcionSelector[] = [
  { etiqueta: '01 · Efectivo', valor: '01' },
  { etiqueta: '03 · Transferencia electrónica', valor: '03' },
  { etiqueta: '04 · Tarjeta de crédito', valor: '04' },
  { etiqueta: '99 · Por definir', valor: '99' },
];

export const OPCIONES_METODO_PAGO: IOpcionSelector[] = [
  { etiqueta: 'PUE · Pago en una sola exhibición', valor: 'PUE' },
  { etiqueta: 'PPD · Pago en parcialidades o diferido', valor: 'PPD' },
];

export const OPCIONES_USO_CFDI: IOpcionSelector[] = [
  { etiqueta: 'I01 · Ingresos por ventas', valor: 'I01' },
  { etiqueta: 'G01 · Adquisición de mercancías', valor: 'G01' },
  { etiqueta: 'G03 · Gastos generales', valor: 'G03' },
];

export const OPCIONES_EXPORTACION: IOpcionSelector[] = [
  { etiqueta: '01 · No aplica', valor: '01' },
  { etiqueta: '02 · Exportación', valor: '02' },
];

export const OPCIONES_PRODUCTO: IProductoFacturaOption[] = [
  { etiqueta: 'SERV-001 · Consultoría financiera', valor: 'SERV-001', unidad: 'UNI-01' },
  { etiqueta: 'SERV-014 · Licencias de software', valor: 'SERV-014', unidad: 'UNI-01' },
  { etiqueta: 'PROD-088 · Equipo de cómputo', valor: 'PROD-088', unidad: 'UNI-02' },
  { etiqueta: 'PROD-102 · Materia prima', valor: 'PROD-102', unidad: 'UNI-03' },
];

export const OPCIONES_UNIDAD: IOpcionSelector[] = [
  { etiqueta: 'UNI-01 · Servicio', valor: 'UNI-01' },
  { etiqueta: 'UNI-02 · Pieza', valor: 'UNI-02' },
  { etiqueta: 'UNI-03 · Kilogramo', valor: 'UNI-03' },
];

export const OPCIONES_TIPO_DESCUENTO: IOpcionSelector[] = [
  { etiqueta: 'Sin descuento', valor: '' },
  { etiqueta: 'Porcentaje (%)', valor: '%' },
  { etiqueta: 'Importe fijo', valor: 'I' },
];

export const OPCIONES_OBJETO_IMP: IOpcionSelector[] = [
  { etiqueta: '01 · No objeto de impuesto', valor: '01' },
  { etiqueta: '02 · Sí objeto de impuesto', valor: '02' },
  { etiqueta: '03 · Sí objeto, sin desglose', valor: '03' },
  { etiqueta: '04 · No obligado al desglose', valor: '04' },
];

export const OPCIONES_IMPUESTO: IOpcionSelector[] = [
  { etiqueta: 'IVA', valor: 'IVA' },
  { etiqueta: 'ISR', valor: 'ISR' },
  { etiqueta: 'IEPS', valor: 'IEPS' },
];

export const OPCIONES_TIPO_FACTOR: IOpcionSelector[] = [
  { etiqueta: 'Tasa', valor: 'Tasa' },
  { etiqueta: 'Exento', valor: 'Exento' },
  { etiqueta: 'Cuota', valor: 'Cuota' },
];

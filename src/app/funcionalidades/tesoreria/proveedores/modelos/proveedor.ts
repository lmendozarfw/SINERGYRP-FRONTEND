export interface IProveedor {
  id: number;
  idOrganizacion: number;
  codigo: string;
  estadoProveedor: string;
  fechaAlta: Date;
  nombreRazonSocial: string;
  nombreComercial: string;
  tipoPersona: string;
  rfc: string;
  identificadorFiscalExtranjero: string;
  idRegimenFiscal: string;
  idTipoIva?: string;
  cuentaContable: string;
  diasCredito: number;
  limiteCredito: number;
  idMonedaPredeterminada: number;
  idFormaPagoPredeterminada: number;
  idMetodoPagoPredeterminado: number;
  esPagoContrarecibo: boolean;
  observaciones: string;
  creadoEn: Date;
  actualizadoEn: Date;
}

export const PROVEEDOR_VACIO: IProveedor = {
  id: 0,
  idOrganizacion: 0,
  codigo: '',
  estadoProveedor: 'Activo',
  fechaAlta: new Date(),
  nombreRazonSocial: '',
  nombreComercial: '',
  tipoPersona: 'Moral',
  rfc: '',
  identificadorFiscalExtranjero: '',
  idRegimenFiscal: '',
  idTipoIva: '',
  cuentaContable: '',
  diasCredito: 0,
  limiteCredito: 0,
  idMonedaPredeterminada: 1,
  idFormaPagoPredeterminada: 1,
  idMetodoPagoPredeterminado: 1,
  esPagoContrarecibo: false,
  observaciones: '',
  creadoEn: new Date(),
  actualizadoEn: new Date(),
};

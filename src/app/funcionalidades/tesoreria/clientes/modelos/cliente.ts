export interface ICliente {
  id: number;
  idOrganizacion: number;
  codigo: string;
  estadoCliente: string;
  fechaAlta: Date;
  nombreRazonSocial: string;
  nombreComercial: string;
  tipoPersona: string;
  rfc: string;
  identificadorFiscalExtranjero: string;
  idRegimenFiscal: string;
  idTipoIva: string;
  cuentaContable: string;
  idUsoCfdiPredeterminado: string;
  idFormaPagoPredeterminada: string;
  idMetodoPagoPredeterminado: string;
  limiteCredito: number;
  diasCredito: number;
  observaciones: string;
  creadoEn: Date;
  actualizadoEn: Date;
}

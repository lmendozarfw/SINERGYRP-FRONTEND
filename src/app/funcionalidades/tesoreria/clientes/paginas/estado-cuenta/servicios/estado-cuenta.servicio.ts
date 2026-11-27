import { Injectable } from '@angular/core';
import { EstadoDocumentoCxcEnum } from '@funcionalidades/tesoreria/cxc/enumerables/estado-documento-cxc.enum';
import { TipoDocumentoCxcEnum } from '@funcionalidades/tesoreria/cxc/enumerables/tipo-documento-cxc.enum';
import {
  esDocumentoCargo,
  IAplicacionEstadoCuenta,
  IClienteEstadoCuenta,
  ICuentaBancariaEstadoCuenta,
  IDocumentoEstadoCuenta,
  IEstadoCuenta,
  IResumenEstadoCuenta,
} from '../modelos/estado-cuenta.interface';

type CuentaMock = ICuentaBancariaEstadoCuenta & { idCliente: number };
type DocumentoMock = Omit<IDocumentoEstadoCuenta, 'esCargo' | 'saldo' | 'estaVencido'> & {
  idCliente: string;
};
type AplicacionMock = IAplicacionEstadoCuenta & { idCliente: string };

const CLIENTES: IClienteEstadoCuenta[] = [
  {
    id: 1,
    codigo: 'CLI-001',
    nombre: 'Grupo Industrial Raudal, S.A. de C.V.',
    nombreComercial: 'Raudal',
    rfc: 'RIR240315AB1',
    estado: 'activo',
    fechaAlta: new Date('2023-02-15T00:00:00'),
    limiteCredito: 150000,
    diasCredito: 30,
    moneda: 'MXN',
    cuentaContable: '1010 · Clientes nacionales',
  },
  {
    id: 2,
    codigo: 'CLI-002',
    nombre: 'Comercializadora Nova, S. de R.L. de C.V.',
    nombreComercial: 'Nova',
    rfc: 'CNO890412H23',
    estado: 'activo',
    fechaAlta: new Date('2022-08-03T00:00:00'),
    limiteCredito: 85000,
    diasCredito: 15,
    moneda: 'MXN',
    cuentaContable: '1010 · Clientes nacionales',
  },
  {
    id: 3,
    codigo: 'CLI-003',
    nombre: 'Laura Gutiérrez Méndez',
    nombreComercial: 'Estudio Gutiérrez',
    rfc: 'GUML850921E45',
    estado: 'activo',
    fechaAlta: new Date('2024-01-10T00:00:00'),
    limiteCredito: 25000,
    diasCredito: 0,
    moneda: 'MXN',
    cuentaContable: '1011 · Clientes de servicios',
  },
  {
    id: 4,
    codigo: 'CLI-004',
    nombre: 'Manufacturas del Norte, S.A. de C.V.',
    nombreComercial: 'Man Norte',
    rfc: 'MNO750618K12',
    estado: 'activo',
    fechaAlta: new Date('2021-05-22T00:00:00'),
    limiteCredito: 220000,
    diasCredito: 45,
    moneda: 'MXN',
    cuentaContable: '1010 · Clientes nacionales',
  },
  {
    id: 5,
    codigo: 'CLI-005',
    nombre: 'Servicios Profesionales Ámbar, S.C.',
    nombreComercial: 'Ámbar',
    rfc: 'SPA910203R77',
    estado: 'inactivo',
    fechaAlta: new Date('2020-11-02T00:00:00'),
    limiteCredito: 0,
    diasCredito: 0,
    moneda: 'MXN',
    cuentaContable: '1011 · Clientes de servicios',
  },
  {
    id: 6,
    codigo: 'CLI-006',
    nombre: 'Fernando Ríos Castro',
    nombreComercial: 'Ríos y Asociados',
    rfc: 'RICF790114M31',
    estado: 'activo',
    fechaAlta: new Date('2025-04-17T00:00:00'),
    limiteCredito: 12000,
    diasCredito: 8,
    moneda: 'MXN',
    cuentaContable: '1011 · Clientes de servicios',
  },
  {
    id: 7,
    codigo: 'CLI-007',
    nombre: 'Distribuidora Solstice, S.A. de C.V.',
    nombreComercial: 'Solstice',
    rfc: 'DSO160902TQ8',
    estado: 'en revisión',
    fechaAlta: new Date('2026-03-08T00:00:00'),
    limiteCredito: 60000,
    diasCredito: 20,
    moneda: 'MXN',
    cuentaContable: '1010 · Clientes nacionales',
  },
];

const CUENTAS: CuentaMock[] = [
  {
    id: 1,
    idCliente: 1,
    banco: 'BanBajío',
    nombreCuenta: 'Operaciones MXN',
    titularCuenta: 'Grupo Industrial Raudal, S.A. de C.V.',
    numeroCuenta: '482148214821',
    clabe: '0721789017890178901',
    moneda: 'MXN',
    activa: true,
  },
  {
    id: 2,
    idCliente: 1,
    banco: 'BBVA',
    nombreCuenta: 'Cobros internacionales',
    titularCuenta: 'Grupo Industrial Raudal, S.A. de C.V.',
    numeroCuenta: '78901789019034',
    clabe: '01217890178905434090',
    moneda: 'USD',
    activa: true,
  },
];

const DOCUMENTOS: DocumentoMock[] = [
  {
    id: '1',
    idCliente: '1',
    tipoDocumento: TipoDocumentoCxcEnum.FACTURA,
    serie: 'FAC',
    folio: '2026-001',
    fechaDocumento: new Date('2026-09-12T00:00:00'),
    fechaVencimiento: new Date('2026-10-12T00:00:00'),
    idMoneda: 'MXN',
    total: 22968,
    estado: EstadoDocumentoCxcEnum.EMITIDO,
  },
  {
    id: '2',
    idCliente: '1',
    tipoDocumento: TipoDocumentoCxcEnum.FACTURA,
    serie: 'FAC',
    folio: '2026-018',
    fechaDocumento: new Date('2026-10-05T00:00:00'),
    fechaVencimiento: new Date('2026-11-04T00:00:00'),
    idMoneda: 'MXN',
    total: 48120,
    estado: EstadoDocumentoCxcEnum.EMITIDO,
  },
  {
    id: '3',
    idCliente: '1',
    tipoDocumento: TipoDocumentoCxcEnum.NOTA_CREDITO,
    serie: 'NCR',
    folio: '2026-003',
    fechaDocumento: new Date('2026-10-18T00:00:00'),
    fechaVencimiento: null,
    idMoneda: 'MXN',
    total: 1160,
    estado: EstadoDocumentoCxcEnum.EMITIDO,
  },
  {
    id: '4',
    idCliente: '1',
    tipoDocumento: TipoDocumentoCxcEnum.NOTA_CARGO,
    serie: 'NCA',
    folio: '2026-006',
    fechaDocumento: new Date('2026-11-08T00:00:00'),
    fechaVencimiento: new Date('2026-11-20T00:00:00'),
    idMoneda: 'MXN',
    total: 3480,
    estado: EstadoDocumentoCxcEnum.EMITIDO,
  },
  {
    id: '5',
    idCliente: '1',
    tipoDocumento: TipoDocumentoCxcEnum.PAGO,
    serie: 'PAG',
    folio: '2026-022',
    fechaDocumento: new Date('2026-11-05T00:00:00'),
    fechaVencimiento: null,
    idMoneda: 'MXN',
    total: 15000,
    estado: EstadoDocumentoCxcEnum.EMITIDO,
  },
  {
    id: '6',
    idCliente: '1',
    tipoDocumento: TipoDocumentoCxcEnum.FACTURA,
    serie: 'FAC',
    folio: '2026-024',
    fechaDocumento: new Date('2026-11-19T00:00:00'),
    fechaVencimiento: new Date('2026-12-15T00:00:00'),
    idMoneda: 'MXN',
    total: 12900,
    estado: EstadoDocumentoCxcEnum.EMITIDO,
  },
  {
    id: '7',
    idCliente: '1',
    tipoDocumento: TipoDocumentoCxcEnum.ANTICIPO,
    serie: 'ANT',
    folio: '2026-007',
    fechaDocumento: new Date('2026-11-20T00:00:00'),
    fechaVencimiento: null,
    idMoneda: 'MXN',
    total: 5000,
    estado: EstadoDocumentoCxcEnum.CANCELADO,
  },
  {
    id: '8',
    idCliente: '2',
    tipoDocumento: TipoDocumentoCxcEnum.FACTURA,
    serie: 'FAC',
    folio: '2026-030',
    fechaDocumento: new Date('2026-11-02T00:00:00'),
    fechaVencimiento: new Date('2026-12-02T00:00:00'),
    idMoneda: 'MXN',
    total: 9500,
    estado: EstadoDocumentoCxcEnum.EMITIDO,
  },
];

const APLICACIONES: AplicacionMock[] = [
  {
    id: 'A-001',
    idCliente: '1',
    idDocumentoAbono: '5',
    idDocumentoCargo: '1',
    fechaAplicacion: new Date('2026-11-05T00:00:00'),
    documentoAbono: 'PAG · 2026-022',
    documentoCargo: 'FAC · 2026-001',
    importeAbono: 15000,
    saldoAnterior: 22968,
    saldoInsoluto: 7968,
    numeroParcialidad: 1,
    estado: 'aplicada',
    observaciones: 'Transferencia desde Banorte.',
  },
  {
    id: 'A-002',
    idCliente: '1',
    idDocumentoAbono: '9',
    idDocumentoCargo: '2',
    fechaAplicacion: new Date('2026-11-20T00:00:00'),
    documentoAbono: 'PAG · 2026-025',
    documentoCargo: 'FAC · 2026-018',
    importeAbono: 12000,
    saldoAnterior: 48120,
    saldoInsoluto: 36120,
    numeroParcialidad: 1,
    estado: 'aplicada',
    observaciones: null,
  },
  {
    id: 'A-003',
    idCliente: '1',
    idDocumentoAbono: '3',
    idDocumentoCargo: '4',
    fechaAplicacion: new Date('2026-11-21T00:00:00'),
    documentoAbono: 'NCR · 2026-003',
    documentoCargo: 'NCA · 2026-006',
    importeAbono: 1160,
    saldoAnterior: 3480,
    saldoInsoluto: 2320,
    numeroParcialidad: 1,
    estado: 'aplicada',
    observaciones: 'Nota de crédito por devolución.',
  },
  {
    id: 'A-004',
    idCliente: '1',
    idDocumentoAbono: '9',
    idDocumentoCargo: '2',
    fechaAplicacion: new Date('2026-11-25T00:00:00'),
    documentoAbono: 'PAG · 2026-025',
    documentoCargo: 'FAC · 2026-018',
    importeAbono: 5000,
    saldoAnterior: 36120,
    saldoInsoluto: 31120,
    numeroParcialidad: 2,
    estado: 'aplicada',
    observaciones: null,
  },
  {
    id: 'A-005',
    idCliente: '1',
    idDocumentoAbono: '10',
    idDocumentoCargo: '6',
    fechaAplicacion: new Date('2026-11-26T00:00:00'),
    documentoAbono: 'PAG · 2026-030',
    documentoCargo: 'FAC · 2026-024',
    importeAbono: 8000,
    saldoAnterior: 12900,
    saldoInsoluto: 4900,
    numeroParcialidad: 1,
    estado: 'revertida',
    observaciones: 'Revertida por discrepancia en el depósito.',
  },
  {
    id: 'A-006',
    idCliente: '2',
    idDocumentoAbono: '11',
    idDocumentoCargo: '8',
    fechaAplicacion: new Date('2026-11-24T00:00:00'),
    documentoAbono: 'PAG · 2026-031',
    documentoCargo: 'FAC · 2026-030',
    importeAbono: 2000,
    saldoAnterior: 9500,
    saldoInsoluto: 7500,
    numeroParcialidad: 1,
    estado: 'aplicada',
    observaciones: null,
  },
];

@Injectable({ providedIn: 'root' })
export class EstadoCuentaServicio {
  obtenerEstadoCuenta(clienteId: number): IEstadoCuenta | null {
    const cliente = CLIENTES.find((item) => item.id === clienteId);
    if (!cliente) {
      return null;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const cuentas: ICuentaBancariaEstadoCuenta[] = CUENTAS
      .filter((cuenta) => cuenta.idCliente === cliente.id)
      .map(({ idCliente: _idCliente, ...cuenta }) => cuenta);

    const aplicaciones: IAplicacionEstadoCuenta[] = APLICACIONES
      .filter((aplicacion) => aplicacion.idCliente === String(cliente.id))
      .map(({ idCliente: _idCliente, ...aplicacion }) => aplicacion);

    const aplicacionesAplicadas = aplicaciones.filter((aplicacion) => aplicacion.estado === 'aplicada');

    const documentos: IDocumentoEstadoCuenta[] = DOCUMENTOS
      .filter((documento) => documento.idCliente === String(cliente.id))
      .map((documento) => this.construirDocumento(documento, aplicacionesAplicadas, hoy));

    const totalCargos = this.sumar(
      documentos
        .filter((documento) => documento.esCargo && documento.estado !== EstadoDocumentoCxcEnum.CANCELADO)
        .map((documento) => documento.total),
    );
    const totalAbonos = this.sumar(aplicacionesAplicadas.map((aplicacion) => aplicacion.importeAbono));
    const saldoActual = Math.max(0, totalCargos - totalAbonos);
    const creditoDisponible = Math.max(0, cliente.limiteCredito - saldoActual);

    const vencimientos = documentos
      .filter((documento) => documento.saldo !== null && documento.saldo > 0 && documento.fechaVencimiento && documento.fechaVencimiento >= hoy)
      .map((documento) => documento.fechaVencimiento as Date)
      .sort((a, b) => a.getTime() - b.getTime());

    const resumen: IResumenEstadoCuenta = {
      fechaCorte: new Date(),
      totalCargos,
      totalAbonos,
      saldoActual,
      limiteCredito: cliente.limiteCredito,
      creditoDisponible,
      porcentajeUsoCredito: cliente.limiteCredito > 0
        ? Math.min(100, (saldoActual / cliente.limiteCredito) * 100)
        : 0,
      documentosVencidos: documentos.filter((documento) => documento.estaVencido).length,
      proximoVencimiento: vencimientos[0] ?? null,
    };

    return { cliente, cuentas, documentos, aplicaciones, resumen };
  }

  private construirDocumento(
    documento: DocumentoMock,
    aplicaciones: IAplicacionEstadoCuenta[],
    hoy: Date,
  ): IDocumentoEstadoCuenta {
    const esCargo = esDocumentoCargo(documento.tipoDocumento);
    const abonos = esCargo
      ? this.sumar(
        aplicaciones
          .filter((aplicacion) => aplicacion.idDocumentoCargo === documento.id)
          .map((aplicacion) => aplicacion.importeAbono),
      )
      : 0;
    const saldo = esCargo ? Math.max(0, documento.total - abonos) : null;
    const estaVencido = Boolean(
      esCargo
        && saldo !== null
        && saldo > 0
        && documento.fechaVencimiento
        && documento.fechaVencimiento < hoy,
    );

    return { ...documento, esCargo, saldo, estaVencido };
  }

  private sumar(valores: number[]): number {
    return valores.reduce((total, valor) => total + valor, 0);
  }
}

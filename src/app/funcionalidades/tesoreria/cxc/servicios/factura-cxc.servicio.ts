import { Injectable } from '@angular/core';
import { EstadoDocumentoCxcEnum } from '@funcionalidades/tesoreria/cxc/enumerables/estado-documento-cxc.enum';
import { TipoDocumentoCxcEnum } from '@funcionalidades/tesoreria/cxc/enumerables/tipo-documento-cxc.enum';
import { IDocumentoCxc } from '@funcionalidades/tesoreria/cxc/modelos/documento_cxc.interface';
import {
  IFacturaFormulario,
  IPartidaFacturaFormulario,
  IResumenFactura,
} from '@funcionalidades/tesoreria/cxc/modelos/factura-formulario.interface';

@Injectable({ providedIn: 'root' })
export class FacturaCxcServicio {
  
  validar(formulario: IFacturaFormulario): string[] {
    const errores: string[] = [];

    if (!formulario.idCliente) errores.push('Selecciona un cliente.');
    if (!formulario.serie.trim()) errores.push('La serie es obligatoria.');
    if (!formulario.folio.trim()) errores.push('El folio es obligatorio.');
    if (!formulario.usoCfdi) errores.push('Selecciona el uso de CFDI.');
    if (!/^\d{5}$/.test(formulario.lugarExpedicion)) errores.push('El código postal debe tener 5 dígitos.');
    if (!formulario.partidas.length) errores.push('Agrega al menos una partida.');

    formulario.partidas.forEach((partida, indice) => {
      const prefijo = `Partida ${indice + 1}`;
      if (!partida.concepto.trim()) errores.push(`${prefijo}: escribe un concepto.`);
      if (!partida.idProductoServicioSat) errores.push(`${prefijo}: selecciona un producto o servicio SAT.`);
      if (!partida.idUnidadMedidaSat) errores.push(`${prefijo}: selecciona una unidad SAT.`);
      if (partida.cantidad <= 0) errores.push(`${prefijo}: la cantidad debe ser mayor a 0.`);
      if ((partida.precioUnitario ?? 0) < 0) errores.push(`${prefijo}: el precio unitario no puede ser negativo.`);
    });

    return errores;
  }

  construirBorrador(
    formulario: IFacturaFormulario,
    partidasCalculadas: IPartidaFacturaFormulario[],
    resumen: IResumenFactura
  ): IDocumentoCxc {
    const idDocumento = `tmp-${Date.now()}`;

    return {
      id: idDocumento,
      idOrganizacion: '1',
      idEmisorFiscal: '1',
      idCliente: formulario.idCliente,
      idUnidadNegocio: '1',
      idConceptoMovimiento: '1',
      tipoDocumento: TipoDocumentoCxcEnum.FACTURA,
      serie: formulario.serie,
      folio: formulario.folio,
      fechaDocumento: formulario.fechaDocumento,
      fechaVencimiento: formulario.fechaVencimiento ?? undefined,
      idMoneda: formulario.idMoneda,
      tipoCambio: formulario.tipoCambio,
      subtotal: resumen.subtotal,
      descuento: resumen.descuento,
      impuestosTrasladados: resumen.impuestosTrasladados,
      impuestosRetenidos: resumen.impuestosRetenidos,
      total: resumen.total,
      totalMonedaBase: resumen.totalMonedaBase,
      idFormaPagoSat: formulario.formaPago,
      idMetodoPagoSat: formulario.metodoPago,
      idUsoCfdiSat: formulario.usoCfdi,
      exportacion: formulario.exportacion,
      lugarExpedicion: formulario.lugarExpedicion,
      origen: 'captura_manual',
      estado: EstadoDocumentoCxcEnum.BORRADOR,
      observaciones: formulario.observaciones,
      idUsuarioCreacion: '1',
      creadoEn: new Date(),
      partidas: partidasCalculadas.map((partida, indice) => ({
        ...partida,
        idDocumentoCxc: idDocumento,
        numeroPartida: indice + 1,
        subtotalMonedaBase: Math.round(partida.subtotal * formulario.tipoCambio * 100) / 100,
        totalMonedaBase: Math.round(partida.total * formulario.tipoCambio * 100) / 100,
        impuestos: partida.impuestos.map(impuesto => ({
          ...impuesto,
          idPartidaDocumentoCxc: partida.id,
          idPartidaDocumentoCxp: null,
        })),
      })),
    };
  }
}

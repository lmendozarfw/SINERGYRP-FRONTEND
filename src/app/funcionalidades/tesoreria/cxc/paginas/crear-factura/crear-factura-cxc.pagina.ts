import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DialogoConfirmacionServicio } from '@compartido/componentes/confirmacion/confirmacion.servicio';
import { EncabezadoPaginaComponente } from '@compartido/componentes/encabezado-pagina/encabezado-pagina.componente';
import { BreadcrumbServicio } from '@nucleo/servicios/breadcrumb.servicio';
import {
  CLIENTES_FACTURA,
  OPCIONES_EXPORTACION,
  OPCIONES_FORMA_PAGO,
  OPCIONES_IMPUESTO,
  OPCIONES_METODO_PAGO,
  OPCIONES_MONEDA,
  OPCIONES_OBJETO_IMP,
  OPCIONES_PRODUCTO,
  OPCIONES_TIPO_DESCUENTO,
  OPCIONES_TIPO_FACTOR,
  OPCIONES_UNIDAD,
  OPCIONES_USO_CFDI,
} from '@funcionalidades/tesoreria/cxc/modelos/factura-catalogos';
import {
  calcularPartida,
  calcularResumenFactura,
  crearPartidaFacturaVacia,
  IFacturaFormulario,
  IPartidaFacturaFormulario,
  MetodoPagoFactura,
} from '@funcionalidades/tesoreria/cxc/modelos/factura-formulario.interface';
import {
  IAvisoFiscalFactura,
  IImpuestoValorChange,
  IPartidaSeleccionChange,
  IPartidaValorChange,
  IParcialidadFactura,
} from '@funcionalidades/tesoreria/cxc/modelos/factura-vista.interface';
import { FacturaCxcServicio } from '@funcionalidades/tesoreria/cxc/servicios/factura-cxc.servicio';
import { IPartidaImpuesto } from '@funcionalidades/tesoreria/modelos/partida-impuesto.interface';
import { PIcon } from '@primeicons/angular';
import { MessageService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { FacturaDatosGeneralesComponente } from './componentes/datos-generales/datos-generales.componente';
import { FacturaFlujoFiscalComponente } from './componentes/flujo-fiscal/flujo-fiscal.componente';
import { FacturaImpuestosDrawerComponente } from './componentes/impuestos-drawer/impuestos-drawer.componente';
import { FacturaPartidasComponente } from './componentes/partidas/partidas.componente';
import { FacturaResumenComponente } from './componentes/resumen/resumen.componente';
import { FacturaValidacionComponente } from './componentes/validacion/validacion.componente';

@Component({
  selector: 'app-crear-factura-cxc-pagina',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './crear-factura-cxc.pagina.html',
  styleUrl: './crear-factura-cxc.pagina.scss',
  imports: [
    ButtonDirective,
    EncabezadoPaginaComponente,
    FacturaDatosGeneralesComponente,
    FacturaFlujoFiscalComponente,
    FacturaImpuestosDrawerComponente,
    FacturaPartidasComponente,
    FacturaResumenComponente,
    FacturaValidacionComponente,
    PIcon,
  ],
})
export class CrearFacturaCxcPagina {
  private readonly breadcrumb = inject(BreadcrumbServicio);
  private readonly confirmacion = inject(DialogoConfirmacionServicio);
  private readonly mensajes = inject(MessageService);
  private readonly facturaServicio = inject(FacturaCxcServicio);

  private contadorPartidas = 0;
  private contadorImpuestos = 0;

  readonly clienteId = signal('');
  readonly moneda = signal('MXN');
  readonly tipoCambio = signal(1);
  readonly serie = signal('FAC');
  readonly folio = signal('2026-002');
  readonly fechaDocumento = signal(new Date());
  readonly fechaVencimiento = signal<Date | null>(null);
  readonly formaPago = signal('03');
  readonly metodoPago = signal<MetodoPagoFactura>('PUE');
  readonly usoCfdi = signal('I01');
  readonly exportacion = signal('01');
  readonly lugarExpedicion = signal('06600');
  readonly observaciones = signal('');
  readonly partidas = signal<IPartidaFacturaFormulario[]>([]);
  readonly drawerVisible = signal(false);
  readonly idPartidaImpuestos = signal<string | null>(null);

  readonly clientes = CLIENTES_FACTURA;
  readonly opcionesMoneda = OPCIONES_MONEDA;
  readonly opcionesFormaPago = OPCIONES_FORMA_PAGO;
  readonly opcionesMetodoPago = OPCIONES_METODO_PAGO;
  readonly opcionesUsoCfdi = OPCIONES_USO_CFDI;
  readonly opcionesExportacion = OPCIONES_EXPORTACION;
  readonly opcionesProducto = OPCIONES_PRODUCTO;
  readonly opcionesUnidad = OPCIONES_UNIDAD;
  readonly opcionesTipoDescuento = OPCIONES_TIPO_DESCUENTO;
  readonly opcionesObjetoImp = OPCIONES_OBJETO_IMP;
  readonly opcionesImpuesto = OPCIONES_IMPUESTO;
  readonly opcionesTipoFactor = OPCIONES_TIPO_FACTOR;

  readonly formulario = computed<IFacturaFormulario>(() => ({
    idCliente: this.clienteId(),
    idMoneda: this.moneda(),
    moneda: this.moneda(),
    tipoCambio: this.tipoCambio(),
    serie: this.serie(),
    folio: this.folio(),
    fechaDocumento: this.fechaDocumento(),
    fechaVencimiento: this.fechaVencimiento(),
    formaPago: this.formaPago(),
    metodoPago: this.metodoPago(),
    usoCfdi: this.usoCfdi(),
    exportacion: this.exportacion(),
    lugarExpedicion: this.lugarExpedicion(),
    observaciones: this.observaciones(),
    partidas: this.partidas(),
  }));

  readonly esPPD = computed(() => this.metodoPago() === 'PPD');
  readonly partidasCalculadas = computed(() => this.partidas().map(calcularPartida));
  readonly resumen = computed(() => calcularResumenFactura(this.partidas(), this.tipoCambio()));
  readonly partidaImpuestos = computed(() =>
    this.partidasCalculadas().find(partida => partida.id === this.idPartidaImpuestos()) ?? null
  );

  readonly errores = computed<string[]>(() => this.facturaServicio.validar(this.formulario()));

  readonly puedeGuardar = computed(() => this.errores().length === 0);

  readonly avisoFiscal = computed<IAvisoFiscalFactura>(() => this.esPPD()
    ? {
        titulo: 'Pago en parcialidades o diferido',
        detalle: 'El CFDI se timbrará sin pago. Cada cobro se aplicará después con su complemento de recepción de pagos y su parcialidad.',
      }
    : {
        titulo: 'Pago en una sola exhibición',
        detalle: 'La factura se timbrará con el importe total cubierto y la forma de pago seleccionada.',
      }
  );

  readonly parcialidad = computed<IParcialidadFactura>(() => ({
    numero: 1,
    saldoAnterior: 0,
    saldoInsoluto: this.resumen().total,
  }));

  constructor() {
    this.partidas.set([this.nuevaPartida()]);
    this.breadcrumb.configurar([
      { etiqueta: 'Tesoreria', llave: 'tesoreria', deshabilitado: true },
      { etiqueta: 'Cuentas por cobrar', llave: 'cuentas-por-cobrar', deshabilitado: true },
      { etiqueta: 'Documentos', llave: 'documentos', ruta: '/app/tesoreria/cuentas-por-cobrar/documentos' },
      { etiqueta: 'Nueva factura', llave: 'nueva-factura', deshabilitado: true },
    ]);
  }

  seleccionarCliente(valor: string): void {
    const cliente = this.clientes.find(opcion => opcion.valor === valor);
    this.clienteId.set(valor);
    if (!cliente) return;

    this.usoCfdi.set(cliente.usoCfdi);
    this.metodoPago.set(cliente.metodoPago);
    this.formaPago.set(cliente.metodoPago === 'PPD' ? '99' : cliente.formaPago);
  }

  cambiarMetodoPago(valor: string): void {
    const metodo: MetodoPagoFactura = valor === 'PPD' ? 'PPD' : 'PUE';
    this.metodoPago.set(metodo);
    this.formaPago.set(metodo === 'PPD' ? '99' : '03');
  }

  cambiarMoneda(valor: string): void {
    this.moneda.set(valor);
    this.tipoCambio.set(valor === 'USD' ? 18.4 : 1);
  }

  cambiarFechaDocumento(valor: Date | null): void {
    this.fechaDocumento.set(valor ?? new Date());
  }

  agregarPartida(): void {
    this.partidas.update(partidas => [...partidas, this.nuevaPartida()]);
  }

  duplicarPartida(partida: IPartidaFacturaFormulario): void {
    const copia = calcularPartida({
      ...partida,
      id: `tmp-${++this.contadorPartidas}`,
      impuestos: partida.impuestos.map(impuesto => ({
        ...impuesto,
        id: `tmp-imp-${++this.contadorImpuestos}`,
      })),
    });
    this.partidas.update(partidas => {
      const indice = partidas.findIndex(item => item.id === partida.id);
      const copias = [...partidas];
      copias.splice(indice + 1, 0, copia);
      return copias;
    });
  }

  eliminarPartida(id: string): void {
    this.partidas.update(partidas => partidas.length === 1
      ? [crearPartidaFacturaVacia(id, 1)]
      : partidas.filter(partida => partida.id !== id));
    if (this.idPartidaImpuestos() === id) this.cerrarImpuestos();
  }

  cambiarTipoDescuento(cambio: IPartidaSeleccionChange): void {
    this.partidas.update(partidas => partidas.map(partida => partida.id === cambio.id
      ? calcularPartida({
          ...partida,
          tipoDescuento: cambio.valor,
          porcentajeDescuento: null,
          descuento: 0,
        })
      : partida));
  }

  actualizarPartida(id: string, campo: keyof IPartidaFacturaFormulario, valor: unknown): void {
    this.partidas.update(partidas => partidas.map(partida =>
      partida.id === id ? calcularPartida({ ...partida, [campo]: valor }) : partida
    ));
  }

  actualizarPartidaDesdeVista(cambio: IPartidaValorChange): void {
    this.actualizarPartida(cambio.id, cambio.campo, cambio.valor);
  }

  alCambiarProducto(cambio: IPartidaSeleccionChange): void {
    const producto = this.opcionesProducto.find(opcion => opcion.valor === cambio.valor);
    this.partidas.update(partidas => partidas.map(partida => {
      if (partida.id !== cambio.id) return partida;
      return calcularPartida({
        ...partida,
        idProductoServicioSat: cambio.valor,
        idUnidadMedidaSat: producto?.unidad ?? partida.idUnidadMedidaSat,
        concepto: partida.concepto || producto?.etiqueta.split(' · ')[1] || '',
      });
    }));
  }

  cambiarObjetoImp(cambio: IPartidaSeleccionChange): void {
    const objetoImp = (['01', '02', '03', '04'].includes(cambio.valor) ? cambio.valor : '02') as IPartidaFacturaFormulario['objetoImp'];
    this.partidas.update(partidas => partidas.map(partida => partida.id === cambio.id
      ? calcularPartida({
          ...partida,
          objetoImp,
          impuestos: objetoImp === '02' ? partida.impuestos : [],
        })
      : partida));
  }

  abrirImpuestos(partida: IPartidaFacturaFormulario): void {
    if (partida.objetoImp !== '02') return;
    this.idPartidaImpuestos.set(partida.id);
    this.drawerVisible.set(true);
  }

  cerrarImpuestos(): void {
    this.drawerVisible.set(false);
    this.idPartidaImpuestos.set(null);
  }

  agregarImpuesto(): void {
    const partida = this.partidaImpuestos();
    if (!partida) return;

    const impuesto: IPartidaImpuesto = {
      id: `tmp-imp-${++this.contadorImpuestos}`,
      idPartidaDocumentoCxc: partida.id,
      impuestoSat: 'IVA',
      tipoFactor: 'Tasa',
      tasaOCuota: 0.16,
      esRetencion: false,
      base: Math.round((partida.subtotal - partida.descuento) * 100) / 100,
      importe: 0,
    };
    this.partidas.update(partidas => partidas.map(item => item.id === partida.id
      ? calcularPartida({ ...item, impuestos: [...item.impuestos, impuesto] })
      : item));
  }

  actualizarImpuesto(idImpuesto: string, campo: keyof IPartidaImpuesto, valor: unknown): void {
    const idPartida = this.idPartidaImpuestos();
    if (!idPartida) return;

    this.partidas.update(partidas => partidas.map(partida => partida.id !== idPartida
      ? partida
      : calcularPartida({
          ...partida,
          impuestos: partida.impuestos.map(impuesto => impuesto.id === idImpuesto
            ? { ...impuesto, [campo]: valor } as IPartidaImpuesto
            : impuesto),
        })));
  }

  actualizarImpuestoDesdeVista(cambio: IImpuestoValorChange): void {
    this.actualizarImpuesto(cambio.id, cambio.campo, cambio.valor);
  }

  eliminarImpuesto(idImpuesto: string): void {
    const idPartida = this.idPartidaImpuestos();
    if (!idPartida) return;

    this.partidas.update(partidas => partidas.map(partida => partida.id !== idPartida
      ? partida
      : calcularPartida({
          ...partida,
          impuestos: partida.impuestos.filter(impuesto => impuesto.id !== idImpuesto),
        })));
  }

  guardar(): void {
    if (!this.puedeGuardar()) return;

    const documento = this.facturaServicio.construirBorrador(
      this.formulario(),
      this.partidasCalculadas(),
      this.resumen()
    );

    this.mensajes.add({
      severity: 'success',
      summary: 'Factura guardada',
      detail: `${documento.serie} · ${documento.folio} quedó en borrador y está lista para timbrado.`,
    });
  }

  cancelar(): void {
    this.confirmacion.mostrar({
      titulo: '¿Descartar la factura?',
      mensaje: 'Se perderán los datos capturados. ¿Deseas continuar?',
      tipo: 'peligro',
      textoAceptar: 'Descartar',
      textoCancelar: 'Seguir editando',
      alConfirmar: () => this.reiniciar(),
    });
  }

  private nuevaPartida(): IPartidaFacturaFormulario {
    return crearPartidaFacturaVacia(`tmp-${++this.contadorPartidas}`, this.partidas().length + 1);
  }

  private reiniciar(): void {
    this.contadorPartidas = 0;
    this.contadorImpuestos = 0;
    this.clienteId.set('');
    this.moneda.set('MXN');
    this.tipoCambio.set(1);
    this.serie.set('FAC');
    this.folio.set('2026-002');
    this.fechaDocumento.set(new Date());
    this.fechaVencimiento.set(null);
    this.metodoPago.set('PUE');
    this.formaPago.set('03');
    this.usoCfdi.set('I01');
    this.exportacion.set('01');
    this.lugarExpedicion.set('06600');
    this.observaciones.set('');
    this.cerrarImpuestos();
    this.partidas.set([this.nuevaPartida()]);
  }
}

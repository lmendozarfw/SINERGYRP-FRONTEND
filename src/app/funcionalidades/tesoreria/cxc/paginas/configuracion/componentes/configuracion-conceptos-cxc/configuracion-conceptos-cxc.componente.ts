import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FieldTree, FormField, form, maxLength, required } from "@angular/forms/signals";
import { PIcon } from "@primeicons/angular";
import { BarraAccionesMasivasComponente } from "@compartido/componentes/barra-acciones-masivas/barra-acciones-masivas.componente";
import { CopiarTextoComponente } from "@compartido/componentes/copiar-texto/copiar-texto.componente";
import { DialogoConfirmacionServicio } from "@compartido/componentes/confirmacion/confirmacion.servicio";
import { EtiquetaFormularioComponente } from "@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";
import {
    CONCEPTO_MOVIMIENTO_CXC_VACIO,
    IConceptoMovimientoCxc,
    IConceptoMovimientoCxcItem
} from "@funcionalidades/tesoreria/cxc/modelos/concepto-movimiento-cxc.interface";
import { ButtonDirective } from "primeng/button";
import { Checkbox } from "primeng/checkbox";
import { Drawer } from "primeng/drawer";
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { TableModule } from "primeng/table";
import { Tag } from "primeng/tag";

@Component({
    selector: 'app-configuracion-conceptos-cxc',
    templateUrl: './configuracion-conceptos-cxc.componente.html',
    imports: [
        BarraAccionesMasivasComponente,
        ButtonDirective,
        Checkbox,
        CopiarTextoComponente,
        Drawer,
        EtiquetaFormularioComponente,
        FormField,
        FormsModule,
        IconField,
        InputIcon,
        InputText,
        MensajeAyudaErrorComponente,
        PIcon,
        Select,
        TableModule,
        Tag
    ]
})
export class ConfiguracionConceptosCxcComponente {
    private readonly dialogoConfirmacion = inject(DialogoConfirmacionServicio);
    private readonly idOrganizacionActual = 1;

    readonly tiposDocumento = [
        { etiqueta: 'Factura', valor: 'factura' },
        { etiqueta: 'Nota de crédito', valor: 'nota_credito' },
        { etiqueta: 'Nota de cargo', valor: 'nota_cargo' },
        { etiqueta: 'Pago', valor: 'pago' },
        { etiqueta: 'Anticipo', valor: 'anticipo' }
    ];
    readonly naturalezas = [
        { etiqueta: 'Cargo', valor: 'cargo' },
        { etiqueta: 'Abono', valor: 'abono' }
    ];
    readonly estatus = [
        { etiqueta: 'Activo', valor: true },
        { etiqueta: 'Inactivo', valor: false }
    ];

    protected readonly formulario: FieldTree<IConceptoMovimientoCxc> = this.crearFormulario();
    protected readonly conceptos = signal<IConceptoMovimientoCxcItem[]>([
        this.crearItem(1, { codigo: 'FAC-CAR', descripcion: 'Cargo por factura emitida', tipoDocumento: 'factura', naturaleza: 'cargo', requiereTimbrado: true, cuentaContableCodigo: '4010', polizaSeleccionada: 'POL-FAC', cuentaContableReemplazo: '', activo: true, esFiscal: true }),
        this.crearItem(2, { codigo: 'PAG-ABO', descripcion: 'Abono por pago recibido', tipoDocumento: 'pago', naturaleza: 'abono', requiereTimbrado: false, cuentaContableCodigo: '1010', polizaSeleccionada: '', cuentaContableReemplazo: '', activo: true, esFiscal: false }),
        this.crearItem(3, { codigo: 'NCR-CAR', descripcion: 'Nota de crédito por devolución', tipoDocumento: 'nota_credito', naturaleza: 'cargo', requiereTimbrado: true, cuentaContableCodigo: '4011', polizaSeleccionada: 'POL-NCR', cuentaContableReemplazo: '4010', activo: true, esFiscal: true }),
        this.crearItem(4, { codigo: 'ANT-ABO', descripcion: 'Anticipo de clientes', tipoDocumento: 'anticipo', naturaleza: 'abono', requiereTimbrado: false, cuentaContableCodigo: '4030', polizaSeleccionada: '', cuentaContableReemplazo: '', activo: true, esFiscal: false }),
        this.crearItem(5, { codigo: 'NCA-CAR', descripcion: 'Nota de cargo por intereses', tipoDocumento: 'nota_cargo', naturaleza: 'cargo', requiereTimbrado: false, cuentaContableCodigo: '4020', polizaSeleccionada: '', cuentaContableReemplazo: '', activo: false, esFiscal: true }),
        this.crearItem(6, { codigo: 'FAC-INT', descripcion: 'Cargo por factura internacional', tipoDocumento: 'factura', naturaleza: 'cargo', requiereTimbrado: true, cuentaContableCodigo: '4015', polizaSeleccionada: 'POL-INT', cuentaContableReemplazo: '', activo: false, esFiscal: false })
    ]);
    protected readonly busqueda = signal('');
    protected readonly filtroTipoDocumento = signal<string | null>(null);
    protected readonly filtroNaturaleza = signal<string | null>(null);
    protected readonly filtroActivo = signal<boolean | null>(null);
    protected readonly seleccion = signal<IConceptoMovimientoCxcItem[]>([]);
    protected readonly drawerVisible = signal(false);
    protected readonly editandoId = signal<number | null>(null);
    protected readonly tituloDrawer = computed(() =>
        this.editandoId() ? 'Editar concepto de movimiento' : 'Nuevo concepto de movimiento'
    );

    protected readonly conceptosFiltrados = computed(() => {
        const texto = this.busqueda().trim().toLowerCase();
        const tipo = this.filtroTipoDocumento();
        const naturaleza = this.filtroNaturaleza();
        const activo = this.filtroActivo();

        return this.conceptos().filter(concepto => {
            const coincideTexto = !texto ||
                concepto.codigo.toLowerCase().includes(texto) ||
                concepto.descripcion.toLowerCase().includes(texto) ||
                (concepto.cuentaContableCodigo ?? '').toLowerCase().includes(texto);
            return coincideTexto &&
                (!tipo || concepto.tipoDocumento === tipo) &&
                (!naturaleza || concepto.naturaleza === naturaleza) &&
                (activo === null || concepto.activo === activo);
        });
    });

    protected readonly codigoDuplicado = computed(() => {
        const codigo = String(this.formulario.codigo().value() ?? '').trim().toUpperCase();
        if (!codigo) return false;
        return this.conceptos().some(concepto =>
            concepto.codigo.toUpperCase() === codigo && concepto.id !== this.editandoId()
        );
    });

    private siguienteId = 7;

    abrirNuevo(): void {
        this.editandoId.set(null);
        this.reiniciarFormulario(this.formulario);
        this.drawerVisible.set(true);
    }

    editar(concepto?: IConceptoMovimientoCxcItem): void {
        if (!concepto) return;
        this.editandoId.set(concepto.id);
        this.formulario().reset({ ...concepto });
        this.drawerVisible.set(true);
    }

    cerrarDrawer(): void {
        this.drawerVisible.set(false);
        this.editandoId.set(null);
        this.reiniciarFormulario(this.formulario);
    }

    guardar(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid() || this.codigoDuplicado()) return;

        const valores = this.obtenerValores(this.formulario);
        const id = this.editandoId();
        if (id !== null) {
            this.conceptos.update(items => items.map(item => item.id === id ? { ...item, ...valores, id } : item));
        } else {
            this.conceptos.update(items => [{ ...valores, id: this.siguienteId++ }, ...items]);
        }
        this.cerrarDrawer();
    }

    eliminar(concepto: IConceptoMovimientoCxcItem): void {
        this.dialogoConfirmacion.mostrar({
            titulo: 'Eliminar concepto',
            mensaje: `¿Eliminar el concepto ${concepto.codigo}? Esta acción no se puede deshacer.`,
            tipo: 'peligro',
            textoAceptar: 'Eliminar',
            alConfirmar: () => this.conceptos.update(items => items.filter(item => item.id !== concepto.id))
        });
    }

    eliminarSeleccion(): void {
        const ids = new Set(this.seleccion().map(item => item.id));
        this.dialogoConfirmacion.mostrar({
            titulo: 'Eliminar conceptos',
            mensaje: `¿Eliminar los ${ids.size} conceptos seleccionados?`,
            tipo: 'peligro',
            textoAceptar: 'Eliminar',
            alConfirmar: () => {
                this.conceptos.update(items => items.filter(item => !ids.has(item.id)));
                this.limpiarSeleccion();
            }
        });
    }

    limpiarSeleccion(): void {
        this.seleccion.set([]);
    }

    limpiarFiltros(): void {
        this.busqueda.set('');
        this.filtroTipoDocumento.set(null);
        this.filtroNaturaleza.set(null);
        this.filtroActivo.set(null);
    }

    obtenerEtiquetaTipoDocumento(valor: string): string {
        return this.tiposDocumento.find(opcion => opcion.valor === valor)?.etiqueta ?? valor;
    }

    obtenerEtiquetaNaturaleza(valor: string): string {
        return this.naturalezas.find(opcion => opcion.valor === valor)?.etiqueta ?? valor;
    }

    severidadNaturaleza(valor: string): 'info' | 'success' {
        return valor === 'cargo' ? 'info' : 'success';
    }

    private crearFormulario(): FieldTree<IConceptoMovimientoCxc> {
        const modelo = signal<IConceptoMovimientoCxc>({ ...CONCEPTO_MOVIMIENTO_CXC_VACIO });
        return form(modelo, (campo) => {
            required(campo.codigo, { message: 'El código es obligatorio.' });
            maxLength(campo.codigo, 30, { message: 'Usa máximo 30 caracteres.' });
            required(campo.descripcion, { message: 'La descripción es obligatoria.' });
            maxLength(campo.descripcion, 200, { message: 'Usa máximo 200 caracteres.' });
            required(campo.tipoDocumento, { message: 'El tipo de documento es obligatorio.' });
            required(campo.naturaleza, { message: 'La naturaleza es obligatoria.' });
            maxLength(campo.cuentaContableCodigo, 20, { message: 'Usa máximo 20 caracteres.' });
            maxLength(campo.polizaSeleccionada, 9, { message: 'Usa máximo 9 caracteres.' });
            maxLength(campo.cuentaContableReemplazo, 20, { message: 'Usa máximo 20 caracteres.' });
        });
    }

    private crearItem(id: number, valores: Omit<IConceptoMovimientoCxc, 'id' | 'idOrganizacion'>): IConceptoMovimientoCxcItem {
        return { ...valores, id, idOrganizacion: this.idOrganizacionActual };
    }

    private obtenerValores(formulario: FieldTree<IConceptoMovimientoCxc>): IConceptoMovimientoCxc {
        return {
            idOrganizacion: this.idOrganizacionActual,
            codigo: String(formulario.codigo().value() ?? '').trim().toUpperCase(),
            descripcion: String(formulario.descripcion().value() ?? '').trim(),
            tipoDocumento: String(formulario.tipoDocumento().value() ?? ''),
            naturaleza: String(formulario.naturaleza().value() ?? ''),
            requiereTimbrado: formulario.requiereTimbrado().value() === true,
            cuentaContableCodigo: this.normalizarTexto(formulario.cuentaContableCodigo().value()),
            polizaSeleccionada: this.normalizarTexto(formulario.polizaSeleccionada().value()),
            cuentaContableReemplazo: this.normalizarTexto(formulario.cuentaContableReemplazo().value()),
            activo: formulario.activo().value() === true,
            esFiscal: formulario.esFiscal().value() === true
        };
    }

    private normalizarTexto(valor: unknown): string {
        if (valor === null || valor === undefined) return '';
        return String(valor).trim();
    }

    private reiniciarFormulario(formulario: FieldTree<IConceptoMovimientoCxc>): void {
        formulario().reset({ ...CONCEPTO_MOVIMIENTO_CXC_VACIO });
    }
}

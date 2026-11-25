import { Component, computed, signal } from "@angular/core";
import { FieldTree, FormField, form, max, maxLength, min, required } from "@angular/forms/signals";
import { PIcon } from "@primeicons/angular";
import { ButtonDirective } from "primeng/button";
import { InputNumber } from "primeng/inputnumber";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { CellEditor, EditableColumn, Table } from "primeng/table";
import { Tag } from "primeng/tag";
import {
    IFilaSerieFolioDocumento,
    IFilaVistaSerieFolioDocumento,
    ISerieFolioDocumento,
    SERIE_FOLIO_DOCUMENTO_VACIA
} from "@funcionalidades/tesoreria/cxc/modelos/serie-folio-documento.interface";
import { CatalogoVacioComponente } from "@funcionalidades/tesoreria/catalogos/componentes/catalogo-vacio/catalogo-vacio.componente";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";

@Component({
    selector: 'app-configuracion-folios-cxc',
    templateUrl: './configuracion-folios-cxc.componente.html',
    imports: [
        ButtonDirective,
        CatalogoVacioComponente,
        CellEditor,
        EditableColumn,
        FormField,
        InputNumber,
        InputText,
        MensajeAyudaErrorComponente,
        PIcon,
        Select,
        Table,
        Tag
    ]
})
export class ConfiguracionFoliosCxcComponente {
    readonly titulo = 'Folios de documentos';
    readonly descripcion = 'Define las series y el folio inicial de cada documento por unidad de negocio.';
    readonly estatus = [
        { label: 'Activo', value: true },
        { label: 'Inactivo', value: false }
    ];
    readonly unidadesNegocioOpciones = [
        { label: 'Matriz', value: 1 },
        { label: 'Planta norte', value: 2 },
        { label: 'Sucursal sur', value: 3 }
    ];
    readonly tiposDocumento = [
        { label: 'FAC · Factura', value: 'FAC' },
        { label: 'COT · Cotización', value: 'COT' },
        { label: 'REM · Remisión', value: 'REM' },
        { label: 'NCR · Nota de crédito', value: 'NCR' },
        { label: 'REC · Recibo', value: 'REC' }
    ];

    private readonly idOrganizacionActual = 1;

    protected readonly formulario: FieldTree<ISerieFolioDocumento> = this.crearFormulario();
    protected readonly seriesFolios = signal<IFilaSerieFolioDocumento[]>([
        this.crearFila(1, { idOrganizacion: 1, idUnidadNegocio: 1, tipoDocumento: 'FAC', serie: 'A', siguienteFolio: 105, activo: true }),
        this.crearFila(2, { idOrganizacion: 1, idUnidadNegocio: 1, tipoDocumento: 'COT', serie: 'A', siguienteFolio: 42, activo: true }),
        this.crearFila(3, { idOrganizacion: 1, idUnidadNegocio: 2, tipoDocumento: 'FAC', serie: 'PN', siguienteFolio: 12, activo: false })
    ]);
    protected readonly filas = computed<IFilaVistaSerieFolioDocumento[]>(() => [
        {
            ...SERIE_FOLIO_DOCUMENTO_VACIA,
            id: 0,
            idOrganizacion: this.idOrganizacionActual,
            formulario: this.formulario,
            esNueva: true
        },
        ...this.seriesFolios().map(serieFolio => ({ ...serieFolio, esNueva: false }))
    ]);

    private siguienteId = 4;

    guardarSerieFolio(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) return;

        const valores = this.obtenerValores(this.formulario);
        this.seriesFolios.update(series => [this.crearFila(this.siguienteId++, valores), ...series]);
        this.reiniciarFormulario(this.formulario);
    }

    guardarCambios(serieFolio: IFilaSerieFolioDocumento): void {
        serieFolio.formulario().markAsTouched();
        if (serieFolio.formulario().invalid()) return;

        this.seriesFolios.update(series => series.map(item =>
            item.id === serieFolio.id ? { ...item, ...this.obtenerValores(serieFolio.formulario), id: item.id } : item
        ));
        serieFolio.formulario().reset();
    }

    eliminarSerieFolio(serieFolio: IFilaSerieFolioDocumento): void {
        this.seriesFolios.update(series => series.filter(item => item.id !== serieFolio.id));
    }

    obtenerNombreUnidadNegocio(idUnidadNegocio: number | null): string {
        return this.unidadesNegocioOpciones.find(opcion => opcion.value === idUnidadNegocio)?.label ?? 'Sin unidad';
    }

    obtenerNombreTipoDocumento(tipoDocumento: string | null): string {
        return this.tiposDocumento.find(opcion => opcion.value === tipoDocumento)?.label ?? 'Sin tipo';
    }

    private crearFormulario(serieFolio?: ISerieFolioDocumento): FieldTree<ISerieFolioDocumento> {
        const modelo = signal<ISerieFolioDocumento>({ ...SERIE_FOLIO_DOCUMENTO_VACIA, ...serieFolio });
        return form(modelo, (campo) => {
            required(campo.idUnidadNegocio, { message: 'La unidad de negocio es obligatoria.' });
            required(campo.tipoDocumento, { message: 'El tipo de documento es obligatorio.' });
            maxLength(campo.tipoDocumento, 30, { message: 'Usa máximo 30 caracteres.' });
            maxLength(campo.serie, 25, { message: 'Usa máximo 25 caracteres.' });
            required(campo.siguienteFolio, { message: 'El siguiente folio es obligatorio.' });
            min(campo.siguienteFolio, 1, { message: 'El folio debe ser mayor a 0.' });
            max(campo.siguienteFolio, 999999999999, { message: 'El folio es demasiado grande.' });
        });
    }

    private crearFila(id: number, serieFolio: ISerieFolioDocumento): IFilaSerieFolioDocumento {
        return {
            ...serieFolio,
            id,
            idOrganizacion: this.idOrganizacionActual,
            formulario: this.crearFormulario(serieFolio)
        };
    }

    private obtenerValores(formulario: FieldTree<ISerieFolioDocumento>): ISerieFolioDocumento {
        return {
            idOrganizacion: this.idOrganizacionActual,
            idUnidadNegocio: formulario.idUnidadNegocio().value(),
            tipoDocumento: String(formulario.tipoDocumento().value() ?? '').trim().toUpperCase(),
            serie: String(formulario.serie().value() ?? '').trim().toUpperCase(),
            siguienteFolio: Number(formulario.siguienteFolio().value() ?? 1),
            activo: formulario.activo().value() === true
        };
    }

    private reiniciarFormulario(formulario: FieldTree<ISerieFolioDocumento>): void {
        formulario().reset({ ...SERIE_FOLIO_DOCUMENTO_VACIA });
    }
}

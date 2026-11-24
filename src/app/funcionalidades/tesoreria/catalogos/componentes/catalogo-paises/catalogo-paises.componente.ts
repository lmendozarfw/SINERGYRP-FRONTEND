import { Component, computed, signal } from "@angular/core";
import { FieldTree, form, FormField, minLength, pattern, required } from "@angular/forms/signals";
import { PIcon } from "@primeicons/angular";
import { ButtonDirective } from "primeng/button";
import { InputText } from "primeng/inputtext";
import { CellEditor, EditableColumn, Table } from "primeng/table";
import { IFilaPais, IFilaVistaPais, IPais, PAIS_VACIO } from "../../modelos/pais.interface";
import { MensajeAyudaErrorComponente } from "@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente";

@Component({
    selector: 'app-catalogo-paises',
    imports: [
    ButtonDirective,
    CellEditor,
    EditableColumn,
    FormField,
    InputText,
    PIcon,
    Table,
    MensajeAyudaErrorComponente
],
    templateUrl: './catalogo-paises.componente.html'
})
export class CatalogoPaisesComponente {
    readonly titulo = 'Países';
    readonly descripcion = 'Mantén el catálogo de países utilizado en direcciones, proveedores y datos fiscales.';

    protected readonly formulario: FieldTree<IPais> = this.crearFormulario();

    protected readonly paises = signal<IFilaPais[]>([
        this.crearFila(1, { codigoPais: 'MX', nombre: 'México', codigoMoneda: 'MXN' }),
        this.crearFila(2, { codigoPais: 'EEUU', nombre: 'Estados unidos de Ámerica', codigoMoneda: 'USD' })
    ]);

    protected readonly filas = computed<IFilaVistaPais[]>(() => [
        { id: 0, ...PAIS_VACIO, formulario: this.formulario, esNueva: true },
        ...this.paises().map(pais => ({ ...pais, esNueva: false }))
    ]);

    private siguienteId = 3;

    guardarPais(): void {
        this.formulario().markAsTouched();
        if (this.formulario().invalid()) return;

        const valores = this.obtenerValores(this.formulario);
        this.paises.update(paises => [this.crearFila(this.siguienteId++, valores), ...paises]);
        this.reiniciarFormulario(this.formulario);
    }

    guardarCambios(pais: IFilaPais): void {
        pais.formulario().markAsTouched();
        if (pais.formulario().invalid()) return;

        this.paises.update(paises => paises.map(item =>
            item.id === pais.id ? { ...item, ...this.obtenerValores(pais.formulario) } : item
        ));
        pais.formulario().reset();
    }

    eliminarPais(pais: IFilaPais): void {
        this.paises.update(paises => paises.filter(item => item.id !== pais.id));
    }

    private crearFormulario(pais?: IPais): FieldTree<IPais> {
        const modelo = signal<IPais>({ ...PAIS_VACIO, ...pais });
        return form(modelo, (campo) => {
            required(campo.codigoPais, { message: 'El código de país es obligatorio.' });
            pattern(campo.codigoPais, /^[A-Za-z]{2,5}$/, { message: 'Usa de 2 a 5 letras.' });
            required(campo.nombre, { message: 'El nombre es obligatorio.' });
            minLength(campo.nombre, 2, { message: 'Escribe al menos 2 caracteres.' });
            pattern(campo.codigoMoneda, /^[A-Za-z]{3}$/, {
                when: ({ value }) => !!value().trim(),
                message: 'Usa 3 letras, por ejemplo MXN.'
            });
        });
    }

    private crearFila(id: number, pais: IPais): IFilaPais {
        return { id, ...pais, formulario: this.crearFormulario(pais) };
    }

    private obtenerValores(formulario: FieldTree<IPais>): IPais {
        return {
            codigoPais: String(formulario.codigoPais().value() ?? '').trim().toUpperCase(),
            nombre: String(formulario.nombre().value() ?? '').trim(),
            codigoMoneda: String(formulario.codigoMoneda().value() ?? '').trim().toUpperCase()
        };
    }

    private reiniciarFormulario(formulario: FieldTree<IPais>): void {
        formulario().reset({ ...PAIS_VACIO });
    }
}

import { Component, computed, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonDirective } from "primeng/button";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { SelectModule } from "primeng/select";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { PIcon } from "@primeicons/angular";

interface MonedaCatalogo {
    id: number;
    codigo: string;
    nombre: string;
    decimales: number;
    activa: boolean;
}

interface FilaMoneda extends MonedaCatalogo {
    formulario: FormGroup;
}

interface FilaVista extends FilaMoneda {
    esNueva: boolean;
}

@Component({
    selector: 'app-catalogo-monedas',
    templateUrl: './catalogo-monedas.componente.html',
    imports: [ButtonDirective, PIcon, SelectModule, TableModule, InputNumberModule, TagModule, InputTextModule, ReactiveFormsModule]
})
export class CatalogoMonedasComponente {
    readonly estadosMoneda = [
        { label: 'Activa', value: true },
        { label: 'Inactiva', value: false }
    ];

    readonly formularioMoneda = this.crearFormulario();

    readonly monedas = signal<FilaMoneda[]>([
        this.crearFila({ id: 1, codigo: 'MXN', nombre: 'Peso mexicano', decimales: 2, activa: true }),
        this.crearFila({ id: 2, codigo: 'USD', nombre: 'Dólar estadounidense', decimales: 2, activa: true }),
        this.crearFila({ id: 3, codigo: 'EUR', nombre: 'Euro', decimales: 2, activa: false }),
    ]);

    readonly filas = computed<FilaVista[]>(() => [
        { id: 0, codigo: '', nombre: '', decimales: 0, activa: false, formulario: this.formularioMoneda, esNueva: true },
        ...this.monedas().map(moneda => ({ ...moneda, esNueva: false }))
    ]);

    private siguienteId = 4;

    esInvalido(formulario: FormGroup, campo: string): boolean {
        const control = formulario.get(campo);
        return !!control && control.invalid && control.touched;
    }

    guardarMoneda(): void {
        if (this.formularioMoneda.invalid) {
            this.formularioMoneda.markAllAsTouched();
            return;
        }

        this.monedas.update(monedas => [this.crearFila({ id: this.siguienteId++, ...this.obtenerValores(this.formularioMoneda) }), ...monedas]);
        this.reiniciarFormulario(this.formularioMoneda);
    }

    guardarCambios(moneda: FilaMoneda): void {
        if (moneda.formulario.invalid) {
            moneda.formulario.markAllAsTouched();
            return;
        }

        this.monedas.update(monedas => monedas.map(item =>
            item.id === moneda.id ? { ...item, ...this.obtenerValores(moneda.formulario) } : item
        ));
        moneda.formulario.markAsPristine();
        moneda.formulario.markAsUntouched();
    }

    eliminarMoneda(moneda: FilaMoneda): void {
        this.monedas.update(monedas => monedas.filter(item => item.id !== moneda.id));
    }

    private crearFila(moneda: MonedaCatalogo): FilaMoneda {
        return { ...moneda, formulario: this.crearFormulario(moneda) };
    }

    private crearFormulario(moneda?: MonedaCatalogo) {
        return new FormGroup({
            codigo: new FormControl(moneda?.codigo ?? '', { nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5), Validators.pattern(/^[A-Za-z]{2,5}$/)] }),
            nombre: new FormControl(moneda?.nombre ?? '', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
            decimales: new FormControl<number | null>(moneda?.decimales ?? null, [Validators.required, Validators.min(0), Validators.max(6)]),
            activa: new FormControl<boolean | null>(moneda?.activa ?? null, Validators.required)
        });
    }

    private obtenerValores(formulario: FormGroup): Omit<MonedaCatalogo, 'id'> {
        const valores = formulario.getRawValue();
        return {
            codigo: String(valores['codigo'] ?? '').trim().toUpperCase(),
            nombre: String(valores['nombre'] ?? '').trim(),
            decimales: Number(valores['decimales'] ?? 0),
            activa: valores['activa'] === true
        };
    }

    private reiniciarFormulario(formulario: FormGroup): void {
        formulario.reset({ codigo: '', nombre: '', decimales: null, activa: null });
        formulario.markAsPristine();
        formulario.markAsUntouched();
    }
}

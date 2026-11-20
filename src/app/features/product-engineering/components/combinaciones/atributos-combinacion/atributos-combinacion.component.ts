import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { FormLabelComponent } from '../../../../../shared/components/form-label/form-label.component';
import { MensajeAyudaErrorComponent } from '../../../../../shared/components/mesaje-ayuda-error/mensaje-ayuda-error.component';
import { AtributoCombinacion, AtributoOpcion } from '../../../models/combinacion.model';

@Component({
  selector: 'app-atributos-combinacion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, Select, Tag, FormLabelComponent, MensajeAyudaErrorComponent],
  templateUrl: './atributos-combinacion.component.html',
  styleUrl: './atributos-combinacion.component.scss',
})
export class AtributosCombinacionComponent {
  readonly atributos = input.required<AtributoCombinacion[]>();
  readonly valores = input.required<Record<string, string>>();
  readonly codigo = input.required<string>();
  readonly modeloBase = input<string>('RDX');

  readonly valoresChange = output<Record<string, string>>();

  readonly intentoContinuar = signal(false);

  readonly todosSeleccionados = computed(() =>
    this.atributos().every((atributo) => Boolean(this.valores()[atributo.id])),
  );

  readonly resumen = computed(() =>
    this.atributos().map((atributo) => ({
      id: atributo.id,
      nombre: atributo.nombre,
      etiqueta: this.etiqueta(atributo, this.valores()[atributo.id]),
    })),
  );

  seleccionar(atributoId: string, opcion: AtributoOpcion | null): void {
    const valores = { ...this.valores() };

    if (opcion) {
      valores[atributoId] = opcion.value;
    } else {
      delete valores[atributoId];
    }

    this.valoresChange.emit(valores);
  }

  esInvalido(atributoId: string): boolean {
    return this.intentoContinuar() && !this.valores()[atributoId];
  }

  validar(): boolean {
    this.intentoContinuar.set(true);
    return this.todosSeleccionados();
  }

  reiniciarValidacion(): void {
    this.intentoContinuar.set(false);
  }

  private etiqueta(atributo: AtributoCombinacion, value?: string): string {
    if (!value) {
      return 'Sin seleccionar';
    }

    return atributo.opciones.find((opcion) => opcion.value === value)?.label ?? value;
  }
}

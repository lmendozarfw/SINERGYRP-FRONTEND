import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { EtiquetaFormularioComponente } from '@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente';
import { MensajeAyudaErrorComponente } from '@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente';
import { IAtributoCombinacion, IAtributoOpcion } from '@funcionalidades/ingenieria-producto/modelos/combinacion';

@Component({
  selector: 'app-atributos-combinacion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, Select, Tag, EtiquetaFormularioComponente, MensajeAyudaErrorComponente],
  templateUrl: './atributos-combinacion.componente.html',
  styleUrl: './atributos-combinacion.componente.scss',
})
export class AtributosCombinacionComponente {
  readonly atributos = input.required<IAtributoCombinacion[]>();
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

  seleccionar(atributoId: string, opcion: IAtributoOpcion | null): void {
    const valores = { ...this.valores() };

    if (opcion) {
      valores[atributoId] = opcion.valor;
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

  private etiqueta(atributo: IAtributoCombinacion, valor?: string): string {
    if (!valor) {
      return 'Sin seleccionar';
    }

    return atributo.opciones.find((opcion) => opcion.valor === valor)?.etiqueta ?? valor;
  }
}

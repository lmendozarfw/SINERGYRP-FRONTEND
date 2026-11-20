import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { ThLarge } from '@primeicons/angular';

import { FormLabelComponent } from '../../../../../shared/components/form-label/form-label.component';
import { MensajeAyudaErrorComponent } from '../../../../../shared/components/mesaje-ayuda-error/mensaje-ayuda-error.component';
import {
  MaterialAsignado,
  OpcionSelectSimple,
  PiezaCombinacion,
  VersionCombinacion,
} from '../../../models/combinacion.model';

interface FilaMaterial {
  pieza: PiezaCombinacion;
  material: string;
}

@Component({
  selector: 'app-materiales-combinacion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    FormsModule,
    Select,
    Tag,
    FormLabelComponent,
    MensajeAyudaErrorComponent,
    ThLarge,
  ],
  templateUrl: './materiales-combinacion.component.html',
  styleUrl: './materiales-combinacion.component.scss',
})
export class MaterialesCombinacionComponent {
  readonly piezas = input.required<PiezaCombinacion[]>();
  readonly materiales = input.required<OpcionSelectSimple[]>();
  readonly codigo = input.required<string>();
  readonly versiones = input.required<VersionCombinacion[]>();

  readonly materialesChange = output<MaterialAsignado[]>();

  readonly intentoContinuar = signal(false);

  readonly filas = computed<FilaMaterial[]>(() => {
    const materialesPrevios = this.versiones()[0]?.materiales ?? [];

    return this.piezas().map((pieza) => ({
      pieza,
      material: materialesPrevios.find((item) => item.piezaId === pieza.id)?.material ?? '',
    }));
  });

  readonly todosAsignados = computed(() =>
    this.filas().every((fila) => Boolean(fila.material)),
  );

  readonly proximaVersion = computed(() => this.versiones().length + 1);

  readonly hayVersiones = computed(() => this.versiones().length > 0);

  seleccionar(piezaId: string, material: string | null): void {
    const filas = this.filas().map((fila) =>
      fila.pieza.id === piezaId ? { ...fila, material: material ?? '' } : fila,
    );

    this.materialesChange.emit(
      filas.map((fila) => ({
        piezaId: fila.pieza.id,
        piezaNombre: fila.pieza.nombre,
        material: fila.material,
      })),
    );
  }

  esInvalido(piezaId: string): boolean {
    return this.intentoContinuar() && !this.filas().find((fila) => fila.pieza.id === piezaId)?.material;
  }

  validar(): boolean {
    this.intentoContinuar.set(true);
    return this.todosAsignados();
  }

  reiniciarValidacion(): void {
    this.intentoContinuar.set(false);
  }

  etiquetaMaterial(value: string): string {
    return this.materiales().find((material) => material.value === value)?.label ?? value;
  }
}

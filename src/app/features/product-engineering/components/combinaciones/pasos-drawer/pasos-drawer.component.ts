import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { Check, Lock } from '@primeicons/angular';

export interface PasoDrawer {
  id: number;
  titulo: string;
  descripcion: string;
  bloqueado?: boolean;
}

@Component({
  selector: 'app-pasos-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StepperModule, Check, Lock],
  templateUrl: './pasos-drawer.component.html',
  styleUrl: './pasos-drawer.component.scss',
})
export class PasosDrawerComponent {
  readonly pasos = input.required<PasoDrawer[]>();
  readonly pasoActivo = input.required<number>();
  readonly permitirNavegacionLibre = input(false);

  readonly pasoActivoChange = output<number>();

  private readonly pasosCompletados = signal<Set<number>>(new Set());

  readonly pasosConEstado = computed(() =>
    this.pasos().map((paso) => ({
      ...paso,
      completado: this.pasosCompletados().has(paso.id),
    })),
  );

  puedeSeleccionar(paso: PasoDrawer): boolean {
    if (paso.bloqueado) {
      return false;
    }

    const actual = this.pasoActivo();
    if (!this.permitirNavegacionLibre() && paso.id > actual) {
      return false;
    }

    return true;
  }

  estaCompletado(pasoId: number): boolean {
    return this.pasosCompletados().has(pasoId);
  }

  marcarCompletado(pasoId: number): void {
    this.pasosCompletados.update((pasos) => new Set(pasos).add(pasoId));
  }

  desmarcarDesde(pasoId: number): void {
    this.pasosCompletados.update(
      (pasos) => new Set([...pasos].filter((id) => id >= pasoId)),
    );
  }

  reiniciar(): void {
    this.pasosCompletados.set(new Set());
  }

  alCambiarValor(id: number | undefined): void {
    if (!id) {
      return;
    }

    const paso = this.pasos().find((item) => item.id === id);
    if (paso && this.puedeSeleccionar(paso)) {
      this.pasoActivoChange.emit(id);
    }
  }

  irA(paso: PasoDrawer): void {
    if (this.puedeSeleccionar(paso)) {
      this.pasoActivoChange.emit(paso.id);
    }
  }
}

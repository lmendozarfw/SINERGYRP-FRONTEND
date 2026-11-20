import { Component, inject } from '@angular/core';
import { Calendar, Check, CheckCircle, Clock, InfoCircle, User } from '@primeicons/angular';

import { TarjetaComponent } from '../../../../shared/components/tarjeta/tarjeta.component';
import { NewProductWizardStore } from '../../stores/new-product-wizard.store';

type EstadoValidacion = 'aprobada' | 'pendiente';

interface ValidacionArea {
  id: string;
  area: string;
  detalle: string;
  responsable: string;
  rol: string;
  estado: EstadoValidacion;
  fecha: string;
  comentario: string;
}

@Component({
  selector: 'app-revision-liberacion',
  imports: [Calendar, Check, CheckCircle, Clock, InfoCircle, User, TarjetaComponent],
  templateUrl: './revision-liberacion.component.html',
  styleUrl: './revision-liberacion.component.scss',
})
export class RevisionLiberacionComponent {

  protected readonly store = inject(NewProductWizardStore);

  protected readonly totalCombinaciones = 8;

  protected readonly validaciones: ValidacionArea[] = [
    {
      id: 'diseno',
      area: 'Diseño',
      detalle: 'Revisión visual y de materiales',
      responsable: 'María Torres',
      rol: 'Líder de diseño',
      estado: 'aprobada',
      fecha: '18 nov 2026 · 10:24',
      comentario:
        'Paleta, materiales e imagen de referencia aprobados. No se requieren ajustes visuales.',
    },
    {
      id: 'desarrollo',
      area: 'Desarrollo',
      detalle: 'Especificaciones técnicas',
      responsable: 'Carlos Ramírez',
      rol: 'Ingeniería de desarrollo',
      estado: 'aprobada',
      fecha: '18 nov 2026 · 15:02',
      comentario:
        'Corridas, equivalencias y consumos validados. Las combinaciones son compatibles con producción.',
    },
    {
      id: 'directivos',
      area: 'Directivos',
      detalle: 'Viabilidad comercial y costos',
      responsable: 'Comité de producto',
      rol: 'Dirección comercial y operaciones',
      estado: 'pendiente',
      fecha: 'Sin fecha de revisión',
      comentario:
        'A la espera de la revisión final de costos y viabilidad comercial.',
    },
  ];

  protected get aprobadas(): number {
    return this.validaciones.filter((validacion) => validacion.estado === 'aprobada').length;
  }

  protected get progreso(): number {
    return (this.aprobadas / this.validaciones.length) * 100;
  }

  protected get areaPendiente(): string {
    return this.validaciones.find((validacion) => validacion.estado === 'pendiente')?.area ?? '';
  }

  protected get codigoModelo(): string {
    return this.store.modeloForm.controls.codigo.value || '—';
  }
}

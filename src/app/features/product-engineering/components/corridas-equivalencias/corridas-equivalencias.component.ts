import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

import { FormLabelComponent } from '../../../../shared/components/form-label/form-label.component';
import { MensajeAyudaErrorComponent } from '../../../../shared/components/mesaje-ayuda-error/mensaje-ayuda-error.component';
import { TarjetaComponent } from '../../../../shared/components/tarjeta/tarjeta.component';
import {
  SistemaEquivalencia,
  TablaEquivalenciasComponent,
  TallaEquivalencia,
} from '../tabla-equivalencias/tabla-equivalencias.component';

interface CorridaOpcion {
  clave: string;
  label: string;
  desde: number;
  cantidad: number;
}

@Component({
  selector: 'app-corridas-equivalencias',
  imports: [
    ReactiveFormsModule,
    Select,
    FormLabelComponent,
    MensajeAyudaErrorComponent,
    TarjetaComponent,
    TablaEquivalenciasComponent,
  ],
  templateUrl: './corridas-equivalencias.component.html',
  styleUrl: './corridas-equivalencias.component.scss',
})
export class CorridasEquivalenciasComponent {
  readonly sistemas: SistemaEquivalencia[] = [
    { clave: 'mx', nombre: 'México (MX)' },
    { clave: 'eu', nombre: 'Europa (EU)' },
    { clave: 'us', nombre: 'Estados Unidos (US)' },
    { clave: 'uk', nombre: 'Reino Unido (UK)' },
  ];

  readonly corridas: CorridaOpcion[] = [
    { clave: 'estandar', label: 'Estándar · MX 25 a 30', desde: 25, cantidad: 6 },
    { clave: 'amplia', label: 'Amplia · MX 24 a 31', desde: 24, cantidad: 8 },
    { clave: 'reducida', label: 'Reducida · MX 26 a 29', desde: 26, cantidad: 4 },
    { clave: 'extra', label: 'Extra amplia · MX 23 a 32', desde: 23, cantidad: 10 },
  ];

  readonly corridaForm = new FormGroup({
    corrida: new FormControl('estandar', { nonNullable: true }),
    sistemaPrincipal: new FormControl('mx', { nonNullable: true }),
    tallaBase: new FormControl(27, { nonNullable: true }),
  });

  private readonly tallasState = signal<TallaEquivalencia[]>(this.crearTallas(this.corridas[0]));
  readonly tallas = this.tallasState.asReadonly();

  constructor() {
    this.corridaForm.controls.corrida.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((clave) => this.actualizarCorrida(clave));

    this.corridaForm.controls.tallaBase.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((id) => this.asegurarTallaBaseActiva(id));
  }

  get opcionesTallaBase(): { label: string; value: number }[] {
    return this.tallas().map((talla) => ({
      label: `MX ${talla.valores['mx']}`,
      value: talla.id,
    }));
  }

  get sistemaPrincipal(): string {
    return this.corridaForm.controls.sistemaPrincipal.value;
  }

  get tallaBaseId(): number {
    return this.corridaForm.controls.tallaBase.value;
  }

  private actualizarCorrida(clave: string): void {
    const corrida = this.corridaPorClave(clave);
    this.tallasState.set(this.crearTallas(corrida));
    this.corridaForm.controls.tallaBase.setValue(this.tallaBaseSugerida(corrida), {
      emitEvent: false,
    });
  }

  private asegurarTallaBaseActiva(id: number): void {
    this.tallasState.update((tallas) =>
      tallas.map((talla) => (talla.id === id ? { ...talla, activa: true } : talla)),
    );
  }

  private corridaPorClave(clave: string): CorridaOpcion {
    return this.corridas.find((corrida) => corrida.clave === clave) ?? this.corridas[0];
  }

  private tallaBaseSugerida(corrida: CorridaOpcion): number {
    return corrida.desde + Math.floor((corrida.cantidad - 1) / 2);
  }

  private crearTallas(corrida: CorridaOpcion): TallaEquivalencia[] {
    return Array.from({ length: corrida.cantidad }, (_, index) => {
      const mx = corrida.desde + index;

      return {
        id: mx,
        activa: true,
        valores: {
          mx: String(mx),
          eu: String(mx + 14),
          us: String(mx - 18),
          uk: String(mx - 19),
        },
      };
    });
  }
}

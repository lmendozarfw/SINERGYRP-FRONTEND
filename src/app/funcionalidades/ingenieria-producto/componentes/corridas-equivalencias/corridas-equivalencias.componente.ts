import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import {
  SistemaEquivalencia,
  TablaEquivalenciasComponente,
  TallaEquivalencia,
} from '../tabla-equivalencias/tabla-equivalencias.componente';
import { EtiquetaFormularioComponente } from '@compartido/componentes/etiqueta-formulario/etiqueta-formulario.componente';
import { MensajeAyudaErrorComponente } from '@compartido/componentes/mesaje-ayuda-error/mensaje-ayuda-error.componente';
import { TarjetaComponente } from '@compartido/componentes/tarjeta/tarjeta.componente';
import { IOpcionSelector } from '@compartido/interfaces/selector.interface';

interface CorridaOpcion {
  clave: string;
  etiqueta: string;
  desde: number;
  cantidad: number;
}

@Component({
  selector: 'app-corridas-equivalencias',
  imports: [
    ReactiveFormsModule,
    Select,
    EtiquetaFormularioComponente,
    MensajeAyudaErrorComponente,
    TarjetaComponente,
    TablaEquivalenciasComponente,
  ],
  templateUrl: './corridas-equivalencias.componente.html',
  styleUrl: './corridas-equivalencias.componente.scss',
})
export class CorridasEquivalenciasComponente {
  readonly sistemas: SistemaEquivalencia[] = [
    { clave: 'mx', nombre: 'México (MX)' },
    { clave: 'eu', nombre: 'Europa (EU)' },
    { clave: 'us', nombre: 'Estados Unidos (US)' },
    { clave: 'uk', nombre: 'Reino Unido (UK)' },
  ];

  readonly corridas: CorridaOpcion[] = [
    { clave: 'estandar', etiqueta: 'Estándar · MX 25 a 30', desde: 25, cantidad: 6 },
    { clave: 'amplia', etiqueta: 'Amplia · MX 24 a 31', desde: 24, cantidad: 8 },
    { clave: 'reducida', etiqueta: 'Reducida · MX 26 a 29', desde: 26, cantidad: 4 },
    { clave: 'extra', etiqueta: 'Extra amplia · MX 23 a 32', desde: 23, cantidad: 10 },
  ];

  readonly formularioCorrida = new FormGroup({
    corrida: new FormControl('estandar', { nonNullable: true }),
    sistemaPrincipal: new FormControl('mx', { nonNullable: true }),
    tallaBase: new FormControl(27, { nonNullable: true }),
  });

  private readonly tallasEstado = signal<TallaEquivalencia[]>(this.crearTallas(this.corridas[0]));
  readonly tallas = this.tallasEstado.asReadonly();

  constructor() {
    this.formularioCorrida.controls.corrida.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((clave) => this.actualizarCorrida(clave));

    this.formularioCorrida.controls.tallaBase.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((id) => this.asegurarTallaBaseActiva(id));
  }

  get opcionesTallaBase(): IOpcionSelector[] {
    return this.tallas().map((talla) => ({
      etiqueta: `MX ${talla.valores['mx']}`,
      valor: talla.id.toString(),
    }));
  }

  get sistemaPrincipal(): string {
    return this.formularioCorrida.controls.sistemaPrincipal.value;
  }

  get tallaBaseId(): number {
    return this.formularioCorrida.controls.tallaBase.value;
  }

  private actualizarCorrida(clave: string): void {
    const corrida = this.corridaPorClave(clave);
    this.tallasEstado.set(this.crearTallas(corrida));
    this.formularioCorrida.controls.tallaBase.setValue(this.tallaBaseSugerida(corrida), {
      emitEvent: false,
    });
  }

  private asegurarTallaBaseActiva(id: number): void {
    this.tallasEstado.update((tallas) =>
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

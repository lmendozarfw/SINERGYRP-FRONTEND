import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { PIcon } from '@primeicons/angular';

export interface SistemaEquivalencia {
  clave: string;
  nombre: string;
}

export interface TallaEquivalencia {
  id: number;
  activa: boolean;
  valores: Record<string, string>;
}

const SISTEMAS: SistemaEquivalencia[] = [
  { clave: 'mx', nombre: 'México (MX)' },
  { clave: 'eu', nombre: 'Europa (EU)' },
  { clave: 'us', nombre: 'Estados Unidos (US)' },
  { clave: 'uk', nombre: 'Reino Unido (UK)' },
];

const TALLAS: TallaEquivalencia[] = [
  { id: 25, activa: true, valores: { mx: '25', eu: '39', us: '7', uk: '6' } },
  { id: 26, activa: true, valores: { mx: '26', eu: '40', us: '8', uk: '7' } },
  { id: 27, activa: true, valores: { mx: '27', eu: '41', us: '9', uk: '8' } },
  { id: 28, activa: true, valores: { mx: '28', eu: '42', us: '10', uk: '9' } },
  { id: 29, activa: true, valores: { mx: '29', eu: '43', us: '11', uk: '10' } },
  { id: 30, activa: true, valores: { mx: '30', eu: '44', us: '12', uk: '11' } },
];

@Component({
  selector: 'app-tabla-equivalencias',
  imports: [
    FormsModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    TableModule,
    PIcon,
  ],
  templateUrl: './tabla-equivalencias.componente.html',
  styleUrl: './tabla-equivalencias.componente.scss',
})
export class TablaEquivalenciasComponente {
  readonly titulo = input('Tallas y equivalencias');
  readonly descripcion = input(
    'Valida las equivalencias con el catálogo de tu horma.',
  );
  readonly sistemas = input<SistemaEquivalencia[]>(SISTEMAS);
  readonly tallas = input<TallaEquivalencia[]>(TALLAS);
  readonly sistemaPrincipal = input('mx');
  readonly tallaBaseId = input<number | null>(null);

  get cantidadTallasActivas(): number {
    return this.tallas().filter((talla) => talla.activa).length;
  }

  get cantidadSistemasEquivalencia(): number {
    return Math.max(this.sistemas().length - 1, 0);
  }

  get sistemaPrincipalNombre(): string {
    return (
      this.sistemas().find((sistema) => sistema.clave === this.sistemaPrincipal())?.nombre ??
      this.sistemaPrincipal()
    );
  }

  esSistemaPrincipal(clave: string): boolean {
    return clave === this.sistemaPrincipal();
  }

  esTallaBase(talla: TallaEquivalencia): boolean {
    return talla.id === this.tallaBaseId();
  }

  valorTalla(talla: TallaEquivalencia): string {
    return talla.valores[this.sistemaPrincipal()] ?? '—';
  }
}

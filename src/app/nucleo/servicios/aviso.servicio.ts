import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

type NivelAviso = 'exito' | 'info' | 'advertencia' | 'error';

const severidades: Record<NivelAviso, 'success' | 'info' | 'warn' | 'error'> = {
  exito: 'success',
  info: 'info',
  advertencia: 'warn',
  error: 'error'
};

@Injectable({ providedIn: 'root' })
export class AvisosServicio {
  private readonly mensajesServicio = inject(MessageService);

  exito(titulo: string, detalle?: string): void {
    this.agregar('exito', titulo, detalle);
  }

  informacion(titulo: string, detalle?: string): void {
    this.agregar('info', titulo, detalle);
  }

  advertencia(titulo: string, detalle?: string): void {
    this.agregar('advertencia', titulo, detalle);
  }

  error(titulo: string, detalle?: string): void {
    this.agregar('error', titulo, detalle);
  }

  limpiar(clave?: string): void {
    if (clave === undefined) {
      this.mensajesServicio.clear();
      return;
    }
    this.mensajesServicio.clear(clave);
  }

  private agregar(nivel: NivelAviso, titulo: string, detalle?: string): void {
    this.mensajesServicio.add({ severity: severidades[nivel], summary: titulo, detail: detalle, life: 4000 });
  }
}

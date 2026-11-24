import { Injectable } from '@angular/core';
import { AdvanceOn, driver, DriveStep } from 'driver.js';
import { IPasoRecorrido } from './paso-recorrido';

@Injectable({
  providedIn: 'root'
})
export class RecorridoServicio {

  iniciar(pasos: IPasoRecorrido[]): void {
    const pasosDriver: DriveStep[] = pasos.map(paso => ({
      element: paso.elemento,
      popover: {
        title: paso.titulo,
        description: paso.descripcion,
        side: paso.posicion ?? 'bottom'
      },
      advanceOn: this.construirAvanceCuando(paso.avanzaCuando), 
      advanceDelay: paso.retrasoAvance,
      waitForElement: paso.esperarElemento
    }));

    const recorrido = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      showButtons: ['previous', 'next', 'close'],
      steps: pasosDriver,
      nextBtnText: "Siguiente",
      prevBtnText: "Anterior",
      closeBtnLabel: "Cancelar",
      doneBtnText: "Aceptar"
    });

    recorrido.drive();
  }

  construirAvanceCuando(avanzaCuando: IPasoRecorrido['avanzaCuando']): AdvanceOn {
    if (avanzaCuando === null || avanzaCuando === undefined) {
      return false;
    }
    if (typeof avanzaCuando === 'boolean') {
      return avanzaCuando ? 'click' : false;
    }
    if (typeof avanzaCuando === 'string' || Array.isArray(avanzaCuando)) {
      return avanzaCuando;
    }
    const {evento, condicion, estricto} = avanzaCuando;
    return {
      event: evento,
      when: condicion ? (elemento: Element, paso: any) => condicion(elemento, paso) : undefined,
      strict: estricto
    }
  }
}
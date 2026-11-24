import { Injectable } from '@angular/core';
import { driver, DriveStep } from 'driver.js';
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
      advanceOn: paso.avanzarAlHacerClic ? 'click' : undefined,
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
}
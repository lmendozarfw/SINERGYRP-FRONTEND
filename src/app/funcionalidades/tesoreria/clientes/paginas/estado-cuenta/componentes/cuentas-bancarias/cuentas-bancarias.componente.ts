import { Component, input } from '@angular/core';
import { PIcon } from '@primeicons/angular';
import { Carousel, CarouselContent, CarouselItem, CarouselIndicators, CarouselNext, CarouselPrev } from 'primeng/carousel';
import { ICuentaBancariaEstadoCuenta } from '../../modelos/estado-cuenta.interface';
import { TarjetaCreditoComponente } from '@compartido/componentes/tarjeta-credito/tarjeta-credito.componente';

@Component({
  selector: 'app-cuentas-bancarias-estado-cuenta',
  templateUrl: './cuentas-bancarias.componente.html',
  imports: [Carousel, PIcon, CarouselContent, CarouselItem, CarouselIndicators, TarjetaCreditoComponente, CarouselNext, CarouselPrev],
})
export class CuentasBancariasEstadoCuentaComponente {
  readonly cuentas = input.required<ICuentaBancariaEstadoCuenta[]>();
}

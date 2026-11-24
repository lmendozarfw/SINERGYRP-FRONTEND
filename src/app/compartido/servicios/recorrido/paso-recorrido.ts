export interface IPasoRecorrido {
  elemento?: string;
  titulo: string;
  descripcion: string;
  posicion?: 'top' | 'bottom' | 'left' | 'right';
  avanzarAlHacerClic?: boolean;
  esperarElemento?: number;
  avanzaCuando?: boolean | string | string[] | {
    evento: string | string[];
    condicion?: (elemento: Element, step: IPasoRecorrido) => boolean;
    estricto?: boolean;
  };
  retrasoAvance?: number;
}
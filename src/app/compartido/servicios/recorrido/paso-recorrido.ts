export interface IPasoRecorrido {
  elemento?: string;
  titulo: string;
  descripcion: string;
  posicion?: 'top' | 'bottom' | 'left' | 'right';
  avanzarAlHacerClic?: boolean;
  esperarElemento?: number;
}
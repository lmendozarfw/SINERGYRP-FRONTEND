export interface AtributoOpcion {
  label: string;
  value: string;
  codigo: string;
}

export interface AtributoCombinacion {
  id: string;
  nombre: string;
  opciones: AtributoOpcion[];
}

export interface PiezaCombinacion {
  id: string;
  nombre: string;
}

export interface MaterialAsignado {
  piezaId: string;
  piezaNombre: string;
  material: string;
}

export interface VersionCombinacion {
  id: string;
  numero: number;
  materiales: MaterialAsignado[];
  fechaRegistro: Date;
}

export interface Combinacion {
  id: string;
  codigo: string;
  atributos: Record<string, string>;
  etiquetaAtributos: Record<string, string>;
  versionActual: number;
  versiones: VersionCombinacion[];
  fechaRegistro: Date;
  fechaModificacion: Date;
}

export interface OpcionSelectSimple {
  label: string;
  value: string;
}

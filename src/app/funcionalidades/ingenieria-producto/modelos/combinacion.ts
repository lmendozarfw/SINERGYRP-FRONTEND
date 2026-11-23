export interface IAtributoOpcion {
  label: string;
  value: string;
  codigo: string;
}

export interface IAtributoCombinacion {
  id: string;
  nombre: string;
  opciones: IAtributoOpcion[];
}

export interface IPiezaCombinacion {
  id: string;
  nombre: string;
}

export interface IMaterialAsignado {
  piezaId: string;
  piezaNombre: string;
  material: string;
}

export interface IVersionCombinacion {
  id: string;
  numero: number;
  materiales: IMaterialAsignado[];
  fechaRegistro: Date;
}

export interface ICombinacion {
  id: string;
  codigo: string;
  atributos: Record<string, string>;
  etiquetaAtributos: Record<string, string>;
  versionActual: number;
  versiones: IVersionCombinacion[];
  fechaRegistro: Date;
  fechaModificacion: Date;
}

export interface IOpcionSelectSimple {
  label: string;
  value: string;
}

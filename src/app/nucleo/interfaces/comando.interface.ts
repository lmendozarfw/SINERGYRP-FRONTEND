export interface Comando<TPeticion, TRespuesta> {
    ejecutar(informacion: TPeticion) : Promise<TRespuesta>;
}
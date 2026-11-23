export interface IErrorRespuesta {
    exitoso: boolean;
    mensaje: string;
    codigoEstado: number;
    errores: string[] | null;
    idSeguimiento: string | null;
}
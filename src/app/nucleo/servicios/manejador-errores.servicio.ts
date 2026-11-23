import { Injectable } from "@angular/core";
import { IErrorRespuesta } from "../interfaces/error-respuesta.interface";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class ManejadorErroresServicio {

    interpretar(error: unknown): IErrorRespuesta {
        if (error instanceof HttpErrorResponse) {
            if (this.esErrorRespuesta(error.error)) {
                return error.error;
            }
            return {
                exitoso: false,
                mensaje: error.status === 0 ? 'No fue posible conectar con el servidor,' : 'Ocurrio un error al procesar la solicitud.',
                codigoEstado: error.status,
                errores: null,
                idSeguimiento: null
            }
        }
        return {
            exitoso: false,
            mensaje: 'Ocurriod un erro inesperado.',
            codigoEstado: 0,
            errores: null,
            idSeguimiento: null
        }
    }

    private esErrorRespuesta(valor: unknown): valor is IErrorRespuesta {
        if (typeof valor !== 'object' || valor === null) {
            return false;
        }

        const respuesta = valor as Record<string, unknown>;

        return (
            respuesta['exitoso'] === false &&
            typeof respuesta['mensaje'] === 'string' &&
            typeof respuesta['codigoEstado'] === 'number'
        );
    }
}
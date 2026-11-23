import { inject, Injectable } from "@angular/core";
import { ApiServicio } from "@nucleo/servicios/api.servicio";
import { Observable } from "rxjs";
import { InicioSesionComando } from "../casos-uso/inicio-sesion.caso-uso";
import { IInicioSesionRespuesta, IMiInformacion } from "../modelos/auth";

@Injectable({ providedIn: 'root' })
export class AutenticacionServicio {
    private api = inject(ApiServicio);

    iniciarSesion(request: InicioSesionComando): Observable<IInicioSesionRespuesta> {
        return this.api.post('Auth/Login', request);
    }

    miInformacion(): Observable<IMiInformacion> {
        return this.api.obtener('auth/Me');
    }
}

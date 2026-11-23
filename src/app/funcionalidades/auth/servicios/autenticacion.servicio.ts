import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiServicio } from "../../../nucleo/servicios/api.servicio";
import { IInicioSesionRespuesta, IMiInformacion } from "../modelos/auth";
import { InicioSesionComando } from "../casos-uso/inicio-sesion.caso-uso";

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

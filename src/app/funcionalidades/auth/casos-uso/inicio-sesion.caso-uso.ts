import { inject, Injectable } from "@angular/core";
import { Comando } from "../../../nucleo/interfaces/comando.interface";
import { AuthService } from "../servicios/auth.servicio";
import { AlmacenamientoLocalServicio } from "../../../nucleo/servicios/storage.servicio";
import { firstValueFrom } from "rxjs";

export interface InicioSesionComando {
    nombreUsuario: string;
    contrasena: string;
}

@Injectable({ providedIn: 'root' })
export class InicioSesionCasoUso implements Comando<InicioSesionComando, string> {
    private readonly authService = inject(AuthService);
    private readonly storageService = inject(AlmacenamientoLocalServicio);

    async ejecutar(comando: InicioSesionComando): Promise<string> {
        if (!comando.nombreUsuario || !comando.contrasena) {
            throw new Error('El nombre de usuario y la contraseña son obligatorios.');
        }

        const respuesta = await firstValueFrom(this.authService.iniciarSesion(comando));
        this.storageService.establecer('access_token', respuesta.token);
        return respuesta.token;
    }
}

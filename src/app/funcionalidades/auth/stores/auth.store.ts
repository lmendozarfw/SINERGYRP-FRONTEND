import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { computed, inject } from "@angular/core";
import { AlmacenamientoLocalServicio } from "../../../nucleo/servicios/storage.servicio";
import { InicioSesionCasoUso, InicioSesionComando } from "../casos-uso/inicio-sesion.caso-uso";
import { IMiInformacion } from "../modelos/auth";

type AutenticacionEstado = {
  usuario: IMiInformacion | null;
  permisos: string[] | null;
  token: string | null;
  cargando: boolean;
  error: string | null;
};

const AutenticacionEstadoInicial: AutenticacionEstado = {
  usuario: null,
  permisos: null,
  token: null,
  cargando: false,
  error: null,
};

export const AutenticacionStore = signalStore(

  { providedIn: 'root' },

  withState<AutenticacionEstado>(() => {
    const almacenamientoServicio = inject(AlmacenamientoLocalServicio);
    return {
      usuario: almacenamientoServicio.obtener<IMiInformacion>('usuario'),
      permisos: almacenamientoServicio.obtener<string[]>('permisos') ?? null,
      token: almacenamientoServicio.obtener<string>('token_acceso') ?? null,
      cargando: false,
      error: null,
    };
  }),
  withComputed(({ usuario: user, permisos, token }) => ({
    isAuthenticated: computed(() => !!user() && !!permisos() && !!token()),
  })),
  withMethods(
    (
      store,
      almacenamientoServicio = inject(AlmacenamientoLocalServicio),
      iniciarSesionCasoUso = inject(InicioSesionCasoUso)
    ) => ({

      almacenarToken(token: string) {
        patchState(store, { token });
      },

      almacenarPermisos(permisos: string[]) {
        patchState(store, { permisos });
      },

      cerrarSesion() {
        patchState(store, AutenticacionEstadoInicial);
        almacenamientoServicio.limpiar();
      },

      async inicioSesion(comando: InicioSesionComando) {
        patchState(store, {
          cargando: true,
          error: null,
        });

        try {
          const token = await iniciarSesionCasoUso.ejecutar(comando);
          this.almacenarToken(token);
          patchState(store, {
            cargando: false,
          });
        } catch (error: any) {
          patchState(store, {
            cargando: false,
            error: error?.error?.mensaje || 'Usuario o contraseña incorrectos',
          });
        }
      },

      async me() {
        patchState(store, {
          cargando: true,
          error: null,
        });

        try {
          // const response = await firstValueFrom(authService.me());
          // console.log({response});
          // const user: IUserAuth = response.user;

          // this.setUser(user);
          // this.setPermissions(response.permissions);

          // storageService.set('user', user);
          // storageService.set('permissions', response.permissions);

          patchState(store, {
            cargando: false,
          });
        } catch (error: any) {
          patchState(store, {
            cargando: false,
            error: error?.error?.mensaje || 'No se ha podido restaurar la sesión',
          });
        }
      },
    }),
  ),
);

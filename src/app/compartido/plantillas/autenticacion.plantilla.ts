import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PIcon } from '@primeicons/angular';

@Component({
  selector: 'autenticacion-plantilla',
  imports: [RouterOutlet, PIcon],
  template: `
    <div class="flex min-h-screen bg-ds-canvas">
      <section
        class="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-linear-to-br from-ds-navy via-ds-navy to-ds-primary-deep px-12 py-12 text-ds-on-navy lg:flex"
      >
        <div class="relative z-10 flex items-center gap-3">
          <div
            class="flex size-10 items-center justify-center rounded-lg bg-ds-primary/10"
          >
            <img
              src="assets/imagenes/isotipo-sinergy.png"
              alt="Sinergy"
              class="size-8 shrink-0 object-contain"
            />
          </div>
          <div>
            <p class="text-sm font-semibold">SINERGYRP</p>
            <p class="ds-meta text-ds-on-navy/60!">Sistema de administración y manufactura</p>
          </div>
        </div>

        <div class="relative z-10 max-w-lg">
          <h1 class="ds-display mb-2">Tu empresa conectada y bajo control</h1>
          <p class="ds-body mt-6 text-ds-on-navy/70!">
Una visión integral para tomar mejores decisiones
y avanzar con confianza.          </p>

          <div class="mt-12 flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <span
                class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-ds-on-navy/10"
              >
                <svg pIcon="check-circle" [size]="20"></svg>
              </span>
              <p class="ds-body">Inventario claro y trazable</p>
            </div>
            <div class="flex items-center gap-3">
              <span
                class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-ds-on-navy/10"
              >
                <svg pIcon="qrcode" [size]="20"></svg>
              </span>
              <p class="ds-body">Acceso por código QR para un registro ágil</p>
            </div>
            <div class="flex items-center gap-3">
              <span
                class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-ds-on-navy/10"
              >
                <svg pIcon="chart-bar" [size]="20"></svg>
              </span>
              <p class="ds-body">Reportes y valorización al alcance de un clic</p>
            </div>
          </div>
        </div>

        <p class="ds-meta relative z-10 text-ds-on-navy/50!">© 2026  SINERGYERP · Espacio corporativo</p>

        <div
          class="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-ds-primary/20 blur-3xl"
        ></div>
        <div
          class="pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full bg-ds-primary/10 blur-3xl"
        ></div>
      </section>

      <main class="flex w-full items-center justify-center p-6 lg:w-1/2">
        <router-outlet />
      </main>
    </div>
  `,
})
export class AutenticacionPlantilla { }

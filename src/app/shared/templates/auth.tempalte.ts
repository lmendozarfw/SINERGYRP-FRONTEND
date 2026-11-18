import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartBar, CheckCircle, Qrcode } from '@primeicons/angular';

@Component({
  selector: 'auth-template',
  imports: [RouterOutlet, CheckCircle, Qrcode, ChartBar],
  template: `
    <div class="flex min-h-screen bg-slate-50">
      <section
        class="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-linear-to-br from-navy-950 via-navy-950 to-blue-900 px-12 py-12 text-white lg:flex"
      >
        <div class="relative z-10 flex items-center gap-3">
          <div
            class="flex size-10 items-center justify-center rounded-lg bg-blue-600 text-base font-semibold text-white"
          >
            S
          </div>
          <div>
            <p class="text-sm font-semibold">SINERGYRP</p>
            <p class="ds-meta text-white/60!">Sistema de administración y manufactura</p>
          </div>
        </div>

        <div class="relative z-10 max-w-lg">
          <h1 class="ds-display mb-2">Tu empresa.</h1>
          <h1 class="ds-display mb-2">Conectada.</h1>
          <h1 class="ds-display">Bajo control.</h1>
          <p class="ds-body mt-6 text-white/70!">
Una visión integral para tomar mejores decisiones
y avanzar con confianza.          </p>

          <div class="mt-12 flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <span
                class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10"
              >
                <svg data-p-icon="check-circle" [size]="20"></svg>
              </span>
              <p class="ds-body">Inventario claro y trazable</p>
            </div>
            <div class="flex items-center gap-3">
              <span
                class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10"
              >
                <svg data-p-icon="qrcode" [size]="20"></svg>
              </span>
              <p class="ds-body">Acceso por código QR para un registro ágil</p>
            </div>
            <div class="flex items-center gap-3">
              <span
                class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10"
              >
                <svg data-p-icon="chart-bar" [size]="20"></svg>
              </span>
              <p class="ds-body">Reportes y valorización al alcance de un clic</p>
            </div>
          </div>
        </div>

        <p class="ds-meta relative z-10 text-white/50!">© 2026  SINERGYERP · Espacio corporativo</p>

        <div
          class="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-blue-600/20 blur-3xl"
        ></div>
        <div
          class="pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full bg-blue-600/10 blur-3xl"
        ></div>
      </section>

      <main class="flex w-full items-center justify-center p-6 lg:w-1/2">
        <router-outlet />
      </main>
    </div>
  `,
})
export class AuthTemplate { }

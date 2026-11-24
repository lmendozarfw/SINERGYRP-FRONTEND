import { provideHttpClient } from '@angular/common/http';
import { provideSignalFormsConfig } from '@angular/forms/signals';
import { NG_STATUS_CLASSES } from '@angular/forms/signals/compat';
import { ApplicationConfig, ErrorHandler, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { ConfirmationService, MessageService } from 'primeng/api';
// Configuración de Sentry
import * as Sentry from "@sentry/angular";
import { DialogoConfirmacionServicio } from './compartido/componentes/confirmacion/confirmacion.servicio';
Sentry.init({
  dsn: "https://d0956fc4ac9892486ec676fcbb763719@o4512465429069824.ingest.us.sentry.io/4512465437261824",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration()
  ],
  // Tracing
  tracesSampleRate: 1.0, // Capture 100% of traces. Adjust this value in production.
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
// Configuración de Sentry

const AppTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: 'var(--ds-action-50)',
      100: 'var(--ds-action-100)',
      200: 'var(--ds-action-200)',
      300: 'var(--ds-action-300)',
      400: 'var(--ds-action-400)',
      500: 'var(--ds-action-500)',
      600: 'var(--ds-action-600)',
      700: 'var(--ds-action-700)',
      800: 'var(--ds-action-800)',
      900: 'var(--ds-action-900)',
      950: 'var(--ds-action-950)',
      color: 'var(--ds-primary)',
      contrastColor: 'var(--ds-on-primary)',
      hoverColor: 'var(--ds-primary-hover)',
      activeColor: 'var(--ds-primary-active)',
    },
    surface: {
      0: 'var(--ds-surface)',
      50: 'var(--ds-canvas)',
      100: 'var(--ds-canvas-strong)',
      200: 'var(--ds-border)',
      300: 'var(--ds-border)',
      400: 'var(--ds-ink-muted)',
      500: 'var(--ds-ink-muted)',
      600: 'var(--ds-ink-muted)',
      700: 'var(--ds-ink)',
      800: 'var(--ds-ink)',
      900: 'var(--ds-navy)',
      950: 'var(--ds-navy)',
    },
    text: {
      color: 'var(--ds-text)',
      hoverColor: 'var(--ds-text)',
      mutedColor: 'var(--ds-text-muted)',
      hoverMutedColor: 'var(--ds-ink)',
    },
    content: {
      background: 'var(--ds-bg-raised)',
      borderColor: 'var(--ds-border)',
      color: 'var(--ds-text)',
      borderRadius: 'var(--ds-radius-card)',
    },
    formField: {
      background: 'var(--ds-bg-raised)',
      borderColor: 'var(--ds-border)',
      hoverBorderColor: 'var(--ds-ink-soft)',
      focusBorderColor: 'var(--ds-primary)',
      invalidBorderColor: 'var(--ds-danger)',
      color: 'var(--ds-text)',
      placeholderColor: 'var(--ds-text-muted)',
      borderRadius: 'var(--ds-radius-input)',
      paddingX: '12px',
      paddingY: '10px',
      focusRing: {
        width: '3px',
        style: 'solid',
        color: 'var(--ds-primary-ring)',
        offset: '1px',
        shadow: 'none',
      },
    },
    focusRing: {
      width: '3px',
      style: 'solid',
      color: 'var(--ds-primary-ring)',
      offset: '2px',
      shadow: 'none',
    },
  },
  components: {
    button: {
      root: {
        borderRadius: 'var(--ds-radius-button)',
        gap: '8px',
      },
    },
    datatable: {
      headerCell: {
        background: 'var(--ds-primary-soft)',
      },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    provideSignalFormsConfig({ classes: NG_STATUS_CLASSES }),
    providePrimeNG({
      theme: {
        preset: AppTheme,
        options: {
          darkModeSelector: 'none',
        },
      },
      license:
        'eyJpZCI6IjhjY2MwMWZjLTAxMzgtNGYxZC1iMDlkLTQ2MGYyN2Q0ZTk0NSIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODI4NTMzODQsImV4cCI6MTgxNDM4OTM4NH0.5X1GwjVS-s0_fDC5XCzABHltbeIeRXqYFiQyrIuL6CK2mdQe8bA_c6CF6xQtxxwFzjztmAW_RlHBw-8IRxf7CA',
    }),
    MessageService,
    MessageService, 
    ConfirmationService,
    DialogoConfirmacionServicio,
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler(),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    provideAppInitializer(() => {
      inject(Sentry.TraceService);
    })
  ],
};

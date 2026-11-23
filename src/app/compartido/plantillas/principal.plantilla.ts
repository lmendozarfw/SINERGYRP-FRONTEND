import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { PIcon } from '@primeicons/angular';
import { SidebarComponente } from '../componentes/sidebar/sidebar.component';
import { BreadcrumbComponente } from '../componentes/breadcrumb/breadcrumb.componente';

@Component({
  selector: 'principal-plantilla',
  imports: [
    SidebarModule,
    ButtonModule,
    RouterOutlet,
    SidebarComponente,
    BreadcrumbComponente,
    PIcon
  ],
  template: `
    <div class="h-screen overflow-hidden bg-ds-canvas">
      <p-sidebar-layout class="relative! h-full">
        @if (isMobile()) {
          <p-sidebar-backdrop class="absolute!" />
        }

        <p-sidebar
          id="mobile-nav"
          [(open)]="sidebarOpen"
          [collapsible]="isMobile() ? 'offcanvas' : 'icon'"
          [overlay]="isMobile()"
          [dismissable]="true"
          [hideOnOutsideClick]="true"
          [width]="expandedWidth"
          [iconWidth]="collapsedWidth"
        >
          <p-sidebar-spacer />
          <p-sidebar-aside>
            <p-sidebar-panel class="bg-transparent! p-0!">
              <app-sidebar
                [movil]="isMobile()"
                [contraido]="isSidebarCollapsed()"
                (navegar)="onSidebarNavigate()"
              />
            </p-sidebar-panel>
          </p-sidebar-aside>
        </p-sidebar>

        <p-sidebar-main class="flex min-w-0 flex-col">
          <header
            class="flex h-12 shrink-0 items-center gap-2 border-b border-ds-line bg-ds-surface px-3 lg:px-4"
          >
            <button
              pButton
              pSidebarTrigger
              target="mobile-nav"
              class="ds-button ds-button--text ds-button--compact"
              [attr.aria-label]="sidebarOpen() ? 'Cerrar menú' : 'Abrir menú'"
            >
              @if (isMobile()) {
                <svg pIcon="bars" [size]="18"></svg>
              } @else if (sidebarOpen()) {
                <svg pIcon="chevron-left" [size]="18"></svg>
              } @else {
                <svg pIcon="chevron-right" [size]="18"></svg>
              }
            </button>

            <div class="min-w-0">
              <app-breadcrumb />
            </div>

            <div class="ml-auto flex items-center gap-3">
              <span class="ds-meta hidden xl:inline">Raudal</span>
            </div>
          </header>

          <main class="min-h-0 flex-1 overflow-auto p-4 lg:p-6">
            <router-outlet />
          </main>
        </p-sidebar-main>
      </p-sidebar-layout>
    </div>
  `,
})
export class PrincipalPlantilla {
  readonly isMobile = signal(false);
  readonly sidebarOpen = signal(true);
  readonly expandedWidth = '21rem';
  readonly collapsedWidth = '4.5rem';

  readonly isSidebarCollapsed = computed(() => !this.sidebarOpen() && !this.isMobile());

  constructor() {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 1023px)');
    const update = (event: MediaQueryList | MediaQueryListEvent) => {
      this.isMobile.set(event.matches);
      this.sidebarOpen.set(!event.matches);
    };
    update(mql);
    mql.addEventListener('change', update);
  }

  onSidebarNavigate(): void {
    if (this.isMobile()) {
      this.sidebarOpen.set(false);
    }
  }
}

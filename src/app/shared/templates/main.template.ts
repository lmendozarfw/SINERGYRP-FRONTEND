import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Bars, ChevronLeft, ChevronRight } from '@primeicons/angular';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'main-template',
  imports: [
    SidebarModule,
    ButtonModule,
    RouterOutlet,
    SidebarComponent,
    BreadcrumbComponent,
    Bars,
    ChevronLeft,
    ChevronRight,
  ],
  template: `
    <div class="h-screen overflow-hidden bg-slate-50">
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
                [mobile]="isMobile()"
                [collapsed]="isSidebarCollapsed()"
                (navigate)="onSidebarNavigate()"
              />
            </p-sidebar-panel>
          </p-sidebar-aside>
        </p-sidebar>

        <p-sidebar-main class="flex min-w-0 flex-col">
          <header
            class="flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 lg:px-6"
          >
            <button
              pButton
              pSidebarTrigger
              target="mobile-nav"
              class="ds-button ds-button--text ds-button--compact"
              [attr.aria-label]="sidebarOpen() ? 'Cerrar menú' : 'Abrir menú'"
            >
              @if (isMobile()) {
                <svg data-p-icon="bars" [size]="18"></svg>
              } @else if (sidebarOpen()) {
                <svg data-p-icon="chevron-left" [size]="18"></svg>
              } @else {
                <svg data-p-icon="chevron-right" [size]="18"></svg>
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
export class MainTemplate {
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

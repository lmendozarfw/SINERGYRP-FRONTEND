import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./compartido/plantillas/autenticacion.plantilla').then((t) => t.AutenticacionPlantilla),
    children: [
      {
        path: 'inicio-sesion',
        loadComponent: () =>
          import('./funcionalidades/auth/paginas/login/login.pagina').then((p) => p.LoginPage),
      },
    ],
  },
  {
    path: 'app',
    loadComponent: () => import('./compartido/plantillas/principal.plantilla').then((t) => t.PrincipalPlantilla),
    children: [
      {
        path: '',
        redirectTo: 'clientes',
        pathMatch: 'full',
      },
      {
        path: 'clientes',
        loadComponent: () =>
          import('./funcionalidades/clientes/paginas/clientes.pagina').then((p) => p.ClientsPage),
      },
      {
        path: 'ingenieria-producto/nuevo-producto',
        loadComponent: () =>
          import('./funcionalidades/ingenieria-producto/paginas/nuevo-producto/nuevo-producto.pagina').then(
            (p) => p.NewProductPage,
          ),
      },
    ],
  },
  {
    path: 'sistem-diseno',
    loadComponent: () =>
      import('./funcionalidades/design-system/pages/design-system-showcase.page').then(
        (p) => p.DesignSystemShowcasePage,
      ),
  },
  {
    path: '**',
    redirectTo: 'auth/inicio-sesion',
  },
];

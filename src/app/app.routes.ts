import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./compartido/plantillas/autenticacion.plantilla').then((t) => t.AutenticacionPlantilla),
    children: [
      {
        path: 'inicio-sesion',
        loadComponent: () =>
          import('./funcionalidades/autenticacion/paginas/inicio-sesion/inicio-sesion.pagina').then((p) => p.InicioSesionPagina),
      },
    ],
  },
  {
    path: 'app',
    loadComponent: () => import('./compartido/plantillas/principal.plantilla').then((t) => t.PrincipalPlantilla),
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
      {
        path: 'inicio',
        loadComponent: () =>
          import('./funcionalidades/bienvenida/paginas/bienvenida/bienvenida.pagina').then(
            (p) => p.BienvenidaPagina,
          ),
      },
      {
        path: 'tesoreria',
        children: [
          {
            path: 'catalogos',
            loadComponent: () => import('./funcionalidades/tesoreria/catalogos/paginas/catalogo.pagina').then(p => p.CatalogoPagina)
          }
        ]
      },
      {
        path: 'clientes',
        loadComponent: () =>
          import('./funcionalidades/tesoreria/clientes/paginas/clientes.pagina').then((p) => p.ClientesPagina),
      },
      {
        path: 'proveedores',
        loadComponent: () =>
          import('./funcionalidades/tesoreria/proveedores/paginas/proveedores.pagina').then(p => p.ProveedoresPagina)
      },
      {
        path: 'ingenieria-producto/nuevo-producto',
        loadComponent: () =>
          import('./funcionalidades/ingenieria-producto/paginas/nuevo-producto/nuevo-producto.pagina').then(
            (p) => p.NuevoProductoPagina,
          ),
      },
    ],
  },
  {
    path: 'sistema-diseno',
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

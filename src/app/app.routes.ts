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
          },
          {
            path: 'cuentas-por-cobrar',
            children: [
              {
                path: 'configuracion',
                loadComponent: () => import('./funcionalidades/tesoreria/cxc/paginas/configuracion/configuracion-cxc.pagina').then(p => p.ConfiguracionCxcPagina)
              },
              {
                path: 'documentos/nueva-factura',
                loadComponent: () => import('./funcionalidades/tesoreria/cxc/paginas/crear-factura/crear-factura-cxc.pagina').then(p => p.CrearFacturaCxcPagina)
              },
              {
                path: 'documentos',
                loadComponent: () => import('./funcionalidades/tesoreria/cxc/paginas/documentos/documentos-cxc.pagina').then(p => p.DocumentosCxcPagina)
              }
            ]
          }
        ]
      },
      {
        path: 'configuracion',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./funcionalidades/configuracion/paginas/configuracion.pagina').then((p) => p.ConfiguracionPagina),
          },
          {
            path: 'unidades-negocio',
            loadComponent: () =>
              import('./funcionalidades/configuracion/paginas/unidades-negocio/unidades-negocio.pagina').then(
                (p) => p.UnidadesNegocioPagina,
              ),
          },
          {
            path: 'emisores-fiscales',
            loadComponent: () =>
              import('./funcionalidades/configuracion/paginas/emisores-fiscales/emisores-fiscales.pagina').then(
                (p) => p.EmisoresFiscalesPagina,
              ),
          },
          {
            path: 'series-folios',
            loadComponent: () => import('./funcionalidades/configuracion/paginas/series-folios/series-folios.pagina').then(p => p.SeriesFoliosPagina)
          }
        ],
      },
      {
        path: 'clientes',
        loadComponent: () =>
          import('./funcionalidades/tesoreria/clientes/paginas/lista/clientes.pagina').then((p) => p.ClientesPagina),
      },
      {
        path: 'clientes/:id',
        loadComponent: () =>
          import('./funcionalidades/tesoreria/clientes/paginas/detalles/detalle-cliente.pagina').then((p) => p.DetalleClientePagina),
      },
      {
        path: 'proveedores',
        loadComponent: () =>
          import('./funcionalidades/tesoreria/proveedores/paginas/proveedores.pagina').then(p => p.ProveedoresPagina)
      },
      {
        path: 'proveedores/:id',
        loadComponent: () =>
          import('./funcionalidades/tesoreria/proveedores/paginas/detalles/detalle-proveedor.pagina').then(p => p.DetalleProveedorPagina)
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

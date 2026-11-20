import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./compartido/plantillas/auth.plantilla').then((t) => t.AuthTemplate),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/paginas/login/login.pagina').then((p) => p.LoginPage),
      },
    ],
  },
  {
    path: 'app',
    loadComponent: () => import('./compartido/plantillas/main.plantilla').then((t) => t.MainTemplate),
    children: [
      {
        path: '',
        redirectTo: 'clients',
        pathMatch: 'full',
      },
      {
        path: 'clients',
        loadComponent: () =>
          import('./features/clientes/paginas/clientes.pagina').then((p) => p.ClientsPage),
      },
      {
        path: 'product-engineering/new-product',
        loadComponent: () =>
          import('./features/ingenieria-producto/paginas/new-product/new-product.page').then(
            (p) => p.NewProductPage,
          ),
      },
    ],
  },
  {
    path: 'design-system',
    loadComponent: () =>
      import('./features/design-system/pages/design-system-showcase.page').then(
        (p) => p.DesignSystemShowcasePage,
      ),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];

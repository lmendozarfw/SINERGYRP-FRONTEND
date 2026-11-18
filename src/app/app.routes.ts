import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./shared/templates/auth.tempalte').then((t) => t.AuthTemplate),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/pages/login/login.page').then((p) => p.LoginPage),
      },
    ],
  },
  {
    path: 'app',
    loadComponent: () => import('./shared/templates/main.template').then((t) => t.MainTemplate),
    children: [
      {
        path: '',
        redirectTo: 'clients',
        pathMatch: 'full',
      },
      {
        path: 'clients',
        loadComponent: () =>
          import('./features/clients/pages/clients.page').then((p) => p.ClientsPage),
      },
      {
        path: 'configuration',
        loadComponent: () =>
          import('./features/configuration/pages/configuration.page').then(
            (p) => p.ConfigurationPage,
          ),
      },
      {
        path: 'product-engineering/new-product',
        loadComponent: () =>
          import('./features/product-engineering/pages/new-product/new-product.page').then(
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

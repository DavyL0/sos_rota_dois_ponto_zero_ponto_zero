import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: 'home',
    loadComponent: () => import('./screens/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'ocorrencias',
    loadComponent: () => import('./screens/ocorrencias/ocorrencias').then((m) => m.Ocorrencias),
  },
  {
    path: 'ambulancias',
    loadComponent: () => import('./screens/ambulancias/ambulancias').then((m) => m.Ambulancias),
  },
  {
    path: 'equipes',
    loadComponent: () => import('./screens/equipes-profissionais/equipes-profissionais').then((m) => m.EquipesProfissionais),
  },
  {
    path: 'relatorios',
    loadComponent: () => import('./screens/relatorios/relatorios').then((m) => m.Relatorios),
  },
];

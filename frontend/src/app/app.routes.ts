import { Routes } from '@angular/router';
import { Dashboard } from './screens/dashboard/dashboard';
import { Ocorrencias } from './screens/ocorrencias/ocorrencias';
import { Ambulancias } from './screens/ambulancias/ambulancias';
import { Equipes } from './screens/equipes/equipes';
import { Relatorios } from './screens/relatorios/relatorios';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Dashboard },
  { path: 'ocorrencias', component: Ocorrencias },
  { path: 'ambulancias', component: Ambulancias },
  { path: 'equipes', component: Equipes },
  { path: 'relatorios', component: Relatorios },
];

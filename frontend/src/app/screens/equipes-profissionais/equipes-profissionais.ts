import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { ProfissionaisComponent } from '../../component/profissionais-component/profissionais-component';

@Component({
  selector: 'app-equipes',
  imports: [TableModule, Tabs, TabList, Tab, TabPanels, TabPanel, ProfissionaisComponent],
  templateUrl: './equipes-profissionais.html',
  styleUrl: './equipes-profissionais.css',
})
export class EquipesProfissionais {
  abaAtiva: number = 0; //0 para profissional, 1 para equipe
}

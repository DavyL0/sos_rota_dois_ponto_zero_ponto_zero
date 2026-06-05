import { Component } from '@angular/core';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { ProfissionaisComponent } from '../profissionais-component/profissionais-component';

@Component({
  selector: 'app-equipes',
  imports: [
    ConfirmDialog,
    Toast,
    TableModule,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    ProfissionaisComponent,
  ],
  templateUrl: './equipes-profissionais.html',
  styleUrl: './equipes-profissionais.css',
})
export class EquipesProfissionais {
  abaAtiva: number = 0; //0 para profissional, 1 para equipe
}

import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard-service/dashboard-service';
import { KeyValuePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-relatorios',
  imports: [KeyValuePipe, TitleCasePipe],
  templateUrl: './relatorios.html',
  styleUrl: './relatorios.css',
})
export class Relatorios implements OnInit {
  private dashboardService = inject(DashboardService);
  private cd = inject(ChangeDetectorRef);

  atendimentosPorBairro: Record<string, number> = {};
  tempoMedioRespostaPorGravidade: Record<string, number> = {};

  ngOnInit(): void {
    this.dashboardService.carregarDashboard().subscribe({
      next: (dados) => {
        this.atendimentosPorBairro = dados.atendimentosPorBairro;
        this.tempoMedioRespostaPorGravidade = dados.tempoMedioRespostaPorGravidade;

        this.cd.detectChanges();
      },
    });
  }
}

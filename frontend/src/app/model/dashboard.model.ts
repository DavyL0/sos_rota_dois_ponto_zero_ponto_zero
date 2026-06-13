export interface DashboardDados {
  totalOcorrenciasAbertas: number;
  totalOcorrenciasDespachadas: number;
  totalOcorrenciasEmAtendimento: number;
  totalAmbulanciasDisponiveis: number;
  atendimentosPorBairro: Record<string, number>;
  tempoMedioRespostaPorGravidade: Record<string, number>;
}

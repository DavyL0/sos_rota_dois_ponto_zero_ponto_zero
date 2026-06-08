export enum GravidadeOcorrencia {
  ALTA = 'ALTA',
  MEDIA = 'MEDIA',
  BAIXA = 'BAIXA',
}

export enum StatusOcorrencia {
  ABERTA = 'Aberta',
  DESPACHADA = 'Despachada',
  EM_ATENDIMENTO = 'Em Atendimento',
  CONCLUIDA = 'Concluída',
  CANCELADA = 'Cancelada',
}

export const GravidadeOcorrenciaLabel: Record<GravidadeOcorrencia, string> = {
  [GravidadeOcorrencia.ALTA]: 'Alta',
  [GravidadeOcorrencia.MEDIA]: 'Média',
  [GravidadeOcorrencia.BAIXA]: 'Baixa',
};

export const StatusOcorrenciaLabel: Record<StatusOcorrencia, string> = {
  [StatusOcorrencia.ABERTA]: 'Aberta',
  [StatusOcorrencia.DESPACHADA]: 'Despachada',
  [StatusOcorrencia.EM_ATENDIMENTO]: 'Em atendimento',
  [StatusOcorrencia.CONCLUIDA]: 'Concluída',
  [StatusOcorrencia.CANCELADA]: 'Cancelada',
};

export interface OcorrenciaCadastroModel {
  tipoOcorrencia: string;
  gravidadeOcorrencia: GravidadeOcorrencia;
  bairroId: number;
  observacao: string;
}

export interface OcorrenciaExibicaoModel {
  id: number;
  tipoOcorrencia: string;
  gravidadeOcorrencia: GravidadeOcorrencia;
  statusOcorrencia: StatusOcorrencia;
  //todo adicionar bairro
  dataOcorrencia: string;
  dataHoraAbertura: string;
  limiteSla: string;
  observacao: string;
}

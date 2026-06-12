import { Bairro } from './bairro.model';

export enum GravidadeOcorrencia {
  ALTA = 'ALTA',
  MEDIA = 'MEDIA',
  BAIXA = 'BAIXA',
}

export enum StatusOcorrencia {
  ABERTA = 'ABERTA',
  DESPACHADA = 'DESPACHADA',
  EM_ATENDIMENTO = 'EM_ATENDIMENTO',
  CONCLUIDA = 'CONCLUIDA',
  CANCELADA = 'CANCELADA',
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
  bairro: Bairro;
  dataOcorrencia: string;
  dataHoraAbertura: string;
  limiteSLA: string;
  slaFinal: number;
  observacao: string;
  _slaFormatado?: { texto: string; classe: string };
}

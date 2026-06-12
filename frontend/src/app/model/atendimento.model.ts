import { AmbulanciaExibicaoModel } from './ambulancia.model';
import { OcorrenciaExibicaoModel } from './ocorrencias.model';

export interface OpcaoDespacho {
  ambulancia: AmbulanciaExibicaoModel;
  distanciaKm: number;
  tempoEstimadoMin: number;
}

export interface AtendimentoExibicaoModel {
  id: number;
  ocorrencia: OcorrenciaExibicaoModel;
  ambulancia: AmbulanciaExibicaoModel;
  dataHoraDespacho: string;
  dataHoraChegada: string;
  dataHoraConclusao: string;
  distanciaKm: number;
}

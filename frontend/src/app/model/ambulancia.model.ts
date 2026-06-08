import { Bairro } from './bairro.model';

export enum TipoAmbulancia {
  UTI = 'UTI',
  BASICA = 'BASICA',
}

export enum StatusAmbulancia {
  DISPONIVEL = 'DISPONIVEL',
  EM_ATENDIMENTO = 'EM_ATENDIMENTO',
  MANUTENCAO = 'MANUTENCAO',
  INATIVA = 'INATIVA',
  DESATIVADA = 'DESATIVADA',
}

export const TipoAmbulanciaLabel: Record<TipoAmbulancia, string> = {
  [TipoAmbulancia.UTI]: 'UTI',
  [TipoAmbulancia.BASICA]: 'Básica',
};

export const StatusAmbulanciaLabel: Record<StatusAmbulancia, string> = {
  [StatusAmbulancia.DISPONIVEL]: 'Disponível',
  [StatusAmbulancia.EM_ATENDIMENTO]: 'Em Atendimento',
  [StatusAmbulancia.MANUTENCAO]: 'Manutenção',
  [StatusAmbulancia.INATIVA]: 'Inativa',
  [StatusAmbulancia.DESATIVADA]: 'Desativada',
};

export interface AmbulanciaExibicaoModel {
  id: number,
  placa: string,
  tipo: TipoAmbulancia,
  status: StatusAmbulancia,
  bairro: Bairro
}

export interface AmbulanciaCadastroModel {
  placa: string,
  status: StatusAmbulancia,
  tipo: TipoAmbulancia,
  bairroId: number
}

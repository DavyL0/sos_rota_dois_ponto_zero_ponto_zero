export enum FuncaoProfissional {
  MEDICO = 'MEDICO',
  ENFERMEIRO = 'ENFERMEIRO',
  CONDUTOR = 'CONDUTOR',
}

export const FuncaoProfissionalLabel: Record<FuncaoProfissional, string> = {
  [FuncaoProfissional.MEDICO]: 'Médico',
  [FuncaoProfissional.ENFERMEIRO]: 'Enfermeiro',
  [FuncaoProfissional.CONDUTOR]: 'Condutor',
};

export interface ProfissionalCadastroModel {
  nome: string;
  funcao: FuncaoProfissional | null;
  contato: string;
}

export interface ProfissionalExibicaoModel extends ProfissionalCadastroModel {
  id: number;
}

import { AmbulanciaExibicaoModel } from './ambulancia.model';
import { ProfissionalExibicaoModel } from './profissional.model';

export interface EquipeExibicaoModel {
  id: number;
  ativo: boolean;
  ambulancia: AmbulanciaExibicaoModel;
  profissionais: ProfissionalExibicaoModel[];
}

export interface EquipeCadastroModel {
  ambulanciaId: number | null;
  ativo: boolean;
  profissionaisIds: number[];
}

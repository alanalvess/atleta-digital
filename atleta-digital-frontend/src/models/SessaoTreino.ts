import { Categoria } from '../enums/Categoria';

export interface SessaoTreino {
  id: number;
  dataTreino: string;
  categoria: Categoria;
  focoTreino?: string;
  observacoesTreinador?: string;
  treinadorId?: number;
  treinadorNome?: string;
}
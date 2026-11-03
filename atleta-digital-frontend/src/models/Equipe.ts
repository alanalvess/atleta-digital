import { Categoria } from '../enums/Categoria';

export interface Equipe {
  id: number;
  temporada: string;
  categoria: Categoria;
  treinadorId?: number;
  treinadorNome?: string;
  preparadorFisicoId?: number;
  preparadorFisicoNome?: string;
  atletaIds?: number[];
  ativo?: boolean;
}
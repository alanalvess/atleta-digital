import { Categoria } from '../enums/Categoria';

export interface TransicaoCategoria {
  id: number;
  atletaId: number;
  atletaNome?: string;
  temporada: string;
  categoriaAtual: Categoria;
  novaCategoria: Categoria;
  dataTransicao: string;
  motivoTransicao?: string;
  status?: string;
  parecerComissaoAnterior?: string;
  parecerComissaoNova?: string;
  treinadorAnteriorId?: number;
  treinadorNovoId?: number;
  coordenadorTecnicoId?: number;
  ativo?: boolean;
}
import { Categoria } from '../enums/Categoria';

export interface TransicaoCategoria {
  id: number;
  atletaId: number;
  atletaNome?: string;
  temporada: string;
  categoriaAtual: Categoria | string;
  novaCategoria: Categoria | string;
  dataTransicao: string;
  motivoTransicao?: string;
  status?: string;
  parecerComissaoAnterior?: string;
  parecerComissaoNova?: string;
  treinadorAnteriorId?: number;
  treinadorAnteriorNome?: string;
  treinadorNovoId?: number;
  treinadorNovoNome?: string;
  coordenadorTecnicoId?: number;
  coordenadorTecnicoNome?: string;
  aprovadoTreinadorAnterior?: boolean;
  aprovadoTreinadorNovo?: boolean;
  aprovadoCoordenadorTecnico?: boolean;
  ativo?: boolean;
}
import { api } from './Api.ts';
import type { AvaliacaoDesempenho } from '../models/AvaliacaoDesempenho';

export const AvaliacaoDesempenhoService = {
  listarPorAtleta: async (atletaId: number): Promise<AvaliacaoDesempenho[]> =>
    (await api.get(`/avaliacoes-desempenho/atleta/${atletaId}`)).data,
  cadastrar: async (dados: AvaliacaoDesempenho): Promise<AvaliacaoDesempenho> =>
    (await api.post('/avaliacoes-desempenho/cadastrar', dados)).data,
  inativar: async (id: number): Promise<void> => api.delete(`/avaliacoes-desempenho/${id}`)
};

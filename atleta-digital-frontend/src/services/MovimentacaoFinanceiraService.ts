import { api } from './Api.ts';
import type { MovimentacaoFinanceira } from '../models/MovimentacaoFinanceira';

export const MovimentacaoFinanceiraService = {
  listarPorAtleta: async (atletaId: number): Promise<MovimentacaoFinanceira[]> => {
    const resposta = await api.get<MovimentacaoFinanceira[]>(`/movimentacoes-financeiras/atleta/${atletaId}`);
    return resposta.data;
  },

  cadastrar: async (dados: MovimentacaoFinanceira): Promise<MovimentacaoFinanceira> => {
    const resposta = await api.post<MovimentacaoFinanceira>('/movimentacoes-financeiras/cadastrar', dados);
    return resposta.data;
  },

  inativar: async (id: number): Promise<void> => {
    await api.delete(`/movimentacoes-financeiras/${id}`);
  }
};
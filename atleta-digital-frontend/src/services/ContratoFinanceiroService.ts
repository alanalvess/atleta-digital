import { api } from './Api.ts';
import type { ContratoFinanceiro } from '../models/ContratoFinanceiro';

export const ContratoFinanceiroService = {
  buscarPorAtleta: async (atletaId: number): Promise<ContratoFinanceiro> => {
    const resposta = await api.get<ContratoFinanceiro>(`/contratos-financeiros/atleta/${atletaId}`);
    return resposta.data;
  },

  cadastrar: async (dados: ContratoFinanceiro): Promise<ContratoFinanceiro> => {
    const resposta = await api.post<ContratoFinanceiro>('/contratos-financeiros/cadastrar', dados);
    return resposta.data;
  },

  inativar: async (id: number): Promise<void> => {
    await api.delete(`/contratos-financeiros/${id}`);
  }
};
import { api } from './Api.ts';
import type { SessaoTreino } from '../models/SessaoTreino';
import { Categoria } from '../enums/Categoria';

export const SessaoTreinoService = {
  buscarPorId: async (id: number): Promise<SessaoTreino> => {
    const resposta = await api.get<SessaoTreino>(`/sessoes-treino/${id}`);
    return resposta.data;
  },

  listarPorCategoria: async (categoria: Categoria | string): Promise<SessaoTreino[]> => {
    const resposta = await api.get<SessaoTreino[]>(`/sessoes-treino/categoria/${categoria}`);
    return resposta.data;
  },

  cadastrar: async (dados: SessaoTreino): Promise<SessaoTreino> => {
    const resposta = await api.post<SessaoTreino>('/sessoes-treino/cadastrar', dados);
    return resposta.data;
  },

  inativar: async (id: number): Promise<void> => {
    await api.delete(`/sessoes-treino/${id}`);
  }
};
import { api } from './Api.ts';
import type { TransicaoCategoria } from '../models/TransicaoCategoria';

export const TransicaoCategoriaService = {
  listarPorAtleta: async (atletaId: number): Promise<TransicaoCategoria[]> =>
    (await api.get(`/transicoes-categorias/atleta/${atletaId}`)).data,
  cadastrar: async (dados: TransicaoCategoria): Promise<TransicaoCategoria> =>
    (await api.post('/transicoes-categorias/cadastrar', dados)).data,
  atualizar: async (id: number, dados: TransicaoCategoria): Promise<TransicaoCategoria> =>
    (await api.put(`/transicoes-categoria/${id}`, dados)).data,
  inativar: async (id: number): Promise<void> => api.delete(`/transicoes-categorias/${id}`)
};
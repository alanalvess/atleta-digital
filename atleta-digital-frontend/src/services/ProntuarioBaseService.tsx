import { api } from './Api.ts';
import type { ProntuarioBase } from '../models/ProntuarioBase';

export const ProntuarioBaseService = {
  buscarPorAtleta: async (atletaId: number): Promise<ProntuarioBase> => {
    const resposta = await api.get<ProntuarioBase>(`/prontuarios-base/atleta/${atletaId}`);
    return resposta.data;
  },

  cadastrar: async (dados: ProntuarioBase): Promise<ProntuarioBase> => {
    const resposta = await api.post<ProntuarioBase>('/prontuarios-base/cadastrar', dados);
    return resposta.data;
  },

  inativar: async (id: number): Promise<void> => {
    await api.delete(`/prontuarios-base/${id}`);
  }
};
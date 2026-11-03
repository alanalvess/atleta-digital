import { api } from './Api.ts';
import type { ExameAptidao } from '../models/ExameAptidao';

export const ExameAptidaoService = {
  listarPorAtleta: async (atletaId: number): Promise<ExameAptidao[]> => {
    const resposta = await api.get<ExameAptidao[]>(`/exames-aptidao/atleta/${atletaId}`);
    return resposta.data;
  },
  cadastrar: async (dados: ExameAptidao): Promise<ExameAptidao> => {
    const resposta = await api.post<ExameAptidao>('/exames-aptidao/cadastrar', dados);
    return resposta.data;
  },
  inativar: async (id: number): Promise<void> => {
    await api.delete(`/exames-aptidao/${id}`);
  }
};
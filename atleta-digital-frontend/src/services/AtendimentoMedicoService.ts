import { api } from './Api.ts';
import type { AtendimentoMedico } from '../models/AtendimentoMedico';

export const AtendimentoMedicoService = {
  listarPorAtleta: async (atletaId: number): Promise<AtendimentoMedico[]> => {
    const resposta = await api.get<AtendimentoMedico[]>(`/atendimentos-medicos/atleta/${atletaId}`);
    return resposta.data;
  },
  cadastrar: async (dados: AtendimentoMedico): Promise<AtendimentoMedico> => {
    const resposta = await api.post<AtendimentoMedico>('/atendimentos-medicos/cadastrar', dados);
    return resposta.data;
  },
  inativar: async (id: number): Promise<void> => {
    await api.delete(`/atendimentos-medicos/${id}`);
  }
};
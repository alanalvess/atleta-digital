import { api } from './Api.ts'; // Ajuste conforme a instância axios do seu projeto
import type {Equipe} from "../models/Equipe.ts";

export const EquipeService = {
  cadastrar: async (dados: Equipe): Promise<Equipe> => {
    const resposta = (await api.post<Equipe>('/equipes/cadastrar', dados));
    return resposta.data;
  },
  listarTodos: async (): Promise<Equipe[]> => {
    const resposta = await api.get<Equipe[]>('/equipes/all');
    return resposta.data;
  },
  buscarPorId: async (id: number): Promise<Equipe> => {
    const resposta = await api.get<Equipe>(`/equipes/${id}`);
    return resposta.data;
  },
  atualizar: async (id: number, dados: Equipe): Promise<Equipe> => {
    const resposta = await api.put<Equipe>(`/equipes/${id}`, dados);
    return resposta.data;
  },
  atualizarAtributo: async (id: number, dados: Partial<Equipe>): Promise<Equipe> => {
    const resposta = await api.patch<Equipe>(`/equipes/${id}`, dados);
    return resposta.data;
  },
  deletar: async (id: number): Promise<void> => {
    await api.delete(`/equipes/${id}`);
  },
  inativar: async (id: number): Promise<void> => {
    await api.post(`/equipes/${id}`);
  },
  vincularAtletas: async (id: number, atletaIds: number[]): Promise<void> => {
    await api.put(`/equipes/${id}/vincular-atletas`, atletaIds);
  }
};
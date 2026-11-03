import { api } from './Api.ts'; // Ajuste conforme a instância axios do seu projeto
import type { Atleta } from '../models/Atleta';

export const AtletaService = {
  cadastrar: async (dados: Atleta): Promise<Atleta> => {
    const resposta = (await api.post<Atleta>('/atletas/cadastrar', dados));
    return resposta.data;
  },
  listarTodos: async (): Promise<Atleta[]> => {
    const resposta = await api.get<Atleta[]>('/atletas/all');
    return resposta.data;
  },
  buscarPorId: async (id: number): Promise<Atleta> => {
    const resposta = await api.get<Atleta>(`/atletas/${id}`);
    return resposta.data;
  },
  buscarPorNome: async (nome: string): Promise<Atleta[]> => {
    const resposta = await api.get<Atleta[]>(`/atletas/buscar/${nome}`);
    return resposta.data;
  },
  atualizarAtributo: async (id: number, dados: Partial<Atleta>): Promise<Atleta> => {
    const resposta = await api.patch<Atleta>(`/atletas/${id}`, dados);
    return resposta.data;
  },
  deletar: async (id: number): Promise<void> => {
    await api.delete(`/atletas/${id}`);
  },
  inativar: async (id: number): Promise<void> => {
    await api.post(`/atletas/${id}`);
  }
};
import { api } from './Api.ts';
import type {PresencaTreino} from "../models/PresencaTreino.ts";

export const PresencaTreinoService = {
  listarPorSessao: async (sessaoTreinoId: number): Promise<PresencaTreino[]> => {
    const resposta = await api.get<PresencaTreino[]>(`/presencas-treino/sessao/${sessaoTreinoId}`);
    return resposta.data;
  },
  listarPorAtleta: async (atletaId: number): Promise<PresencaTreino[]> => {
    const resposta = await api.get<PresencaTreino[]>(`/presencas-treino/atleta/${atletaId}`);
    return resposta.data;
  },
  registrar: async (dados: PresencaTreino): Promise<PresencaTreino> => {
    const resposta = await api.post<PresencaTreino>('/presencas-treino/cadastrar', dados);
    return resposta.data;
  },
  inativar: async (id: number): Promise<void> => {
    await api.delete(`/presencas-treino/${id}`);
  },
  registrarPresencaQRCode: async (url: string, dados: Record<string, string>) => {
    const resposta = await api.post(url, new URLSearchParams(dados));
    return resposta.data;
  },
  registrarPresenca: async (dados: { atletaId: number, sessaoTreinoId: number, status: string, metodoChamada: string }) => {
    const resposta = await api.post('/presencas-treino/cadastrar', dados);
    return resposta.data;
  }
};
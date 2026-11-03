import { api } from './Api.ts';
import type { Funcionario } from '../models/Funcionario';

export const FuncionarioService = {
  listarTodos: async (): Promise<Funcionario[]> => {
    const resposta = await api.get<Funcionario[]>('/funcionarios/all');
    return resposta.data;
  },

  buscarPorId: async (id: number): Promise<Funcionario> => {
    const resposta = await api.get<Funcionario>(`/funcionarios/${id}`);
    return resposta.data;
  },

  cadastrar: async (dados: Funcionario): Promise<Funcionario> => {
    const resposta = await api.post<Funcionario>('/funcionarios/cadastrar', dados);
    return resposta.data;
  },

  atualizar: async (id: number, dados: Funcionario): Promise<Funcionario> => {
    const resposta = await api.put<Funcionario>(`/funcionarios/${id}`, dados);
    return resposta.data;
  },

  inativar: async (id: number): Promise<void> => {
    await api.delete(`/funcionarios/${id}`);
  }
};
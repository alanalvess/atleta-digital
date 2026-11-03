import { api } from './Api.ts';
import type { Usuario } from '../models/Usuario';
import type { UsuarioLogin } from '../models/UsuarioLogin';

export const UsuarioService = {
  cadastrar: async (dados: Usuario): Promise<Usuario> => {
    const resposta = await api.post<Usuario>('/usuarios/cadastrar', dados);
    return resposta.data;
  },
  login: async (dados: Partial<UsuarioLogin>): Promise<UsuarioLogin> => {
    const resposta = await api.post<UsuarioLogin>('/usuarios/logar', dados);
    return resposta.data;
  },
  listarTodos: async (): Promise<Usuario[]> => {
    const resposta = await api.get<Usuario[]>('/usuarios/all');
    return resposta.data;
  },
  buscarPorId: async (id: number): Promise<Usuario> => {
    const resposta = await api.get<Usuario>(`/usuarios/${id}`);
    return resposta.data;
  },
  buscarPorNome: async (nome: string): Promise<Usuario[]> => {
    const resposta = await api.get<Usuario[]>(`/usuarios/buscar/${nome}`);
    return resposta.data;
  },
  buscarPorEmail: async (): Promise<Usuario[]> => {
    const resposta = await api.get<Usuario[]>(`/usuarios/email/`);
    return resposta.data;
  },
  atualizarAtributo: async (id: number, dados: Partial<Usuario>): Promise<Usuario> => {
    const resposta = await api.patch<Usuario>(`/usuarios/${id}`, dados);
    return resposta.data;
  },
  atualizar: async (id: number, dados: Partial<Usuario>): Promise<Usuario> => {
    const resposta = await api.put<Usuario>(`/usuarios/${id}`, dados);
    return resposta.data;
  },
  deletar: async (id: number): Promise<void> => {
    await api.delete(`/usuarios/${id}`);
  },
  inativar: async (id: number): Promise<void> => {
    await api.post(`/usuarios/${id}`);
  },
  alterarSenha: async (id: number, dados: { senhaAtual: string; novaSenha: string }): Promise<void> => {
    await api.patch(`/usuarios/${id}/senha`, dados);
  },
};
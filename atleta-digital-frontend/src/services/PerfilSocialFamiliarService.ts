import { api } from './Api.ts';
import type { PerfilSocialFamiliar } from '../models/PerfilSocialFamiliar';

export const PerfilSocialFamiliarService = {
  buscarPorAtleta: async (atletaId: number): Promise<PerfilSocialFamiliar> => {
    const resposta = await api.get<PerfilSocialFamiliar>(`/perfil-social-familiar/atleta/${atletaId}`);
    return resposta.data;
  },

  cadastrar: async (dados: PerfilSocialFamiliar): Promise<PerfilSocialFamiliar> => {
    const resposta = await api.post<PerfilSocialFamiliar>('/perfil-social-familiar/cadastrar', dados);
    return resposta.data;
  },

  inativar: async (id: number): Promise<void> => {
    await api.delete(`/perfil-social-familiar/${id}`);
  }
};
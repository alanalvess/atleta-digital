import { api } from './Api.ts';
import type { ResponsavelLegal } from '../models/ResponsavelLegal';

export const ResponsavelLegalService = {
  buscarPorAtleta: async (atletaId: number): Promise<ResponsavelLegal> =>
    (await api.get(`/responsaveis-legais/atleta/${atletaId}`)).data,
  cadastrar: async (dados: ResponsavelLegal): Promise<ResponsavelLegal> =>
    (await api.post('/responsaveis-legais/cadastrar', dados)).data,
  inativar: async (id: number): Promise<void> => api.delete(`/responsaveis-legais/${id}`)
};
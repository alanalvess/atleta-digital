import { api } from './Api.ts';
import type { MatriculaEscolar } from '../models/MatriculaEscolar';

export const MatriculaEscolarService = {
  listarPorAtleta: async (atletaId: number): Promise<MatriculaEscolar[]> => {
    const resposta = await api.get<MatriculaEscolar[]>(`/matriculas-escolares/atleta/${atletaId}`);
    return resposta.data;
  },

  cadastrar: async (dados: MatriculaEscolar): Promise<MatriculaEscolar> => {
    const resposta = await api.post<MatriculaEscolar>('/matriculas-escolares/cadastrar', dados);
    return resposta.data;
  },

  inativar: async (id: number): Promise<void> => {
    await api.delete(`/matriculas-escolares/${id}`);
  }
};
import {api} from "./Api.ts";
import type {AcompanhamentoBimestral} from "../models/AcompanhamentoBimestral.ts";

export const AcompanhamentoBimestralService = {
  listarPorMatricula: async (matriculaId: number): Promise<AcompanhamentoBimestral[]> =>
    (await api.get(`/acompanhamentos-bimestrais/matricula/${matriculaId}`)).data,
  cadastrar: async (dados: AcompanhamentoBimestral): Promise<AcompanhamentoBimestral> =>
    (await api.post('/acompanhamentos-bimestrais/cadastrar', dados)).data,
  inativar: async (id: number): Promise<void> => api.delete(`/acompanhamentos-bimestrais/${id}`)
};
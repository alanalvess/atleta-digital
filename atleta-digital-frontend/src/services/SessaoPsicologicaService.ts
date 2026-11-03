import {api} from "./Api.ts";
import type {SessaoPsicologica} from "../models/SessaoPsicologica.ts";

export const SessaoPsicologicaService = {
  listarPorAtleta: async (atletaId: number): Promise<SessaoPsicologica[]> =>
    (await api.get(`/sessoes-psicologicas/atleta/${atletaId}`)).data,
  cadastrar: async (dados: SessaoPsicologica): Promise<SessaoPsicologica> =>
    (await api.post('/sessoes-psicologicas/cadastrar', dados)).data,
  inativar: async (id: number): Promise<void> => api.delete(`/sessoes-psicologicas/${id}`)
};

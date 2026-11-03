import { api } from './Api.ts';
import type { RfidLeituraRequest, RfidVincularRequest, AcessoAtletaResponse } from '../models/Rfid';

export const AcessoHardwareService = {
  processarLeitura: async (dados: RfidLeituraRequest): Promise<AcessoAtletaResponse> => {
    const resposta = await api.post<AcessoAtletaResponse>('/acesso-hardware/scan', dados);
    return resposta.data;
  },

  vincularCartao: async (dados: RfidVincularRequest): Promise<void> => {
    await api.post('/acesso-hardware/vincular', dados);
  }
};
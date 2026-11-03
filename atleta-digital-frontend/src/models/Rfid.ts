export interface RfidLeituraRequest {
  uid: string;
  deviceId?: string;
}

export interface RfidVincularRequest {
  uid: string;
  atletaId: number;
}

export interface AcessoAtletaResponse {
  atletaId?: number;
  nomeAtleta?: string;
  fotoUrl?: string;
  liberado: boolean;
  mensagem: string;
}
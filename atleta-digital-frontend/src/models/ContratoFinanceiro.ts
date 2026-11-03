export interface ContratoFinanceiro {
  id: number;
  atletaId: number;
  atletaNome?: string;
  tipoVinculo: string;
  valorAcordado?: number;
  diaVencimento?: number;
  isento: boolean;
  observacoes?: string;
  ativo?: boolean;
}
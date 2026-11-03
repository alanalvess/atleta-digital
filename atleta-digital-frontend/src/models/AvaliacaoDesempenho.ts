export interface AvaliacaoDesempenho {
  id: number;
  atletaId: number;
  atletaNome?: string;
  avaliadorId: number;
  avaliadorNome?: string;
  temporada: string;
  dataAvaliacao: string;
  notaPasse?: number;
  notaFinalizacao?: number;
  notaDrible?: number;
  notaMarcacao?: number;
  mediaGeral?: number;
  pontosFortes?: string;
  pontosADesenvolver?: string;
  ativo?: boolean;
}
export interface SessaoPsicologica {
  id: number;
  atletaId: number;
  psicologoId: number;
  psicologoNome?: string;
  dataSessao: string;
  nivelConcentracao?: string;
  nivelAutoconfianca?: string;
  controleEmocoes?: string;
  parecer?: string;
  requerNovaSessao?: boolean;
}
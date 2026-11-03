export interface ProntuarioBase {
  id: number;
  atletaId: number;
  atletaNome?: string;
  tipoSanguineo?: string;
  alergias?: string;
  historicoCirurgias?: string;
  doencasCronicas?: string;
  medicamentosUsoContinuo?: string;
  ativo?: boolean;
}
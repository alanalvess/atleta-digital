export interface AtendimentoMedico {
  id: number;
  atletaId: number;
  atletaNome?: string;
  dataAtendimento: string;
  queixaLesao?: string;
  conduta?: string;
  diasAfastamento?: number;
  liberadoParaTreino?: boolean;
  profissionalSaudeId?: number;
  profissionalSaudeNome?: string;
  ativo?: boolean;
}
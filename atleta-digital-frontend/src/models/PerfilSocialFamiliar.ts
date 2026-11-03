export interface PerfilSocialFamiliar {
  id: number;
  atletaId: number;
  atletaNome?: string;
  moradoresResidencia?: number;
  responsavelRenda?: string;
  faixaSalarial?: string;
  tipoMoradia?: string;
  meioTransporteTreino?: string;
  tempoDeslocamentoMinutos?: number;
  dificuldadeAlimentacao?: boolean;
  necessidadesApoio?: string;
  ativo?: boolean;
}
import { AptidaoFisica } from '../enums/AptidaoFisica';

export interface ExameAptidao {
  id: number;
  atletaId: number;
  atletaNome?: string;
  dataExame: string;
  validade?: string;
  peso?: number;
  altura?: number;
  imc?: number;
  pressaoArterial?: number;
  aptidao?: AptidaoFisica;
  ativo?: boolean;
}
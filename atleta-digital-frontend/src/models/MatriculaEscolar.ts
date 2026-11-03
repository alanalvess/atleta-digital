import { TurnoEscolar } from '../enums/TurnoEscolar';

export interface MatriculaEscolar {
  id: number;
  atletaId: number;
  atletaNome?: string;
  temporada: string;
  nomeEscola: string;
  redeEnsino: string;
  anoSerie: string;
  turno: TurnoEscolar;
  ativo?: boolean;
}
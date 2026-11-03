import { StatusPresenca } from '../enums/StatusPresenca';

export interface PresencaTreino {
  id: number;
  atletaId: number;
  atletaNome?: string;
  sessaoTreinoId: number;
  sessaoTreinoFoco?: string;
  status: StatusPresenca;
  metodoChamada?: string;
  ativo?: boolean;
}
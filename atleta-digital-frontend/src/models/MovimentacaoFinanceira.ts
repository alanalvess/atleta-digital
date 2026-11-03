import { TipoMovimentacao } from '../enums/TipoMovimentacao';
import { StatusPagamento } from '../enums/StatusPagamento';

export interface MovimentacaoFinanceira {
  id: number;
  atletaId: number;
  atletaNome?: string;
  descricao: string;
  tipo: TipoMovimentacao;
  valor: number;
  dataVencimento: string;
  dataPagamento?: string;
  responsavelFinanceiroId?: number;
  responsavelFinanceiroNome?: string;
  status: StatusPagamento;
  ativo?: boolean;
}
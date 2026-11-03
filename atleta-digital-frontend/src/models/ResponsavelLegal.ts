export interface ResponsavelLegal {
  id: number;
  atletaId: number;
  atletaNome?: string;
  nome: string;
  parentesco: string;
  cpf: string;
  telefone: string;
  email?: string;
  ativo?: boolean;
}
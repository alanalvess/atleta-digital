import { Cargo } from '../enums/Cargo';

export interface Funcionario {
  id: number;
  nomeCompleto: string;
  cpf: string;
  telefone?: string;
  cargo: Cargo;
  registroProfissional?: string;
  dataContratacao?: string;
  usuarioId?: number;
  usuarioEmail?: string;
  ativo?: boolean;
}
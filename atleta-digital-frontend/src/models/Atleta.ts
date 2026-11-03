import { Categoria } from '../enums/Categoria';
import { Posicao } from '../enums/Posicao';
import { PeDominante } from '../enums/PeDominante';

export interface Atleta {
  id: number;
  nomeCompleto: string;
  nomeEsportivo?: string;
  dataNascimento: string;
  idade?: number;
  cpf: string;
  rg?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  bairro?: string;
  cep?: string;
  categoria: Categoria;
  posicao?: Posicao;
  peDominante?: PeDominante;
  numeroCamisa?: number;
  dataIngresso?: string;
  codigoMatricula?: string;
  equipeId?: number;
  ativo?: boolean;
  possuiCartaoAcesso?: boolean;
}
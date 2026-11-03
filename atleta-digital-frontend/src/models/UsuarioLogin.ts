import {Role} from '../enums/Role.ts';

export interface UsuarioLogin {
    id: number;
    nome: string;
    email: string;
    senha: string;
    token: string;
    roles: Role[];
}

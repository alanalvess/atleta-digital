import {Role} from "../enums/Role.ts";

export interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    roles: Role[];
    ativo: boolean;
}